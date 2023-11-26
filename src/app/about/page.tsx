import { Icons } from "@/components/Icons";
import { DocsPageHeader } from "@/components/PageHeader";
import ViewAll from "@/components/ViewAll";
import { Stacks } from "@/config/stack";
import Link from "next/link";

export default function About() {
  return (
    <main className="py-6 lg:py-32 container">
      <section className="border-2 border-secondary rounded-lg p-8 bg-background hover:shadow-xl hover:shadow-secondary transition-shadow duration-300">
        <h1 className="text-4xl font-bold">About Me</h1>
        <p className="text-lg mt-8 text-muted-foreground">
          I am a full-stack developer with a passion for creating beautiful and
          functional user experiences. I am a self-taught developer and I have
          been coding for over 5 years. I have experience working with React,
          NextJS, NodeJS, Express, MongoDB, and more.
        </p>
        <p className="text-lg mt-8 text-muted-foreground">
          I am currently looking for a full-time position as a full-stack
          developer. If you would like to work with me, please contact me at{" "}
          <Link
            href="mailto:antonio@obradovic.dev"
            className="text-primary underline-offset-4 hover:underline"
          >
            antonio@obradovic.dev
          </Link>
        </p>
      </section>

      <section className="mt-20 ">
        {/* Experience */}
        <DocsPageHeader
          heading="Experience"
          text="List of my experience"
          className="mb-8"
        />

        <div className="grid grid-cols-1  md:grid-cols-2 gap-8">
          <div className="flex flex-col py-6 px-8 bg-secondary rounded-xl group gap-8 hover:shadow-xl hover:shadow-primary/10 border-2 border-muted  hover:border-primary transition-all  duration-300">
            <div className="flex items-center gap-8 border-b-2 border-muted pb-4">
              <Icons.code className="h-7 w-7" />
              <hgroup>
                <h3 className="text-xl flex items-center">
                  Junior Front-End Developer
                </h3>
                <p className="text-muted-foreground">
                  Papar.hr, 2022 - present{" "}
                </p>
              </hgroup>
            </div>

            <p className="text-md text-muted-foreground">
              I have been working as a web designer for over 10 years. I have
              worked with a wide range of clients, from small businesses to
              large corporations. I have experience in designing websites for
              various industries, including healthcare, education, and
              technology.
            </p>
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="mt-20">
        <h1 className="text-3xl mb-8">Stack</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Stacks.slice(0, 3).map(({ icon: Icon, ...stack }) => (
            <div
              key={stack.name}
              className="py-6 px-8 bg-secondary flex items-center gap-4 rounded-xl group hover:shadow-xl hover:shadow-primary/10 border-2 border-muted  hover:border-primary transition-all  duration-300"
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
  );
}
