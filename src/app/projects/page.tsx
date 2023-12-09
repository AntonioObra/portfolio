import { Metadata } from "next";

import { allProjects } from "contentlayer/generated";

import ProjectCard from "@/components/ProjectCard";
import { PageHeader } from "@/components/PageHeader";

// * Generate Metadata for the ProjectsPage
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Projects",
    description: "My projects",
  };
}

export default function ProjectsPage() {
  if (allProjects.length === 0) {
    return null;
  }

  return (
    <main className="container py-16 md:py-20">
      <PageHeader
        heading="My projects"
        text="A list of my projects and work"
        className="space-y-4"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 mt-12 gap-8">
        {allProjects.map((project, index) => (
          <ProjectCard
            key={project.title}
            name={project.title}
            image={project.image}
            tag={project.tag}
            path={project.slugAsParams}
            isPriority={index < 2 ? true : false}
          />
        ))}
      </div>
    </main>
  );
}
