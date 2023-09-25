// @ts-nocheck
"use client";

import * as THREE from "three";
import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Reflector,
  Text,
  useTexture,
  useGLTF,
  MeshReflectorMaterial,
} from "@react-three/drei";

export default function HeroShader() {
  return (
    <Canvas
      concurrent
      gl={{ alpha: false }}
      pixelRatio={[1, 1.5]}
      camera={{ position: [0, 3, 100], fov: 15 }}
    >
      <color attach="background" args={["white"]} />
      <fog attach="fog" args={["white", 15, 20]} />
      <Suspense fallback={null}>
        <group position={[0, -1, 0]}>
          <VideoText position={[0, 1, -2]} />
          <Ground />
        </group>
        <ambientLight intensity={0.5} />
        <spotLight position={[0, 10, 0]} intensity={0.3} />
        <directionalLight position={[-50, 0, -40]} intensity={0.7} />
        <Intro />
      </Suspense>
    </Canvas>
  );
}

{
  /* <group position={[0, -0.5, 0]}>
<VideoText position={[0, 0.7, -2]} /> */
}

function Carla(props) {
  const { scene } = useGLTF("/carla-draco.glb");
  return <primitive object={scene} {...props} />;
}

function VideoText(props) {
  const { size } = useThree();

  const [video] = useState(() =>
    Object.assign(document.createElement("video"), {
      src: "hero-video.mp4",
      crossOrigin: "Anonymous",
      loop: true,
      muted: true,
    })
  );
  useEffect(() => void video.play(), [video]);

  return (
    <Text
      font="/Inter-Bold.woff"
      fontSize={size.width < 1276 ? 0.4 : 1.2}
      letterSpacing={-0.06}
      maxWidth={size.width < 1276 ? 1.2 : 7}
      {...props}
    >
      obradovic.{size.width < 1276 && " "}dev
      <meshBasicMaterial toneMapped={false}>
        <videoTexture
          attach="map"
          args={[video]}
          encoding={THREE.sRGBEncoding}
        />
      </meshBasicMaterial>
    </Text>
  );
}

function Ground() {
  const [floor, normal] = useTexture([
    "/SurfaceImperfections003_1K_var1.jpg",
    "/SurfaceImperfections003_1K_Normal.jpg",
  ]);
  return (
    <Reflector
      blur={[400, 100]}
      resolution={512}
      args={[10, 10]}
      mirror={1}
      mixBlur={10}
      mixStrength={2.5}
      rotation={[-Math.PI / 2, 0, Math.PI / 2]}
    >
      {(Material, props) => (
        <Material
          color="#a0a0a0"
          metalness={0.4}
          roughnessMap={floor}
          normalMap={normal}
          normalScale={[2, 2]}
          {...props}
        />
      )}
    </Reflector>
  );
}

function Intro() {
  const [vec] = useState(() => new THREE.Vector3());
  return useFrame((state) => {
    state.camera.position.lerp(
      vec.set(state.mouse.x * 5, 3 + state.mouse.y * 2, 14),
      0.05
    );
    state.camera.lookAt(0, 0, 0);
  });
}
