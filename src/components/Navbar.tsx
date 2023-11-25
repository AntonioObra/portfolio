"use client";

import Link from "next/link";

import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { Links, SocialLinks } from "@/config/header";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-8 left-0 right-0 z-50 container">
      <nav className="p-4 border rounded-lg flex justify-between backdrop-blur-2xl bg-background/95">
        {/* Links */}
        <div className="flex gap-4">
          {Links.map(({ icon: Icon, ...link }) => (
            <Link
              key={link.path}
              href={link.path}
              className={buttonVariants({
                variant: pathname == link.path ? "secondary" : "ghost",
              })}
            >
              <Icon className="mr-2 h-4 w-4" />
              {link.name}
            </Link>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex gap-2">
          {SocialLinks.map(({ icon: Icon, ...link }) => (
            <Link
              key={link.link}
              href={link.link}
              className={buttonVariants({ variant: "ghost" })}
              target="_blank"
            >
              <Icon className=" h-4 w-4" />
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
