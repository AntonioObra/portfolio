import { Icons } from "@/components/Icons";
import { DocsPageHeader } from "@/components/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import Stars from "@/components/Stars";
import { buttonVariants } from "@/components/ui/button";
import { projects } from "@/config/projects";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Projects() {
  return (
    <main className="container py-6 pt-24 lg:py-32 ">
      <DocsPageHeader
        heading="My projects"
        text=" If you have any questions, inquiries, or would like to discuss a potential project or collaboration, please feel free to get in touch with me. I'm always excited to connect with fellow professionals and enthusiasts in the industry."
      />

      <div className="grid grid-cols-1 md:grid-cols-2  gap-12 mt-10">
        {projects.map((project, index) => (
          <ProjectCard key={project.name + index} project={project} />
        ))}
      </div>
    </main>
  );
}
