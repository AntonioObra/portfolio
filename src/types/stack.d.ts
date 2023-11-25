import { Icon } from "@/components/Icons";

export type Stack = {
  name: string;
  icon: Icon;
  description: string;
  shortDescription: string;
  tag: "Frontend" | "Backend" | "Database" | "DevOps" | "Other";
};
