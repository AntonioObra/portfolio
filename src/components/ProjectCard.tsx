import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import { Project } from "@/types";

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  return (
    <div className="border border-secondary p-8 rounded-lg flex flex-col justify-between gap-8 relative group overflow-hidden hover:border-primary transition-border duration-500 bg-background">
      <div className="overflow-hidden rounded-lg">
        <Link href={`/projects/${project.slug}`}>
          <Image
            src={`/images/projects/${project.image}`}
            width={500}
            height={300}
            alt={project.name}
            className="rounded-lg max-h-[300px] object-cover h-auto group-hover:scale-110 duration-500 transition-scale"
          />
        </Link>
      </div>
      <hgroup className="flex flex-col ">
        <h3 className="text-2xl font-bold">{project.name}</h3>
        <p className="text-base text-gray-500 line-clamp-3">
          {project.description}
        </p>
      </hgroup>

      <Link
        className={cn(
          buttonVariants({ variant: "default", size: "lg" }),
          "flex items-center gap-2 text-md "
        )}
        href={`/projects/${project.slug}`}
      >
        View Project
      </Link>
    </div>
  );
};

// ! Code below is the same as above, but with a img hover animation
// const ProjectCard = ({ project }: Props) => {
//   return (
//     <div className="border border-secondary p-8 rounded-lg flex flex-col justify-between gap-8 relative group overflow-hidden h-[500px] hover:border-primary transition-border duration-700 ">
//       <div className="absolute inset-0 duration-700 group-hover:inset-8 group-hover:bottom-60 transition-all z-10 overflow-hidden rounded-lg ">
//         <div className="bg-secondary/40 w-full h-full absolute inset-0"></div>
//         <Image
//           src={`/images/projects/${project.image}`}
//           width={500}
//           height={300}
//           alt={project.name}
//           className="rounded-lg transition-all duration-700 h-full object-cover "
//         />
//       </div>
//       <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-8">
//         <hgroup className="flex flex-col ">
//           <h3 className="text-2xl font-bold">{project.name}</h3>
//           <p className="text-base text-gray-500 line-clamp-3">
//             {project.description}
//           </p>
//         </hgroup>

//         <Link
//           className={cn(
//             buttonVariants({ variant: "default", size: "lg" }),
//             "flex items-center gap-2 text-md "
//           )}
//           href={`/projects/${project.slug}`}
//         >
//           View Project
//         </Link>
//       </div>
//     </div>
//   );
// };

export default ProjectCard;
