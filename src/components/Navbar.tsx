import Link from "next/link";
import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="fixed top-4 z-50 w-full">
      <div className="container py-3 px-5  rounded-lg border border-primary-foreground flex items-center gap-5 bg-black/70">
        <Link href="/" className="text-white">
          obradovic.dev
        </Link>

        <div className="flex-1">
          <ul className="flex items-center justify-end gap-5 text-white">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/projects">Projects</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
