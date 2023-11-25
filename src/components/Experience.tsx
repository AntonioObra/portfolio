// @ts-nocheck
"use client";

import HeroSection from "@/components/HeroSection";
import { Canvas } from "@react-three/fiber";

const Experience = () => {
  return (
    <section className="-mt-20 h-[100vh] w-[100vw] relative">
      <Canvas>
        <HeroSection />
      </Canvas>

      <div className="absolute inset-0 flex items-center justify-center backdrop-brightness-90">
        {/* <h1 className="text-[200px] font-semibold leading-none text-white/40 outline-title ">
          obradovic.dev
        </h1> */}
      </div>
    </section>
  );
};

export default Experience;
