import { Icons } from "@/components/Icons";
import Image from "next/image";
import Link from "next/link";

const ProjectCard = () => {
  return (
    <article className="group">
      <Link href="/projects/coderepo">
        <div className="overflow-hidden rounded-xl">
          <Image
            src="/images/projects/coderepo.png"
            alt="CodeRepo Hero"
            width={1920}
            height={919}
            className=" object-cover w-full h-auto group-hover:scale-105 transition-all duration-300"
          />
        </div>

        <div className="flex items-center justify-between mt-6">
          <hgroup className="group-hover:pl-6 transition-all duration-300">
            <p className="uppercase text-sm text-primary">Web development</p>
            <h1 className="text-lg">CodeRepo</h1>
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
