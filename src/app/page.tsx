import Link from "next/link";

import { Projects } from "@/config/projects";

import ProjectCard from "@/components/ProjectCard";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="mt-24">
      {/* Projects */}
      <section className="container">
        <h1 className="text-3xl">Recent Projects</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 mt-12 gap-8">
          {Projects.map((project) => (
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
