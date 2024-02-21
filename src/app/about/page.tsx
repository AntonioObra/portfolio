import Link from "next/link";
import { Metadata } from "next";

import { Stacks } from "@/config/stack";

import ViewAll from "@/components/ViewAll";
import { Icons } from "@/components/Icons";
import { MotionDiv } from "@/components/MotionDiv";
import { PageHeader, PageSection } from "@/components/PageHeader";

import { variantsBottom, variantsLeft, variantsRight } from "@/lib/motion";
import { buttonVariants } from "@/components/ui/button";
import ExperienceCard from "@/components/ExperienceCard";
import { Experience } from "@/config/experience";

// * Generate Metadata for the AboutPage
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About Me",
    description: "About me",
  };
}

export default function AboutPage() {
  return (
    <main className="py-16 md:py-20 container overflow-hidden">
      <PageHeader
        heading="About Me"
        text="About me, my experience and my tech stack"
        className="mb-8"
      />

      <div className="grid md:auto-rows-min grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        <MotionDiv
          variants={variantsLeft}
          initial="hidden"
          transition={{ delay: 0.2, ease: "easeInOut", duration: 0.5 }}
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="md:col-span-2"
        >
          <div className="p-8 md:h-full rounded-lg border-2 border-muted bg-background-muted hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300">
            <p className="text-lg text-muted-foreground ">
              I am a full-stack developer with a passion for creating beautiful
              and functional user experiences. I am a self-taught developer and
              I have been coding for over 2 years. I have experience working
              with React, NextJS, PHP and more.
            </p>
            <p className="text-lg mt-8 text-muted-foreground">
              My web development journey started in 2020 when I was reintroduced
              to the wonders of html and css and have gotten hooked immediately,
              since than i&apos;ve gotten familiar with tons of new technologies
              like git and github, javascript and typescript, react and nextjs,
              nodejs and express, mongo and firebase... and went to land my
              first job 6 months after graduationg from highschool.
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
          <div className="p-8 md:h-full rounded-lg border-2 border-muted  bg-background-muted hover:border-white/50 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 flex flex-col justify-between gap-8">
            <p className="text-lg text-muted-foreground ">
              Currently working as a Junior Front-End Developer at{" "}
              <Link
                href="https://papar.hr"
                target="_blank"
                className="text-primary underline-offset-4 underline"
              >
                papar.hr.
              </Link>
              <br></br>
              <br></br> I am responsible for creating and maintaining websites
              for a variety of clients including building custom software
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
          variants={variantsRight}
          initial="hidden"
          transition={{ delay: 0.3, ease: "easeInOut", duration: 0.5 }}
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="col-span-1"
        >
          <div className="p-8 md:h-full rounded-lg border-2 border-muted  bg-background-muted hover:border-white/50 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 flex flex-col justify-between gap-8">
            <p className="text-lg text-muted-foreground ">
              I&apos;m the creator and core mantainer of <b>Code Repo</b>, a
              platform for developers containing code snippets, guides,
              resources and more.
            </p>

            <Link
              href="https://coderepo.openvoid.dev"
              className={buttonVariants({
                variant: "secondary",
                size: "lg",
              })}
              target="_blank"
            >
              <Icons.externalLink className="h-5 w-5 mr-4" />
              Visit Code Repo
            </Link>
          </div>
        </MotionDiv>

        <MotionDiv
          variants={variantsRight}
          initial="hidden"
          transition={{ delay: 0.3, ease: "easeInOut", duration: 0.5 }}
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="md:col-span-2 lg:col-span-1"
        >
          <div className="p-8 md:h-full rounded-lg border-2 border-muted  bg-background-muted hover:border-white/50 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 flex flex-col justify-between gap-8">
            <p className="text-lg text-muted-foreground ">
              I base my work on the principles of{" "}
              <span className="bg-primary text-black">functionality</span> and{" "}
              <span className="bg-primary text-black">simplicity</span>. I
              believe that less is more and that the best solutions are the
              simplest ones.
            </p>

            <p className="text-lg text-muted-foreground ">
              To learn more about my design philosophy, check out my{" "}
              <Link
                href="https://blog.obradovic.dev/posts"
                target="_blank"
                className="text-primary underline-offset-4 underline"
              >
                article
              </Link>{" "}
              on the topic.
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
          <div className="p-8 md:h-full rounded-lg border-2 border-muted  bg-background-muted hover:border-white/50 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 text-muted-foreground flex flex-col justify-between gap-8">
            <p className="text-lg text-muted-foreground">
              To find out more about me and my work, check out my{" "}
              <Link
                href="https://blog.obradovic.dev/posts"
                target="_blank"
                className="text-primary underline-offset-4 underline"
              >
                blog
              </Link>
              .
            </p>
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
              <p className="text-lg text-muted-foreground">
                You can also find me on various social media platforms and
                professional networks. Feel free to follow, connect, or message
                me through these channels:
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

      <section className="mt-20 ">
        {/* Experience */}
        <PageSection
          heading="Experience"
          text="List of my experience working on various projects."
          className="mb-12"
          orientation="right"
        />

        <div className="grid grid-cols-1  md:grid-cols-2 gap-8">
          {Experience.map((experience, index) => (
            <MotionDiv
              key={index}
              variants={variantsBottom}
              initial="hidden"
              transition={{
                delay: 0.2 * index,
                ease: "easeInOut",
                duration: 0.5,
              }}
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              <ExperienceCard {...experience} />
            </MotionDiv>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="mt-20">
        <PageSection
          heading="Stack"
          text="Here are some of the technologies I use. You can view all of my tech stack by clicking the button below."
          className="mb-12"
          orientation="left"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
  );
}
