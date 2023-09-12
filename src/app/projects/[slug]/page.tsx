import { DocsPageHeader } from "@/components/PageHeader";
import ProjectSingleLaptop from "@/components/ProjectSingleLaptop";
import { projects } from "@/config/projects";
import { notFound } from "next/navigation";

export default function SingleProject({
  params,
}: {
  params: { slug: string };
}) {
  const project = projects.find((project) => project.slug === params.slug);

  if (!project) {
    // * redirect to 404
    notFound();
  }

  return (
    <main className="container py-6 pt-24 lg:py-32 ">
      <DocsPageHeader heading={project.name} text={project.description} />

      <div className="h-screen absolute left-0 right-0">
        <ProjectSingleLaptop url={project.url} />
      </div>
    </main>
  );
}
