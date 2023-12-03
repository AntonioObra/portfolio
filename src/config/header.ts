import { Icons } from "@/components/Icons";
import { Link, SocialLink } from "@/types/header";

export const Links: Link[] = [
  {
    name: "Home",
    path: "/",
    icon: Icons.home,
  },
  {
    name: "About",
    path: "/about",
    icon: Icons.about,
  },
  {
    name: "Projects",
    path: "/projects",
    icon: Icons.projects,
  },
  {
    name: "Stack",
    path: "/stack",
    icon: Icons.stack,
  },
  {
    name: "Contact",
    path: "/contact",
    icon: Icons.contact,
  },
];

export const SocialLinks: SocialLink[] = [
  {
    link: "https://github.com/AntonioObra",
    icon: Icons.github,
    name: "Github",
  },
  {
    link: "https://www.linkedin.com/in/antonio-obradovi%C4%87-708362193/",
    icon: Icons.linkedin,
    name: "Linkedin",
  },
];
