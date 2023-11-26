import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Projects } from "@/config/projects";

import ViewAll from "@/components/ViewAll";
import { Icons } from "@/components/Icons";
import ProjectCard from "@/components/ProjectCard";
import { buttonVariants } from "@/components/ui/button";

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
    <main className="py-16 md:py-24 lg:py-32">
      <section className="container mb-20">
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

        <div className="overflow-hidden rounded-xl my-16 shadow-2xl shadow-primary border-2 border-primary">
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

        <div className="flex items-center gap-4">
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
      <section className="container">
        <h1 className="text-3xl">Other Projects</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 mt-12 gap-8">
          {otherProjects.slice(0, 2).map((project) => (
            <ProjectCard
              key={project.name}
              name={project.name}
              image={project.image}
              tag={project.tag}
              path={project.path}
            />
          ))}
        </div>

        <ViewAll text="View All Projects" url="/projects" />
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
