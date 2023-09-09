import HeroShader from "@/components/HeroShader";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="h-screen w-screen max-h-full max-w-full relative">
        {/* @ts-ignore */}
        <HeroShader className="fullscreen" />
      </section>
    </main>
  );
}
