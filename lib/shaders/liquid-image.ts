export const liquidVertexShader = `
  varying vec2 vUv;
  varying float vWave;
  uniform float uTime;
  uniform float uScroll;
  uniform float uHover;

  float wave(vec2 p) {
    float a = sin((p.x * 4.0 + uTime * 0.55) + uScroll * 1.2);
    float b = sin((p.y * 5.5 - uTime * 0.38) - uScroll * 0.8);
    float c = sin((p.x + p.y) * 7.0 + uTime * 0.25);
    return (a + b + c) / 3.0;
  }

  void main() {
    vUv = uv;
    vec3 pos = position;
    float edgeFalloff = smoothstep(0.0, 0.25, uv.x) * smoothstep(1.0, 0.75, uv.x);
    edgeFalloff *= smoothstep(0.0, 0.25, uv.y) * smoothstep(1.0, 0.75, uv.y);
    vWave = wave(uv);
    pos.z += vWave * 0.18 * edgeFalloff;
    pos.x += sin(uv.y * 6.283 + uTime * 0.32) * 0.035 * uHover;
    pos.y += cos(uv.x * 6.283 - uTime * 0.28) * 0.035 * uHover;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const liquidFragmentShader = `
  precision highp float;

  varying vec2 vUv;
  varying float vWave;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uScroll;
  uniform float uOpacity;
  uniform float uIndex;
  uniform float uHover;
  uniform float uBrightness;
  uniform vec2 uMouse;

  mat2 rotate2d(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
  }

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    mat2 r = rotate2d(0.58);
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p = r * p * 2.05 + 0.17;
      amplitude *= 0.5;
    }
    return value;
  }

  vec3 chromaticSample(vec2 uv, vec2 shift) {
    float r = texture2D(uTexture, uv + shift * 0.6).r;
    float g = texture2D(uTexture, uv).g;
    float b = texture2D(uTexture, uv - shift * 0.5).b;
    return vec3(r, g, b);
  }

  void main() {
    vec2 uv = vUv;
    vec2 centered = uv - 0.5;
    float time = uTime * 0.18 + uIndex * 0.37;

    vec2 flowA = vec2(
      fbm(uv * 3.0 + vec2(time, -time * 0.6)),
      fbm(uv * 3.0 + vec2(-time * 0.7, time))
    ) - 0.5;

    vec2 flowB = vec2(
      sin((uv.y + uScroll * 0.08) * 18.0 + uTime * 0.8),
      cos((uv.x - uScroll * 0.06) * 16.0 - uTime * 0.7)
    ) * 0.014;

    float mousePull = 1.0 - smoothstep(0.0, 0.42, distance(uv, uMouse));
    vec2 mouseWarp = normalize(centered + 0.0001) * mousePull * 0.04 * uHover;
    float liquidMask = smoothstep(0.92, 0.08, length(centered));
    vec2 displacement = (flowA * 0.035 + flowB * 0.5 + mouseWarp) * liquidMask;

    vec2 warpedUv = uv + displacement;
    vec2 aberration = displacement * (0.3 + abs(vWave) * 0.2);
    vec3 color = chromaticSample(warpedUv, aberration);

    float luma = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(vec3(luma), color, 0.6);
    color *= (0.35 + 0.1 * smoothstep(0.1, 0.95, uv.y)) * uBrightness;
    color += pow(max(0.0, 1.0 - length(centered) * 1.55), 3.0) * vec3(0.04, 0.05, 0.06);

    float grain = hash(uv * vec2(1200.0, 900.0) + uTime);
    color += (grain - 0.5) * 0.03;

    float vignette = smoothstep(0.96, 0.28, length(centered));
    gl_FragColor = vec4(color * vignette, uOpacity);
  }
`;
