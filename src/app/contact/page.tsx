import Link from "next/link";
import { Metadata } from "next";

import { Icons } from "@/components/Icons";
import { MotionDiv } from "@/components/MotionDiv";
import { DocsPageHeader } from "@/components/PageHeader";
import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { variantsLeft, variantsRight } from "@/lib/motion";

// * Generate Metadata for the ContactPage
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Contact",
    description: "My contact information",
  };
}

export default function ContactPage() {
  return (
    <main className="container py-16 md:py-24 lg:py-32">
      <DocsPageHeader
        heading="Contact me"
        text=" If you have any questions, inquiries, or would like to discuss a potential project or collaboration, please feel free to get in touch with me. I'm always excited to connect with fellow professionals and enthusiasts in the industry."
      />

      <div className="flex justify-between gap-5 mt-10 flex-col md:flex-row flex-wrap">
        <MotionDiv
          variants={variantsLeft}
          initial="hidden"
          transition={{ delay: 0.2, ease: "easeInOut", duration: 0.5 }}
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="flex-1 flex flex-col justify-between  border-2 border-secondary rounded-lg p-8 bg-background hover:shadow-xl hover:shadow-secondary transition-shadow duration-300"
        >
          <div>
            <h3 className="text-2xl font-bold mb-4">Email</h3>
            <p className="text-lg text-white/70">
              If you prefer direct communication, you can contact me through
              e-mail. I will do my best to respond to your inquiries promptly.
            </p>
          </div>

          <div className="mt-8 flex items-center justify-start gap-4 flex-wrap">
            <Link
              href="mailto:antonio@obradovic.dev"
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "flex items-center gap-2 text-md"
              )}
            >
              <Icons.contact className="h-5 w-5" />
              antonio@obradovic.dev
            </Link>
          </div>
        </MotionDiv>

        <MotionDiv
          variants={variantsRight}
          initial="hidden"
          transition={{ delay: 0.2, ease: "easeInOut", duration: 0.5 }}
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="flex-1 flex flex-col justify-between  border-2 border-secondary rounded-lg p-8 bg-background hover:shadow-xl hover:shadow-secondary transition-shadow duration-300"
        >
          <div>
            <h3 className="text-2xl font-bold mb-4">Socials</h3>
            <p className="text-lg text-white/70">
              You can also find me on various social media platforms and
              professional networks. Feel free to follow, connect, or message me
              through these channels:
            </p>
          </div>

          <div className="mt-8 flex items-center justify-start gap-4">
            <Link
              href="https://github.com/AntonioObra"
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              <Icons.github className="h-5 w-5" />
            </Link>

            <Link
              href="https://www.linkedin.com/in/antonio-obradovi%C4%87-708362193/"
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              <Icons.linkedin className="h-5 w-5" />
            </Link>
          </div>
        </MotionDiv>
      </div>
    </main>
  );
}
