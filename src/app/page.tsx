import Link from "next/link";

import { Stacks } from "@/config/stack";

import { allProjects } from "contentlayer/generated";

import { Icons } from "@/components/Icons";
import ViewAll from "@/components/ViewAll";
import Experience from "@/components/Experience";
import { MotionDiv } from "@/components/MotionDiv";
import ProjectCard from "@/components/ProjectCard";
import { buttonVariants } from "@/components/ui/button";

import { variantsBottom, variantsLeft, variantsRight } from "@/lib/motion";

export default function Home() {
  return (
    <>
      {/* Shader Hero  */}
      <Experience />

      <main className="py-16 md:py-24 lg:py-32">
        {/* About */}
        <section className="container mb-20">
          <div className="flex flex-col lg:flex-row gap-8">
            <MotionDiv
              variants={variantsLeft}
              initial="hidden"
              transition={{ delay: 0.2, ease: "easeInOut", duration: 0.5 }}
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="w-full lg:w-1/2  p-8 rounded-lg border-2 border-primary  hover:shadow-2xl hover:shadow-primary/10 transition-shadow duration-300"
            >
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
            </MotionDiv>

            <MotionDiv
              variants={variantsRight}
              initial="hidden"
              transition={{ delay: 0.2, ease: "easeInOut", duration: 0.5 }}
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="w-full lg:w-1/2 flex flex-col gap-8"
            >
              <div className=" p-8 rounded-lg border-2 border-secondary hover:shadow-2xl hover:shadow-secondary/50 transition-shadow duration-300">
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

              <div className="h-full p-8 rounded-lg border-2 border-muted bg-secondary flex flex-col justify-between hover:shadow-2xl hover:shadow-secondary/50 transition-shadow  duration-300">
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
            </MotionDiv>
          </div>

          <ViewAll text="About Me" url="/about" />
        </section>

        {/* Projects */}
        {allProjects.length > 0 && (
          <section className="container mb-20">
            <h1 className="text-3xl">Recent Projects</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 mt-12 gap-8">
              {allProjects.slice(0, 2).map((project, index) => (
                <ProjectCard
                  key={project.title}
                  name={project.title}
                  image={project.image}
                  tag={project.tag}
                  path={project.slugAsParams}
                />
              ))}
            </div>

            <ViewAll text="View all projects" url="/projects" />
          </section>
        )}

        {/* Stack */}
        <section className="container">
          <h1 className="text-3xl mb-8">Stack</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Stacks.slice(0, 3).map(({ icon: Icon, ...stack }, index) => (
              <MotionDiv
                variants={variantsBottom}
                initial="hidden"
                transition={{
                  delay: 0.2 * index,
                  ease: "easeInOut",
                  duration: 0.5,
                }}
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                key={stack.name}
              >
                <div className="py-6 px-8 bg-secondary flex items-center gap-4 rounded-xl group hover:shadow-xl hover:shadow-primary/10 border-2 border-muted  hover:border-primary transition-all duration-300 h-full">
                  <Icon className="h-10 w-10 group-hover:text-primary transition-colors duration-300" />
                  <hgroup>
                    <h2 className="text-lg">{stack.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {stack.shortDescription}
                    </p>
                  </hgroup>
                </div>
              </MotionDiv>
            ))}
          </div>

          <ViewAll text="View My Tech Stack" url="/stack" />
        </section>
      </main>
    </>
  );
}
