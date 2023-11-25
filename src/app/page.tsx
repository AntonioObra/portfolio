import Link from "next/link";

import { Stacks } from "@/config/stack";
import { Projects } from "@/config/projects";

import { Icons } from "@/components/Icons";
import ProjectCard from "@/components/ProjectCard";
import { buttonVariants } from "@/components/ui/button";

import ViewAll from "@/components/ViewAll";
import Experience from "@/components/Experience";

export default function Home() {
  return (
    <>
      {/* Shader Hero  */}
      <Experience />

      <main className="py-6 lg:py-32">
        {/* About */}
        <section className="container mb-16">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/2  p-8 rounded-lg border border-primary  hover:shadow-2xl hover:shadow-primary/10 transition-shadow duration-300">
              <h1 className="text-3xl font-bold">About Me</h1>
              <p className="text-lg mt-8 text-muted-foreground">
                I am a full-stack developer with a passion for creating
                beautiful and functional user experiences. I am a self-taught
                developer and I have been coding for over 5 years. I have
                experience working with React, NextJS, NodeJS, Express, MongoDB,
                and more.
              </p>
              <p className="text-lg mt-8 text-muted-foreground">
                I am currently looking for a full-time position as a full-stack
                developer. If you would like to work with me, please contact me
                at{" "}
                <Link
                  href="mailto:antonio@obradovic.dev"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  antonio@obradovic.dev
                </Link>
              </p>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col gap-8">
              <div className=" p-8 rounded-lg border border-secondary  hover:shadow-2xl hover:shadow-secondary/50 transition-shadow duration-300">
                <p className="text-lg text-muted-foreground">
                  Currently working as a Junior Front-End Developer at{" "}
                  <Link
                    href="https://papar.hr"
                    target="_blank"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    papar.hr
                  </Link>
                </p>
              </div>

              <div className="h-full p-8 rounded-lg border border-accent bg-secondary flex flex-col justify-between hover:shadow-2xl hover:shadow-secondary/50 transition-shadow duration-300">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Socials</h3>
                  <p className="text-lg text-white/70">
                    You can also find me on various social media platforms and
                    professional networks. Feel free to follow, connect, or
                    message me through these channels:
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-start gap-4">
                  <Link
                    href="https://github.com/AntonioObra"
                    target="_blank"
                    rel="noreferrer"
                    className={buttonVariants({
                      variant: "default",
                      size: "lg",
                    })}
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
                  >
                    <Icons.linkedin className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <ViewAll text="About Me" url="/about" />
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

          <ViewAll text="View all projects" url="/projects" />
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

          <ViewAll text="View My Tech Stack" url="/stack" />
        </section>
      </main>
    </>
  );
}
