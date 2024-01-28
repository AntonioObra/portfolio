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
import { PageSection } from "@/components/PageHeader";
import { StackCardShort } from "@/components/StackCard";

export default function Home() {
  return (
    <>
      {/* Shader Hero  */}
      <Experience />

      <main className="py-16 md:py-24 lg:py-32 overflow-hidden">
        {/* About */}
        <section className="container mb-20 ">
          <div className="grid md:auto-rows-min grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MotionDiv
              variants={variantsLeft}
              initial="hidden"
              transition={{ delay: 0.2, ease: "easeInOut", duration: 0.5 }}
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="md:col-span-2"
            >
              <div className="p-8 md:h-full rounded-lg border-2 border-muted bg-background-muted hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300">
                <h1 className="text-4xl">About Me</h1>
                <p className="text-lg mt-4 text-muted-foreground">
                  I am a full-stack developer with a passion for creating
                  beautiful and functional user experiences. I am a self-taught
                  developer and I have been coding for over 2 years. I have
                  experience working with React, NextJS, PHP and more.
                </p>
                <p className="text-lg mt-8 text-muted-foreground">
                  My web development journey started in 2020 when I was reintroduced to the wonders of html and css and have gotten hooked immediately, since than i&apos;ve gotten familiar with tons of new technologies like git and github, javascript and typescript, react and nextjs, nodejs and express, mongo and firebase...
                  and went to land my first job 6 months after graduationg from highschool.
                </p>
              </div>
            </MotionDiv>

            <MotionDiv
              variants={variantsRight}
              initial="hidden"
              transition={{ delay: 0.3, ease: "easeInOut", duration: 0.5 }}
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="col-span-1"
            >
              <div className="p-8 md:h-full rounded-lg border-2 border-muted  bg-background-muted hover:border-white/50 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 flex flex-col justify-between">
                <p className="text-lg text-muted-foreground ">
                  Currently working as a Junior Front-End Developer at{" "}
                  <Link
                    href="https://papar.hr"
                    target="_blank"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    papar.hr
                  </Link>
                  . <br></br><br></br>I am responsible for creating and maintaining websites for a
                  variety of clients including building custom software
                  solutions for clients.
                </p>

                <a
                  href="/cv.pdf"
                  download={true}
                  className={buttonVariants({
                    variant: "secondary",
                    size: "lg",
                  })}
                >
                  <Icons.download className="h-5 w-5 mr-4" />
                  Download my CV
                </a>
              </div>
            </MotionDiv>

            <MotionDiv
              variants={variantsLeft}
              initial="hidden"
              transition={{ delay: 0.4, ease: "easeInOut", duration: 0.5 }}
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="col-span-1"
            >
              <div className="md:h-full p-8 rounded-lg bg-primary hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 text-black flex justify-center items-center">
                <Icons.code className="h-full w-1/2" />
              </div>
            </MotionDiv>

            <MotionDiv
              variants={variantsRight}
              initial="hidden"
              transition={{ delay: 0.6, ease: "easeInOut", duration: 0.5 }}
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="md:col-span-2"
            >
              <div className="md:h-full p-8 rounded-lg border-2 border-muted bg-background-muted  flex flex-col justify-between hover:border-white/50 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300">
                <div>
                  <h2 className="text-3xl mb-4">Socials</h2>
                  <p className="text-lg text-white/70">
                    You can also find me on various social media platforms and
                    professional networks. Feel free to follow, connect, or
                    message me through these channels:
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-4">
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

                  <Link
                    href="https://medium.com/@antonio_84382"
                    target="_blank"
                    rel="noreferrer"
                    className={buttonVariants({ variant: "default", size: "lg" })}
                    title="Medium"
                  >
                    <Icons.medium className="h-5 w-5" />
                  </Link>

                  <Link
                    href="https://dev.to/antonioobra"
                    target="_blank"
                    rel="noreferrer"
                    className={buttonVariants({ variant: "default", size: "lg" })}
                    title="Dev.to"
                  >
                    <Icons.devTo className="h-5 w-5" />
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
            <PageSection
              heading="Recent Projects"
              text="Here are some of my recent projects. You can view all of my projects by clicking the button below."
              orientation="left"
              border={false}
            />

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
          <PageSection
            heading="Tech Stack"
            text="Here are some of the technologies I use. You can view all of my tech stack by clicking the button below."
            orientation="right"
            className="mb-12"
            border={false}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Stacks.slice(0, 3).map((stack, index) => (
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
                <StackCardShort {...stack} />
              </MotionDiv>
            ))}
          </div>

          <ViewAll text="View My Tech Stack" url="/stack" />
        </section>
      </main>
    </>
  );
}
