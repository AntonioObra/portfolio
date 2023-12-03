import { Metadata } from "next";

import { allProjects } from "contentlayer/generated";

import ProjectCard from "@/components/ProjectCard";
import { DocsPageHeader } from "@/components/PageHeader";

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
    <main className="container py-16 md:py-24 lg:py-32">
      <DocsPageHeader
        heading="My projects"
        text=" If you have any questions, inquiries, or would like to discuss a potential project or collaboration, please feel free to get in touch with me. I'm always excited to connect with fellow professionals and enthusiasts in the industry."
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
