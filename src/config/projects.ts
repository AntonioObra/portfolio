import { Project } from "@/types";

export const projects: Project[] = [
  {
    name: "Code Repo",
    description:
      "A Comprehensive Repository of Web Technology Examples and Documentation for Developers",
    url: "https://coderepo.obradovic.dev",
    github: "https://github.com/AntonioObra/coderepo",
    image: "coderepo.jpeg",
    tags: ["NextJS", "TypeScript", "Shadcn UI"],
    slug: "coderepo",
  },
  {
    name: "Blog",
    description:
      "This is a simple next.js application with a graphcms backend used as my place for documenting my journey regarding web development, reading and writing, and breaking down games I find influential to talk about.",
    url: "https://blog.obradovic.dev",
    github: "https://github.com/AntonioObra/blog",
    image: "blog.jpeg",
    tags: ["React", "GraphCMS"],
    slug: "blog",
  },
];
