export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    github: string;
    page: string;
  };
};

export type Project = {
  name: string;
  description: string;
  url: string;
  github: string;
  image: string;
  tags: string[];
  slug: string;
};
