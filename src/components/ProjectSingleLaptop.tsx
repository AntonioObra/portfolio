// @ts-nocheck

"use client";

import {
  Float,
  OrbitControls,
  useGLTF,
  Environment,
  PresentationControls,
  ContactShadows,
  Html,
  Text,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export function Experience({ url }) {
  const laptopModel = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
  );

  return (
    <>
      <Environment preset="city" />

      {/* <color args={["#01112b"]} attach="background" /> */}

      {/* <OrbitControls makeDefault /> */}

      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float rotationIntensity={0.4}>
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={65}
            color={"#c0d2f0"}
            rotation={[-0.1, Math.PI, 0]}
            position={[0, 0.55, -1.15]}
          />
          <primitive object={laptopModel.scene} position-y={-1.2}>
            <Html
              transform
              wrapperClass="htmlScreen"
              distanceFactor={1.17}
              position={[0, 1.56, -1.4]}
              rotation-x={-0.256}
            >
              <iframe src={url} />
            </Html>
          </primitive>
          {/* <Text
            font="./bangers-v20-latin-regular.woff"
            fontSize={1}
            position={[2, 0.75, 0.75]}
            rotation-y={-1.25}
            maxWidth={2}
            // children={"blog.\robradovic"}
            textAlign={"right"}
          >
            coderepo. obradovic
          </Text> */}
        </Float>
      </PresentationControls>

      <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
    </>
  );
}

interface props {
  url: string;
}

export default function ProjectSingleLaptop({ url }: props) {
  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 2000,
        position: [-3, 1.5, 4],
      }}
    >
      <Experience url={url} />
    </Canvas>
  );
}
