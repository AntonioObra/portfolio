import Link from "next/link";

import { Icons } from "@/components/Icons";
import { buttonVariants } from "@/components/ui/button";

type ViewAllProps = {
  text: string;
  url: string;
};

const ViewAll = ({ text, url }: ViewAllProps) => {
  return (
    <div className="flex items-center gap-4 mt-12 group">
      <div className="bg-secondary w-full h-[1px]  group-hover:bg-primary transition-all duration-300"></div>
      <Link
        href={url}
        className={buttonVariants({
          variant: "outline",
          className: "group-hover:text-primary duration-300 transition-colors",
        })}
      >
        {text} <Icons.arrowRight className="ml-4 h-4 w-4" />
      </Link>
    </div>
  );
};

export default ViewAll;
