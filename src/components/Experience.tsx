// @ts-nocheck
"use client";

import HeroSection from "@/components/HeroSection";
import { Icons } from "@/components/Icons";
import { MotionDiv } from "@/components/MotionDiv";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Canvas } from "@react-three/fiber";
import Link from "next/link";

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

        <div className="absolute inset-0 pt-20 backdrop-brightness-50 md:backdrop-brightness-50 backdrop-blur-lg flex items-center justify-center">
          <div className="container">
            <hgroup className="border-b-2 border-muted-foreground/50 pb-4">
              <h1 className="text-6xl md:text-7xl lg:text-9xl 2xl:text-[160px] 3xl:text-[200px] font-semibold 3xl:leading-none text-foreground">
                obradovic<br></br>.dev
              </h1>
              <p className="mt-10 text-2xl md:text-4xl text-muted-foreground">
                Full Stack Web Developer. Creator of{" "}
                <Link
                  href="https://openvoid.dev/"
                  className="text-white hover:underline underline-offset-4"
                  target="_blank"
                >
                  Open Void
                </Link>{" "}
                &{" "}
                <Link
                  href="https://coderepo.openvoid.dev/"
                  className="text-white hover:underline underline-offset-4"
                  target="_blank"
                >
                  Code Repo.
                </Link>
              </p>
            </hgroup>

            <div className="mt-8 flex items-center justify-start gap-4">
              <Link
                href="https://github.com/AntonioObra"
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({
                  variant: "default",
                  size: "lg",
                })}
                title="Github"
              >
                <Icons.github className="h-5 w-5" />
              </Link>

              <Link
                href="https://www.linkedin.com/in/antonio-obradovi%C4%87-708362193/"
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({
                  variant: "default",
                  size: "lg",
                })}
                title="LinkedIn"
              >
                <Icons.linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MotionDiv>
  );
};

export default Experience;
