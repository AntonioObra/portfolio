"use client";

import Link from "next/link";

import { Projects } from "@/config/projects";

import ProjectCard from "@/components/ProjectCard";
import { buttonVariants } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import { Canvas } from "@react-three/fiber";
import { Icons } from "@/components/Icons";
import { Stacks } from "@/config/stack";

export default function Home() {
  return (
    <>
      {/* Shader Hero  */}
      <section className="-mt-20 h-[100vh] w-[100vw] relative">
        <Canvas>
          <HeroSection />
        </Canvas>

        <div className="absolute inset-0"></div>
      </section>

      <main className="py-6 lg:py-32">
        {/* About */}
        <section className="container mb-16">
          <h1 className="text-5xl mb-2">obradovic.dev</h1>
          <p>
            A passionate web designer with a knack for turning ideas into
            visually stunning, user-friendly websites.
          </p>

          <div className="flex items-center gap-4 mt-12 group">
            <div className="bg-secondary w-full h-[1px]  group-hover:bg-primary transition-all duration-300"></div>
            <Link
              href="/about"
              className={buttonVariants({ variant: "default" })}
            >
              More about Me <Icons.arrowRight className="ml-4 h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Projects */}
        <section className="container">
          <h1 className="text-3xl">Recent Projects</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 mt-12 gap-8">
            {Projects.slice(0, 2).map((project) => (
              <ProjectCard
                key={project.name}
                name={project.name}
                image={project.image}
                tag={project.tag}
                path={project.path}
              />
            ))}
          </div>

          <div className="flex items-center gap-4 mt-12">
            <div className="bg-secondary w-full h-[1px] "></div>
            <Link
              href="/projects"
              className={buttonVariants({ variant: "outline" })}
            >
              View all projects
            </Link>
          </div>
        </section>

        {/* Stack */}
        <section className="container mt-16">
          <h1 className="text-3xl mb-8">Stack</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Stacks.slice(0, 3).map(({ icon: Icon, ...stack }) => (
              <div
                key={stack.name}
                className="py-6 px-8 bg-secondary flex items-center gap-4 rounded-xl group"
              >
                <Icon className="h-10 w-10 group-hover:text-primary transition-colors duration-300" />
                <hgroup>
                  <h2 className="text-lg">{stack.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {stack.shortDescription}
                  </p>
                </hgroup>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-12">
            <div className="bg-secondary w-full h-[1px] "></div>
            <Link
              href="/stack"
              className={buttonVariants({ variant: "outline" })}
            >
              View Full Stack
              <Icons.arrowRight className="ml-4 h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
