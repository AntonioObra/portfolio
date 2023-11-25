import { Projects } from "@/config/projects";

import ProjectCard from "@/components/ProjectCard";

export default function ProjectsPage() {
  return (
    <main className="mt-24 container">
      <h1 className="text-3xl">My Projects</h1>

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
