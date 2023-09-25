// @ts-nocheck
"use client";

import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

function Experience(props) {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(2000), { radius: 1.5 })
  );
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 30;
    ref.current.rotation.y -= delta / 35;
  });
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="green"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function Stars() {
  return (
    <div className="fixed inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Experience />
      </Canvas>
    </div>
  );
}
