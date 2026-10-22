/**
 * Ink in water: a compact GPU fluid solver (WebGL2).
 * Stable-fluids style: advect velocity and dye, add curl-driven vorticity,
 * solve pressure with Jacobi iterations, subtract the gradient, draw the dye.
 * Everything else on the page talks to it through `splat()`.
 */

export interface Fluid {
  splat(x: number, y: number, dx: number, dy: number, color: [number, number, number], radius?: number): void;
  setRunning(on: boolean): void;
  destroy(): void;
  readonly supported: boolean;
}

const VERT = `#version 300 es
precision highp float;
in vec2 aPos; out vec2 vUv; out vec2 vL; out vec2 vR; out vec2 vT; out vec2 vB; uniform vec2 texel;
void main(){ vUv = aPos*0.5+0.5; vL = vUv - vec2(texel.x,0.); vR = vUv + vec2(texel.x,0.); vT = vUv + vec2(0.,texel.y); vB = vUv - vec2(0.,texel.y); gl_Position = vec4(aPos,0.,1.); }`;

const FRAG = {
  copy: `#version 300 es
precision mediump float; in vec2 vUv; uniform sampler2D uTex; out vec4 o; void main(){ o = texture(uTex, vUv); }`,
  clear: `#version 300 es
precision mediump float; in vec2 vUv; uniform sampler2D uTex; uniform float value; out vec4 o; void main(){ o = value * texture(uTex, vUv); }`,
  display: `#version 300 es
precision highp float; in vec2 vUv; uniform sampler2D uTex; out vec4 o;
void main(){ vec3 c = texture(uTex, vUv).rgb;
  float a = max(c.r, max(c.g, c.b));
  // soft shoulder so dense ink stays cobalt instead of blowing out to white
  vec3 ink = c / (1.0 + 0.55 * a);
  ink = mix(ink, vec3(0.42, 0.576, 1.0) * min(a, 1.0), 0.18 * min(a, 1.0));
  o = vec4(ink, 1.0); }`,
  splat: `#version 300 es
precision highp float; in vec2 vUv; uniform sampler2D uTarget; uniform float aspect; uniform vec3 color; uniform vec2 point; uniform float radius; out vec4 o;
void main(){ vec2 p = vUv - point; p.x *= aspect; vec3 s = exp(-dot(p,p)/radius) * color; vec3 base = texture(uTarget, vUv).xyz; o = vec4(base + s, 1.0); }`,
  advection: `#version 300 es
precision highp float; in vec2 vUv; uniform sampler2D uVelocity; uniform sampler2D uSource; uniform vec2 texel; uniform float dt; uniform float dissipation; out vec4 o;
void main(){ vec2 coord = vUv - dt * texture(uVelocity, vUv).xy * texel; vec4 r = texture(uSource, coord); float decay = 1.0 + dissipation * dt; o = r / decay; }`,
  divergence: `#version 300 es
precision mediump float; in vec2 vUv; in vec2 vL; in vec2 vR; in vec2 vT; in vec2 vB; uniform sampler2D uVelocity; out vec4 o;
void main(){ float L = texture(uVelocity, vL).x; float R = texture(uVelocity, vR).x; float T = texture(uVelocity, vT).y; float B = texture(uVelocity, vB).y; vec2 C = texture(uVelocity, vUv).xy;
  if (vL.x < 0.0) L = -C.x; if (vR.x > 1.0) R = -C.x; if (vT.y > 1.0) T = -C.y; if (vB.y < 0.0) B = -C.y;
  o = vec4(0.5 * (R - L + T - B), 0., 0., 1.); }`,
  curl: `#version 300 es
precision mediump float; in vec2 vUv; in vec2 vL; in vec2 vR; in vec2 vT; in vec2 vB; uniform sampler2D uVelocity; out vec4 o;
void main(){ float L = texture(uVelocity, vL).y; float R = texture(uVelocity, vR).y; float T = texture(uVelocity, vT).x; float B = texture(uVelocity, vB).x; o = vec4(0.5 * (R - L - T + B), 0., 0., 1.); }`,
  vorticity: `#version 300 es
precision highp float; in vec2 vUv; in vec2 vL; in vec2 vR; in vec2 vT; in vec2 vB; uniform sampler2D uVelocity; uniform sampler2D uCurl; uniform float curl; uniform float dt; out vec4 o;
void main(){ float L = texture(uCurl, vL).x; float R = texture(uCurl, vR).x; float T = texture(uCurl, vT).x; float B = texture(uCurl, vB).x; float C = texture(uCurl, vUv).x;
  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L)); force /= length(force) + 0.0001; force *= curl * C; force.y *= -1.0;
  vec2 v = texture(uVelocity, vUv).xy + force * dt; v = clamp(v, -1000.0, 1000.0); o = vec4(v, 0., 1.); }`,
  pressure: `#version 300 es
precision mediump float; in vec2 vUv; in vec2 vL; in vec2 vR; in vec2 vT; in vec2 vB; uniform sampler2D uPressure; uniform sampler2D uDivergence; out vec4 o;
void main(){ float L = texture(uPressure, vL).x; float R = texture(uPressure, vR).x; float T = texture(uPressure, vT).x; float B = texture(uPressure, vB).x; float div = texture(uDivergence, vUv).x; o = vec4((L + R + B + T - div) * 0.25, 0., 0., 1.); }`,
  gradient: `#version 300 es
precision mediump float; in vec2 vUv; in vec2 vL; in vec2 vR; in vec2 vT; in vec2 vB; uniform sampler2D uPressure; uniform sampler2D uVelocity; out vec4 o;
void main(){ float L = texture(uPressure, vL).x; float R = texture(uPressure, vR).x; float T = texture(uPressure, vT).x; float B = texture(uPressure, vB).x; vec2 v = texture(uVelocity, vUv).xy; v.xy -= vec2(R - L, T - B); o = vec4(v, 0., 1.); }`,
};

type FBO = { fbo: WebGLFramebuffer; tex: WebGLTexture; w: number; h: number; texelX: number; texelY: number };
type Double = { read: FBO; write: FBO; swap(): void; w: number; h: number; texelX: number; texelY: number };

export function createFluid(canvas: HTMLCanvasElement, opts: { simRes?: number; dyeRes?: number } = {}): Fluid {
  const gl = canvas.getContext('webgl2', { alpha: false, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false, powerPreference: 'high-performance' }) as WebGL2RenderingContext | null;
  const dead: Fluid = { splat() {}, setRunning() {}, destroy() {}, supported: false };
  if (!gl) return dead;
  if (!gl.getExtension('EXT_color_buffer_float')) return dead;
  const linear = !!gl.getExtension('OES_texture_float_linear');
  const filter = linear ? gl.LINEAR : gl.NEAREST;

  const cfg = {
    simRes: opts.simRes ?? 128,
    dyeRes: opts.dyeRes ?? 1024,
    densityDissipation: 0.2,
    velocityDissipation: 0.3,
    pressure: 0.8,
    pressureIterations: 20,
    curl: 12,
    splatRadius: 0.0022,
  };

  // ---- programs
  const compile = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'shader');
    return s;
  };
  const vs = compile(gl.VERTEX_SHADER, VERT);
  type Prog = { p: WebGLProgram; u: Record<string, WebGLUniformLocation | null> };
  const program = (frag: string): Prog => {
    const p = gl.createProgram()!;
    gl.attachShader(p, vs);
    gl.attachShader(p, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) || 'link');
    const u: Record<string, WebGLUniformLocation | null> = {};
    const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < n; i++) {
      const name = gl.getActiveUniform(p, i)!.name;
      u[name] = gl.getUniformLocation(p, name);
    }
    return { p, u };
  };
  const P = {
    copy: program(FRAG.copy), clear: program(FRAG.clear), display: program(FRAG.display), splat: program(FRAG.splat),
    advection: program(FRAG.advection), divergence: program(FRAG.divergence), curl: program(FRAG.curl),
    vorticity: program(FRAG.vorticity), pressure: program(FRAG.pressure), gradient: program(FRAG.gradient),
  };

  // ---- geometry
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  // ---- framebuffers
  const createFBO = (w: number, h: number, internal: number, format: number, type: number): FBO => {
    const tex = gl.createTexture()!;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internal, w, h, 0, format, type, null);
    const fbo = gl.createFramebuffer()!;
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    gl.viewport(0, 0, w, h);
    gl.clear(gl.COLOR_BUFFER_BIT);
    return { fbo, tex, w, h, texelX: 1 / w, texelY: 1 / h };
  };
  const createDouble = (w: number, h: number, internal: number, format: number, type: number): Double => {
    let a = createFBO(w, h, internal, format, type);
    let b = createFBO(w, h, internal, format, type);
    return {
      get read() { return a; }, get write() { return b; },
      swap() { const t = a; a = b; b = t; },
      w, h, texelX: 1 / w, texelY: 1 / h,
    };
  };
  const res = (r: number) => {
    const aspect = gl.drawingBufferWidth / gl.drawingBufferHeight;
    const a = aspect < 1 ? 1 / aspect : aspect;
    const mn = Math.round(r), mx = Math.round(r * a);
    return gl.drawingBufferWidth > gl.drawingBufferHeight ? { w: mx, h: mn } : { w: mn, h: mx };
  };
  let dye!: Double, velocity!: Double, divergence!: FBO, curlFBO!: FBO, pressure!: Double;
  const init = () => {
    const s = res(cfg.simRes), d = res(cfg.dyeRes);
    dye = createDouble(d.w, d.h, gl.RGBA16F, gl.RGBA, gl.HALF_FLOAT);
    velocity = createDouble(s.w, s.h, gl.RG16F, gl.RG, gl.HALF_FLOAT);
    divergence = createFBO(s.w, s.h, gl.R16F, gl.RED, gl.HALF_FLOAT);
    curlFBO = createFBO(s.w, s.h, gl.R16F, gl.RED, gl.HALF_FLOAT);
    pressure = createDouble(s.w, s.h, gl.R16F, gl.RED, gl.HALF_FLOAT);
  };

  const blit = (target: FBO | null) => {
    if (target) { gl.viewport(0, 0, target.w, target.h); gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo); }
    else { gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight); gl.bindFramebuffer(gl.FRAMEBUFFER, null); }
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };
  const bindTex = (tex: WebGLTexture, unit: number) => { gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, tex); return unit; };
  const use = (pr: Prog, texelX: number, texelY: number) => { gl.useProgram(pr.p); gl.uniform2f(pr.u.texel, texelX, texelY); return pr; };

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.floor(canvas.clientWidth * dpr), h = Math.floor(canvas.clientHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; init(); }
  };
  resize();

  // ---- simulation step
  const step = (dt: number) => {
    gl.disable(gl.BLEND);
    let pr = use(P.curl, velocity.texelX, velocity.texelY);
    gl.uniform1i(pr.u.uVelocity, bindTex(velocity.read.tex, 0));
    blit(curlFBO);

    pr = use(P.vorticity, velocity.texelX, velocity.texelY);
    gl.uniform1i(pr.u.uVelocity, bindTex(velocity.read.tex, 0));
    gl.uniform1i(pr.u.uCurl, bindTex(curlFBO.tex, 1));
    gl.uniform1f(pr.u.curl, cfg.curl);
    gl.uniform1f(pr.u.dt, dt);
    blit(velocity.write); velocity.swap();

    pr = use(P.divergence, velocity.texelX, velocity.texelY);
    gl.uniform1i(pr.u.uVelocity, bindTex(velocity.read.tex, 0));
    blit(divergence);

    pr = use(P.clear, velocity.texelX, velocity.texelY);
    gl.uniform1i(pr.u.uTex, bindTex(pressure.read.tex, 0));
    gl.uniform1f(pr.u.value, cfg.pressure);
    blit(pressure.write); pressure.swap();

    pr = use(P.pressure, velocity.texelX, velocity.texelY);
    gl.uniform1i(pr.u.uDivergence, bindTex(divergence.tex, 0));
    for (let i = 0; i < cfg.pressureIterations; i++) {
      gl.uniform1i(pr.u.uPressure, bindTex(pressure.read.tex, 1));
      blit(pressure.write); pressure.swap();
    }

    pr = use(P.gradient, velocity.texelX, velocity.texelY);
    gl.uniform1i(pr.u.uPressure, bindTex(pressure.read.tex, 0));
    gl.uniform1i(pr.u.uVelocity, bindTex(velocity.read.tex, 1));
    blit(velocity.write); velocity.swap();

    pr = use(P.advection, velocity.texelX, velocity.texelY);
    gl.uniform1i(pr.u.uVelocity, bindTex(velocity.read.tex, 0));
    gl.uniform1i(pr.u.uSource, bindTex(velocity.read.tex, 0));
    gl.uniform1f(pr.u.dt, dt);
    gl.uniform1f(pr.u.dissipation, cfg.velocityDissipation);
    blit(velocity.write); velocity.swap();

    gl.uniform1i(pr.u.uVelocity, bindTex(velocity.read.tex, 0));
    gl.uniform1i(pr.u.uSource, bindTex(dye.read.tex, 1));
    gl.uniform1f(pr.u.dissipation, cfg.densityDissipation);
    blit(dye.write); dye.swap();
  };

  const render = () => {
    const pr = use(P.display, 0, 0);
    gl.uniform1i(pr.u.uTex, bindTex(dye.read.tex, 0));
    blit(null);
  };

  const queue: { x: number; y: number; dx: number; dy: number; c: [number, number, number]; r: number }[] = [];
  const applySplats = () => {
    while (queue.length) {
      const s = queue.shift()!;
      const aspect = canvas.width / canvas.height;
      let pr = use(P.splat, velocity.texelX, velocity.texelY);
      gl.uniform1i(pr.u.uTarget, bindTex(velocity.read.tex, 0));
      gl.uniform1f(pr.u.aspect, aspect);
      gl.uniform2f(pr.u.point, s.x, s.y);
      gl.uniform3f(pr.u.color, s.dx, s.dy, 0);
      gl.uniform1f(pr.u.radius, s.r / 100);
      blit(velocity.write); velocity.swap();

      gl.uniform1i(pr.u.uTarget, bindTex(dye.read.tex, 0));
      gl.uniform3f(pr.u.color, s.c[0], s.c[1], s.c[2]);
      blit(dye.write); dye.swap();
    }
  };

  let running = false, raf = 0, last = 0;
  const frame = (t: number) => {
    if (!running) return;
    const dt = Math.min((t - (last || t)) / 1000, 1 / 30);
    last = t;
    resize();
    applySplats();
    if (dt > 0) step(dt);
    render();
    raf = requestAnimationFrame(frame);
  };

  const api: Fluid = {
    supported: true,
    splat(x, y, dx, dy, color, radius = cfg.splatRadius) {
      // x,y in [0,1] with y up; dx,dy in canvas-normalised units per frame
      queue.push({ x, y: 1 - y, dx: dx * 1200, dy: -dy * 1200, c: color, r: radius * 100 });
    },
    setRunning(on) {
      if (on === running) return;
      running = on; last = 0;
      if (on) raf = requestAnimationFrame(frame); else cancelAnimationFrame(raf);
    },
    destroy() { running = false; cancelAnimationFrame(raf); },
  };
  return api;
}
