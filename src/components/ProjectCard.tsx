import { Icons } from "@/components/Icons";
import Image from "next/image";
import Link from "next/link";

type Project = {
  image: string;
  name: string;
  tag: string;
  path: string;
};

const ProjectCard = ({ image, name, tag, path }: Project) => {
  return (
    <article className="group">
      <Link href={`/projects/${path}`}>
        <div className="overflow-hidden rounded-xl group-hover:shadow-xl group-hover:shadow-primary/10 transition-all duration-300">
          <Image
            src={`/images/projects/${image}?v=2`}
            alt={name}
            width={1920}
            height={919}
            className="object-cover w-full h-[460px] group-hover:scale-105 transition-all duration-300"
          />
        </div>

        <div className="flex items-center justify-between mt-6">
          <hgroup className="group-hover:pl-6 transition-all duration-300">
            <p className="uppercase text-sm text-primary">{tag}</p>
            <h1 className="text-lg">{name}</h1>
          </hgroup>

          <div className="opacity-0 -translate-x-12  group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <Icons.arrowRight className="w-6 h-6 text-primary" />
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProjectCard;
