"use client";

import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial, useTexture } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { heroTextureUrls } from "@/lib/cafe-data";
import { liquidFragmentShader, liquidVertexShader } from "@/lib/shaders/liquid-image";

const LiquidMaterial = shaderMaterial(
  {
    uTexture: null,
    uTime: 0,
    uScroll: 0,
    uOpacity: 1,
    uIndex: 0,
    uHover: 0,
    uBrightness: 1.0,
    uMouse: new THREE.Vector2(0.5, 0.5)
  },
  liquidVertexShader,
  liquidFragmentShader
);

extend({ LiquidMaterial });

type LiquidShaderMaterial = THREE.ShaderMaterial & {
  uTexture: THREE.Texture;
  uTime: number;
  uScroll: number;
  uOpacity: number;
  uIndex: number;
  uHover: number;
  uBrightness: number;
  uMouse: THREE.Vector2;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      liquidMaterial: {
        ref?: React.Ref<LiquidShaderMaterial>;
        transparent?: boolean;
        depthWrite?: boolean;
        uTexture?: THREE.Texture;
        uOpacity?: number;
        uIndex?: number;
        uBrightness?: number;
      };
    }
  }
}

function LiquidImagePlane({
  url,
  index,
  position,
  scale,
  rotation,
  brightness = 1.0
}: {
  url: string;
  index: number;
  position: [number, number, number];
  scale: [number, number, number];
  rotation: [number, number, number];
  brightness?: number;
}) {
  const texture = useTexture(url);
  const material = useRef<LiquidShaderMaterial>(null);
  const mesh = useRef<THREE.Mesh>(null);

  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.MirroredRepeatWrapping;
    texture.wrapT = THREE.MirroredRepeatWrapping;
    texture.anisotropy = 8;
  }, [texture]);

  useFrame(({ clock, pointer }) => {
    if (!material.current || !mesh.current) return;
    const time = clock.getElapsedTime();
    const scroll = typeof window === "undefined" ? 0 : window.scrollY / Math.max(1, window.innerHeight);
    material.current.uTime = time;
    material.current.uScroll = scroll;
    material.current.uHover = THREE.MathUtils.lerp(material.current.uHover, 0.5 + Math.abs(pointer.x) * 0.8, 0.035);
    material.current.uMouse.set(pointer.x * 0.5 + 0.5, pointer.y * 0.5 + 0.5);
    mesh.current.rotation.z = rotation[2] + Math.sin(time * 0.18 + index) * 0.025;
    mesh.current.position.y = position[1] + Math.sin(time * 0.24 + index * 1.7) * 0.15 - scroll * 0.12;
    mesh.current.position.x = position[0] + Math.cos(time * 0.16 + index) * 0.07;
  });

  return (
    <mesh ref={mesh} position={position} scale={scale} rotation={rotation}>
      <planeGeometry args={[1.9, 2.35, 80, 80]} />
      <liquidMaterial
        ref={material}
        uTexture={texture}
        uOpacity={0.4}
        uIndex={index}
        uBrightness={brightness}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

function CinematicScene() {
  const { viewport } = useThree();
  const spread = Math.min(viewport.width, 10);
  const planes = [
    { position: [-spread * 0.28, 0.55, -1.2], scale: [1.55, 1.55, 1], rotation: [0.04, 0.2, -0.13] },
    { position: [spread * 0.26, -0.1, -0.7], scale: [1.3, 1.3, 1], rotation: [-0.04, -0.22, 0.16] },
    { position: [0, -0.75, -1.6], scale: [1.15, 1.15, 1], rotation: [0.02, 0.05, 0.03] },
    { position: [-spread * 0.49, -1.0, -2.0], scale: [0.9, 0.9, 1], rotation: [0.02, 0.28, 0.18] },
    { position: [spread * 0.48, 0.9, -2.2], scale: [0.95, 0.95, 1], rotation: [-0.02, -0.24, -0.18] }
  ] satisfies Array<{
    position: [number, number, number];
    scale: [number, number, number];
    rotation: [number, number, number];
  }>;

  return (
    <>
      <color attach="background" args={["#060606"]} />
      <fog attach="fog" args={["#060606", 5, 12]} />
      <ambientLight intensity={0.15} />
      <pointLight position={[3, 4, 5]} intensity={3} color="#e8edf2" />
      <pointLight position={[-4, -2, 3]} intensity={1.5} color="#9ab46a" />
      <pointLight position={[0, 3, 2]} intensity={1} color="#c8b8a8" />
      {heroTextureUrls.map((url, index) => (
        <LiquidImagePlane key={url} url={url} index={index} {...planes[index]} />
      ))}
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.6} luminanceThreshold={0.3} luminanceSmoothing={0.8} mipmapBlur />
        <Vignette offset={0.25} darkness={0.55} />
      </EffectComposer>
    </>
  );
}

function MobileCinematicScene() {
  const { viewport } = useThree();
  const mobilePlanes = [
    { position: [-0.1, 1.2, -1.8] as [number, number, number], scale: [1.4, 1.4, 1] as [number, number, number], rotation: [0.03, 0.15, -0.08] as [number, number, number] },
    { position: [0.2, -1.1, -2.2] as [number, number, number], scale: [1.2, 1.2, 1] as [number, number, number], rotation: [-0.03, -0.12, 0.1] as [number, number, number] },
  ];

  const mobileUrls = [heroTextureUrls[0], heroTextureUrls[1]];

  return (
    <>
      <color attach="background" args={["#060606"]} />
      <fog attach="fog" args={["#060606", 5, 12]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[2, 3, 4]} intensity={4} color="#e8edf2" />
      <pointLight position={[-2, -1, 2]} intensity={2.5} color="#c8b8a8" />
      {mobileUrls.map((url, index) => (
        <LiquidImagePlane key={url} url={url} index={index} {...mobilePlanes[index]} brightness={2.8} />
      ))}
    </>
  );
}

export function WebGLBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className="fixed-webgl-background">
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 42 }}
        dpr={isMobile ? [1, 1] : [1, 1.7]}
        gl={{
          antialias: !isMobile,
          alpha: false,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping
        }}
      >
        <Suspense fallback={null}>
          {isMobile ? <MobileCinematicScene /> : <CinematicScene />}
        </Suspense>
      </Canvas>
    </div>
  );
}
