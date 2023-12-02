// @ts-nocheck
"use client";

import HeroSection from "@/components/HeroSection";
import { MotionDiv } from "@/components/MotionDiv";
import { Canvas } from "@react-three/fiber";

const variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const Experience = () => {
  return (
    <MotionDiv
      variants={variants}
      initial="hidden"
      transition={{ delay: 0.2, ease: "easeInOut", duration: 1.2 }}
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <section className="-mt-20 h-[100vh] w-full relative">
        <Canvas>
          <HeroSection />
        </Canvas>

        <div className="absolute inset-0 flex items-center justify-center backdrop-brightness-75 ">
          <h1 className="text-5xl md:text-7xl lg:text-9xl 2xl:text-[160px] 3xl:text-[200px] font-semibold leading-none text-white/40 outline-title">
            obradovic.dev
          </h1>
        </div>
      </section>
    </MotionDiv>
  );
};

export default Experience;
