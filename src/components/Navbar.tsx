"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import { Icons } from "./Icons";

import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 z-50 w-full bg-background/95 py-3 px-5 border-b border-white/10 backdrop-blur-[30px] saturate-[120%]">
      <div className="container flex items-center justify-between text-md">
        <div className="flex items-center gap-5 ">
          <Link href="/" className="font-bold text-white">
            obradovic.dev
          </Link>
          <Link
            href="/projects"
            className={twMerge(
              "text-white/70 hover:text-white duration-300",
              pathname === "/projects" && "text-white"
            )}
          >
            projects
          </Link>
          <Link
            href="/contact"
            className={twMerge(
              "text-white/70 hover:text-white duration-300",
              pathname === "/contact" && "text-white"
            )}
          >
            contact
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="https://github.com/AntonioObra"
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={cn(
                buttonVariants({
                  size: "sm",
                  variant: "ghost",
                }),
                "w-9 px-0 "
              )}
            >
              <Icons.gitHub className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </div>
          </Link>

          <Link
            href="https://twitter.com/antonioobra8"
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={cn(
                buttonVariants({
                  size: "sm",
                  variant: "ghost",
                }),
                "w-9 px-0 "
              )}
            >
              <Icons.twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </div>
          </Link>

          <Link
            href="https://blog.obradovic.dev/"
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "flex items-center gap-2 text-md"
            )}
          >
            blog
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
