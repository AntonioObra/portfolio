import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { env } from "process";

import { allProjects } from "contentlayer/generated";

import ViewAll from "@/components/ViewAll";
import { Icons } from "@/components/Icons";
import ProjectCard from "@/components/ProjectCard";
import { buttonVariants } from "@/components/ui/button";
import { Mdx } from "@/components/Mdx";
import { PageSection } from "@/components/PageHeader";

interface PageProps {
  params: {
    projectId: string;
  };
}

async function getProjectFromParams(projectId: string) {
  const project = allProjects.find(
    (project) => project.slugAsParams === projectId
  );

  if (!project) {
    notFound();
  }

  return project;
}

// * Generate Metadata for the project
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const project = await getProjectFromParams(params.projectId);

  if (!project) {
    return {};
  }

  const url = env.NEXT_PUBLIC_APP_URL;

  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set("heading", project.title);
  ogUrl.searchParams.set("type", "Project");
  ogUrl.searchParams.set("mode", "dark");

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | obradovic.dev`,
      description: project.description,
      type: "article",
      url: `${url}/projects/${project.slugAsParams}`,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [ogUrl.toString()],
    },
  };
}

const BackToProjects = ({ github, url }: { github: string, url: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mb-12">
      <Link
        href="/projects"
        className={buttonVariants({ variant: "link" })}
      >
        <Icons.arrowLeft className="mr-2 w-4 h-4" />
        Back to Projects
      </Link>

      <div className="bg-secondary w-full h-[2px] "></div>

      <div className="flex space-x-4">
        <Link
          href={github}
          target="_blank"
          className={buttonVariants({ variant: "secondary" })}
        >
          <Icons.github className="mr-2 w-4 h-4" />
          View on GitHub
        </Link>
        <Link
          href={url}
          target="_blank"
          className={buttonVariants({ variant: "default" })}
        >
          <Icons.externalLink className="mr-2 w-4 h-4" />
          Preview Project
        </Link>
      </div>
    </div>
  )
}

export default async function SingleProjectPage({ params }: PageProps) {
  const { projectId } = params;

  const project = await getProjectFromParams(projectId);
  const otherProjects = allProjects.filter(
    (project) => project.slugAsParams !== projectId
  );

  return (
    <main className="py-16 md:py-24 lg:py-32">
      <section className="container mb-20">
        <BackToProjects github={project.github} url={project.url} />

        <PageSection
          heading={project.title}
          text={project.description}
          border={false}
          className="mb-12"
          orientation="left"
        />

        <div className="overflow-hidden rounded-xl my-16 shadow-xl md:shadow-2xl shadow-primary/50 md:shadow-primary border-2 border-primary">
          <Image
            src={`/images/projects/${project.image}`}
            alt={project.title}
            width={1920}
            height={919}
            priority
            className="object-cover w-full min-h-[400px]"
          />
        </div>

        <div className="mb-16 pt-10 max-w-3xl mx-auto">
          <h1 className="text-6xl "></h1>
          <h1 className="inline-block  text-4xl lg:text-5xl">
            About the project
          </h1>
          <hr className="my-4 border-b border-secondary " />
          <Mdx code={project.body.code} />
        </div>

        <BackToProjects github={project.github} url={project.url} />

      </section>

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <section className="container">
          {/* <h1 className="text-3xl">Other Projects</h1> */}

          <PageSection
            heading="Other Projects"
            text="A list of my other projects"
            border={false}
            className="mb-12"
            orientation="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 mt-12 gap-8">
            {otherProjects.slice(0, 2).map((project) => (
              <ProjectCard
                key={project.title}
                name={project.title}
                image={project.image}
                tag={project.tag}
                path={project.slugAsParams}
              />
            ))}
          </div>

          <ViewAll text="View All Projects" url="/projects" />
        </section>
      )}
    </main>
  );
}

export async function generateStaticParams() {
  const projects = allProjects;

  return projects.map((project) => ({
    projectId: project.slugAsParams,
  }));
}
