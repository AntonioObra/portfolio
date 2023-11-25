// @ts-nocheck
"use client";

import { useRef } from "react";

// * Importing shaders
import portalVertexShader from "../shaders/vertex.glsl";
import portalFragmentShader from "../shaders/fragment.glsl";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useFrame, extend, useThree } from "@react-three/fiber";

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("#4de6a6"),
    uColorEnd: new THREE.Color("#050505"),
  },
  portalVertexShader,
  portalFragmentShader
);

extend({ PortalMaterial });

const HeroSection = () => {
  const portalMaterialRef = useRef();

  const { viewport, size } = useThree();

  useFrame((state, delta) => {
    portalMaterialRef.current.uTime += delta * 2.5;
  });

  return (
    <>
      <color args={["#030202"]} attach="background" />

      {/* // * Portal */}
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry />

        <portalMaterial
          ref={portalMaterialRef}
          resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
        />
      </mesh>
    </>
  );
};

export default HeroSection;
