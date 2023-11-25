import { Projects } from "@/config/projects";

import ProjectCard from "@/components/ProjectCard";
import { DocsPageHeader } from "@/components/PageHeader";

export default function ProjectsPage() {
  return (
    <main className="container py-6 lg:py-32">
      <DocsPageHeader
        heading="My projects"
        text=" If you have any questions, inquiries, or would like to discuss a potential project or collaboration, please feel free to get in touch with me. I'm always excited to connect with fellow professionals and enthusiasts in the industry."
      />

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
    </main>
  );
}
