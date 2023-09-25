import { Icons } from "@/components/Icons";
import { DocsPageHeader } from "@/components/PageHeader";
import Stars from "@/components/Stars";
import TestComponent from "@/components/TestComponent";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="container py-6 pt-24 lg:py-32 ">
      <DocsPageHeader
        heading="Contact me"
        text=" If you have any questions, inquiries, or would like to discuss a potential project or collaboration, please feel free to get in touch with me. I'm always excited to connect with fellow professionals and enthusiasts in the industry."
      />

      <div className="flex justify-between gap-5 mt-10 flex-col md:flex-row flex-wrap">
        <div className=" flex-1 flex flex-col justify-between border border-foreground rounded-lg p-8 bg-background">
          <div>
            <h3 className="text-2xl font-bold mb-4">Email</h3>
            <p className="text-lg text-foreground">
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
              antonio@obradovic.dev
            </Link>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between  border border-foreground rounded-lg p-8 bg-background">
          <div>
            <h3 className="text-2xl font-bold mb-4">Socials</h3>
            <p className="text-lg text-foreground">
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
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "flex items-center gap-4 text-md"
              )}
            >
              <Icons.gitHub className="h-5 w-5" />
            </Link>

            <Link
              href="https://twitter.com/antonioobra8"
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "flex items-center gap-4 text-md"
              )}
            >
              <Icons.twitter className="h-5 w-5" />
            </Link>

            <Link
              href="https://www.linkedin.com/in/antonio-obradovi%C4%87-708362193/"
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "flex items-center gap-4 text-md"
              )}
            >
              <Icons.linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* <TestComponent /> */}
    </main>
  );
}
