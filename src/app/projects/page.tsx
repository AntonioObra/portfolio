import { Icons } from "@/components/Icons";
import { DocsPageHeader } from "@/components/PageHeader";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container py-6 pt-24 lg:py-32 ">
      <DocsPageHeader
        heading="My projects"
        text=" If you have any questions, inquiries, or would like to discuss a potential project or collaboration, please feel free to get in touch with me. I'm always excited to connect with fellow professionals and enthusiasts in the industry."
      />

      <div className="grid grid-cols-1 md:grid-cols-3  gap-4 mt-10">
        <Link
          href=""
          className="border border-secondary rounded-lg p-8 relative overflow-hidden h-[500px] group"
        >
          <div className="absolute inset-0">
            <Image
              src="/images/projects/cyberpunk-ntfs.jpg"
              width={300}
              height={300}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="opacity-0 group-hover:opacity-100 duration-700 absolute inset-0 bg-primary/30 flex items-center justify-center p-10">
            <div className="text-white text-center">
              <h3 className="text-4xl font-bold mb-2">Cyberpunk NTFS</h3>
              <p className="text-sm">
                create, buy, sell and discover digital collectibles in cyberpunk
                style, powered by midjourney
              </p>
            </div>
          </div>
        </Link>

        <Link
          href=""
          className="border border-secondary rounded-lg p-8 relative overflow-hidden h-[500px] group"
        >
          <div className="absolute inset-0">
            <Image
              src="/images/projects/cyberpunk-ntfs.jpg"
              width={300}
              height={300}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="opacity-0 group-hover:opacity-100 duration-700 absolute inset-0 bg-primary/30 flex items-center justify-center p-10">
            <div className="text-white text-center">
              <h3 className="text-4xl font-bold mb-2">Cyberpunk NTFS</h3>
              <p className="text-sm">
                create, buy, sell and discover digital collectibles in cyberpunk
                style, powered by midjourney
              </p>
            </div>
          </div>
        </Link>

        <Link
          href=""
          className="border border-secondary rounded-lg p-8 relative overflow-hidden h-[500px] group"
        >
          <div className="absolute inset-0">
            <Image
              src="/images/projects/cyberpunk-ntfs.jpg"
              width={300}
              height={300}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="opacity-0 group-hover:opacity-100 duration-700 absolute inset-0 bg-primary/30 flex items-center justify-center p-10">
            <div className="text-white text-center">
              <h3 className="text-4xl font-bold mb-2">Cyberpunk NTFS</h3>
              <p className="text-sm">
                create, buy, sell and discover digital collectibles in cyberpunk
                style, powered by midjourney
              </p>
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}
