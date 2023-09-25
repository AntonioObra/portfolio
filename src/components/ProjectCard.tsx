import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import { Project } from "@/types";
import { Icons } from "./Icons";

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="flex flex-col justify-between gap-6 group"
    >
      <div className="relative overflow-hidden rounded-lg h-[570px]">
        <Image
          src={`/images/projects/${project.image}`}
          width={500}
          height={300}
          alt={project.name}
          className="rounded-lg w-full h-full max-h-[570px] object-cover group-hover:scale-110  transition-all duration-300 ease-in-out"
        />
        <button className="absolute bottom-8 right-8 rounded-full p-2 bg-background">
          <Icons.design />
        </button>
      </div>

      <div className="flex justify-between w-full items-center">
        <h3 className="text-2xl font-bold uppercase">{project.name}</h3>
        <button
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "flex items-center gap-2 text-md "
          )}
        >
          View Project
        </button>
      </div>
    </Link>
  );
};

export default ProjectCard;
