import { DocsPageHeader } from "@/components/PageHeader";
import { Stacks } from "@/config/stack";

export default function Stack() {
  return (
    <main className="container py-6 lg:py-32">
      <DocsPageHeader
        heading="My Tech Stack"
        text=" If you have any questions, inquiries, or would like to discuss a potential project or collaboration, please feel free to get in touch with me. I'm always excited to connect with fellow professionals and enthusiasts in the industry."
      />

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-16">
        {Stacks.map(({ icon: Icon, ...stack }) => (
          <div
            key={stack.name}
            className="flex flex-col py-6 px-8 bg-secondary rounded-xl group gap-8"
          >
            <div className=" flex items-center gap-4 ">
              <Icon className="h-10 w-10 group-hover:text-primary transition-colors duration-300" />
              <hgroup>
                <h2 className="text-lg">{stack.name}</h2>
                <p className="text-sm text-muted-foreground">{stack.tag}</p>
              </hgroup>
            </div>

            <p className="text-sm text-muted-foreground border-l-2 border-l-primary pl-8 h-full">
              {stack.description}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
