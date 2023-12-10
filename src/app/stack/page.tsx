import { Metadata } from "next";

import { Stacks } from "@/config/stack";

import { PageHeader } from "@/components/PageHeader";
import { variantsBottom } from "@/lib/motion";
import { MotionDiv } from "@/components/MotionDiv";
import StackCard from "@/components/StackCard";

// * Generate Metadata for the StackPage
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "My Tech Stack",
    description: "My tech stack",
  };
}

export default function StackPage() {
  return (
    <main className="container py-16 md:py-20">
      <PageHeader
        heading="My Tech Stack"
        text="The technologies I use to build my projects"
        className="space-y-4"
      />

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {Stacks.map((stack, index) => (
          <MotionDiv
            variants={variantsBottom}
            initial="hidden"
            transition={{
              delay: 0.1 * (index % 9),
              ease: "easeInOut",
              duration: 0.5,
            }}
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            key={stack.name}
          >
            <StackCard {...stack} />
          </MotionDiv>
        ))}
      </section>
    </main>
  );
}
