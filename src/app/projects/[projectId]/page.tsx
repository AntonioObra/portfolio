import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Projects } from "@/config/projects";

import { Icons } from "@/components/Icons";
import { buttonVariants } from "@/components/ui/button";
import ProjectCard from "@/components/ProjectCard";

export default function SingleProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  const { projectId } = params;
  const project = Projects.find((project) => project.path === projectId);

  if (!project) {
    notFound();
  }

  const otherProjects = Projects.filter((p) => p.path !== projectId);

  return (
    <main className="mt-24">
      <section className="container">
        <div className="flex items-center gap-4 mb-12">
          <Link
            href="/projects"
            className={buttonVariants({ variant: "link" })}
          >
            <Icons.arrowLeft className="mr-2 w-4 h-4" />
            Back to Projects
          </Link>
          <div className="bg-secondary w-full h-[1px] "></div>
          <Link
            href={project?.url}
            target="_blank"
            className={buttonVariants({ variant: "default" })}
          >
            <Icons.externalLink className="mr-2 w-4 h-4" />
            Preview Project
          </Link>
        </div>

        <h1 className="text-5xl">{project?.name}</h1>

        <div className="overflow-hidden rounded-xl my-16 shadow-2xl shadow-primary">
          <Image
            src={`/images/projects/${project.image}`}
            alt={project.name}
            width={1920}
            height={919}
          />
        </div>

        <div className="mb-16">
          <h2 className="text-3xl mb-4">About</h2>
          <p className="text-xl">{project.description}</p>
        </div>

        <div className="flex items-center gap-4 mb-12">
          <Link
            href="/projects"
            className={buttonVariants({ variant: "link" })}
          >
            <Icons.arrowLeft className="mr-2 w-4 h-4" />
            Back to Projects
          </Link>
          <div className="bg-secondary w-full h-[1px] "></div>
          <Link
            href={project?.url}
            target="_blank"
            className={buttonVariants({ variant: "default" })}
          >
            <Icons.externalLink className="mr-2 w-4 h-4" />
            Preview Project
          </Link>
        </div>
      </section>

      {/* Other Projects */}
      <section className="container mb-16">
        <h1 className="text-3xl">Other Projects</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 mt-12 gap-8">
          {otherProjects.map((project) => (
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
    </main>
  );
}

export async function generateStaticParams() {
  const projects = Projects;

  return projects.map((project) => ({
    projectId: project.path,
  }));
}