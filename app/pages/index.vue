<script setup lang="ts">
const { data: projects } = await useAsyncData("home-projects", () =>
  queryCollection("projects").all(),
);
const { data: posts } = await useAsyncData("home-journal", () =>
  queryCollection("blog").order("date", "DESC").all(),
);
useSeoMeta({
  title: "Developer & independent builder",
  description:
    "Antonio Obradović — full stack developer in Zagreb, Croatia. Selected software, independent projects, and notes on building.",
});
const pageRoot = ref<HTMLElement>();
let disposed = false;
let cleanup = () => {};
onMounted(async () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const magneticCleanups: (() => void)[] = [];
  const { gsap } = await import("gsap");
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  gsap.registerPlugin(ScrollTrigger);
  if (disposed || !pageRoot.value) return;
  const context = gsap.context(() => {
    const entrance = gsap.timeline({ defaults: { ease: "power3.out" } });
    entrance
      .from(".hero-meta, [data-motion=hero-title] > p", {
        y: 18,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
      })
      .from(
        "[data-motion=name-line] > span",
        { yPercent: 110, rotate: 3, duration: 1.35, stagger: 0.14 },
        "-=.5",
      )
      .from(
        "[data-motion=hero-bottom], .hero-aside",
        { y: 18, opacity: 0, duration: 0.8, stagger: 0.1 },
        "-=.7",
      );
    gsap.to("[data-motion=hero-title]", {
      y: -80,
      opacity: 0.25,
      ease: "none",
      scrollTrigger: {
        trigger: "[data-motion=void-hero]",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
    gsap.to("[data-motion=lily-scene]", {
      y: 65,
      ease: "none",
      scrollTrigger: {
        trigger: "[data-motion=void-hero]",
        start: "top top",
        end: "bottom top",
        scrub: 1.4,
      },
    });
    gsap.utils
      .toArray<HTMLElement>(
        "[data-motion=section-heading] h2, [data-motion=about-copy] h2, [data-motion=contact-section] h2",
      )
      .forEach((el) => {
        gsap.from(el, {
          yPercent: 35,
          clipPath: "inset(0 0 100% 0)",
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });
    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
      gsap.from(el, {
        y: 32,
        duration: 0.85,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 94%", once: true },
      });
    });
    gsap.utils.toArray<HTMLElement>("[data-editorial]").forEach((el) => {
      gsap.from(el, {
        x: 22,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 94%", once: true },
      });
    });
    gsap.to("[data-motion=about-star]", {
      rotation: 150,
      ease: "none",
      scrollTrigger: {
        trigger: "[data-motion=about-section]",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });
    gsap.from("[data-motion=contact-mark]", {
      y: 90,
      rotate: -12,
      ease: "none",
      scrollTrigger: {
        trigger: "[data-motion=contact-section]",
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1,
      },
    });
    const magnetics = gsap.utils.toArray<HTMLElement>(
      "[data-motion=circle-arrow], [data-motion=header-contact], [data-motion=text-link]",
    );
    magnetics.forEach((el) => {
      const move = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        const rect = el.getBoundingClientRect();
        gsap.to(el, {
          x: (event.clientX - rect.left - rect.width / 2) * 0.12,
          y: (event.clientY - rect.top - rect.height / 2) * 0.2,
          duration: 0.35,
        });
      };
      const leave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, .4)" });
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      magneticCleanups.push(() => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
        gsap.killTweensOf(el);
      });
    });
  }, pageRoot.value);
  cleanup = () => {
    magneticCleanups.forEach((fn) => fn());
    context.revert();
  };
});
onBeforeUnmount(() => {
  disposed = true;
  cleanup();
});
</script>

<template>
  <div ref="pageRoot">
    <section class="relative isolate flex h-[calc(100svh-96px)] min-h-[710px] max-h-[1100px] flex-col overflow-hidden bg-[#080909] px-[5%] pt-7 pb-[35px] text-paper max-[800px]:h-[calc(100svh-78px)] max-[800px]:min-h-[680px] max-[540px]:min-h-[660px] max-[540px]:max-h-[850px] max-[540px]:px-[6%] max-[540px]:pt-[22px] max-[540px]:pb-[25px]" data-motion="void-hero" aria-labelledby="hero-title">
      <MetalFlower />
      <div class="pointer-events-none relative z-10 flex min-h-[490px] flex-1 items-center max-[540px]:min-h-[480px] max-[540px]:items-end max-[540px]:pb-20">
        <div class="relative z-20 w-full [&>p]:mb-8 [&>p]:ml-[5px] [&>p]:text-sm [&>p]:text-[#9c9d96] max-[540px]:[&>p]:mb-5 max-[540px]:[&>p]:text-xs [&>h1]:m-0 [&>h1]:font-serif [&>h1]:text-[clamp(90px,11.4vw,185px)] [&>h1]:leading-[.88] [&>h1]:font-normal [&>h1]:tracking-[-.055em] max-[800px]:[&>h1]:text-[14vw] max-[540px]:[&>h1]:text-[18vw]" data-motion="hero-title">
          <p class="text-sm font-[450] tracking-[.11em] uppercase leading-[1.7]">
            Independent developer & builder / Zagreb, Croatia
          </p>
          <h1 id="hero-title">
            <span class="mb-[-.1em] block overflow-hidden pr-[.08em] pb-[.1em] [&>span]:block" data-motion="name-line"><span>Antonio</span></span
            ><span class="mb-[-.1em] block overflow-hidden pr-[.08em] pb-[.1em] [&>span]:block ml-[9%] max-[540px]:ml-0" data-motion="name-line"
              ><span>Obradović<span class="text-[#9a9d94]">.</span></span></span
            >
          </h1>
        </div>
      </div>
      <div class="relative z-20 grid grid-cols-3 items-center border-t border-white/15 pt-[25px] [&>p]:m-0 [&>p]:text-center [&>p]:font-serif [&>p]:text-[25px] [&>p]:leading-[1.2] max-[540px]:grid-cols-[1fr_auto] max-[540px]:gap-3 max-[540px]:pt-[22px] max-[540px]:[&>p]:text-right max-[540px]:[&>p]:text-[19px]" data-motion="hero-bottom">
        <a href="#work" class="flex items-center gap-[15px] max-[540px]:gap-2.5 max-[540px]:text-xs text-sm font-[450] tracking-[.11em] uppercase leading-[1.7]"
          ><span class="grid size-[42px] place-items-center rounded-full border border-white/25 text-lg max-[540px]:size-[34px]" data-motion="circle-arrow">↓</span> Scroll to discover</a
        >
        <p>Thoughtful software.<br />Built with intention.</p>
        <span class="font-[450] tracking-[.11em] uppercase leading-[1.7] text-right text-[13px] text-[#8e918a] max-[540px]:hidden"
          >An ongoing exploration<br />Code. Form. Function.</span
        >
      </div>
    </section>

    <section id="work" class="px-[7%] py-[110px] min-[1600px]:px-[max(7%,calc((100vw-1400px)/2))] max-[800px]:px-[6%] max-[800px]:py-20">
      <div class="mb-[65px] grid grid-cols-[1fr_auto] items-baseline [&>p]:col-span-full [&>p]:mb-[30px] [&>p]:text-[#6b6c65] max-[540px]:mb-[38px] max-[540px]:grid-cols-[minmax(0,1fr)] max-[540px]:gap-5 max-[540px]:[&>p]:col-auto max-[540px]:[&>p]:mb-[5px] max-[540px]:[&>p]:text-[13px] max-[540px]:[&>a]:gap-2.5 max-[540px]:[&>a]:text-xs" data-motion="section-heading" data-reveal>
        <p class="text-sm font-[450] tracking-[.11em] uppercase leading-[1.7]">01 / Selected work</p>
        <h2 class="font-serif font-normal text-[clamp(45px,6vw,88px)] leading-[1.02] tracking-[-.045em] max-[540px]:text-[43px] [&_em]:font-normal">Ideas, made <em>real.</em></h2>
        <NuxtLink to="/projects" class="inline-flex w-fit gap-6 border-b border-[#a6a79e] pb-[7px] [&>span]:text-[15px] text-sm font-[450] tracking-[.11em] uppercase leading-[1.7]" data-motion="text-link"
          >All projects <span>↗</span></NuxtLink
        >
      </div>
      <ProjectIndex :projects="projects || []" />
    </section>

    <section id="about" class="px-[7%] py-[110px] min-[1600px]:px-[max(7%,calc((100vw-1400px)/2))] max-[800px]:px-[6%] max-[800px]:py-20 grid grid-cols-[1fr_1.65fr] gap-20 border-y border-rule bg-[#e5e7de] max-[800px]:grid-cols-[1fr_2fr] max-[800px]:gap-[35px] max-[540px]:grid-cols-1 max-[540px]:gap-[30px]" data-motion="about-section">
      <div class="flex flex-col items-start justify-between [&>span:last-child]:text-[13px] [&>span:last-child]:text-[#6d7067] max-[540px]:flex-row max-[540px]:items-center max-[540px]:[&>span:last-child]:hidden" data-reveal>
        <p class="text-sm font-[450] tracking-[.11em] uppercase leading-[1.7]">02 / A little about me</p>
        <span class="font-[family-name:Georgia,serif] text-[170px] leading-none text-[#777e6e] max-[800px]:text-[120px] max-[540px]:text-[45px]" data-motion="about-star" aria-hidden="true">✳</span
        ><span class="text-sm font-[450] tracking-[.11em] uppercase leading-[1.7]">Curiosity, by design.</span>
      </div>
      <div class="[&>h2]:mb-[35px] [&>p]:mb-[18px] [&>p]:max-w-[540px] [&>p]:text-[17px] [&>p]:leading-[1.95] [&>p]:text-[#62665d] max-[540px]:[&>p]:text-base [&>a]:mt-[15px] [&>a]:text-sm" data-motion="about-copy" data-reveal>
        <h2 class="font-serif font-normal text-[clamp(45px,6vw,88px)] leading-[1.02] tracking-[-.045em] max-[540px]:text-[43px] [&_em]:font-normal">A developer’s mind.<br />A builder’s <em>instinct.</em></h2>
        <p>
          I’m Antonio, a full stack developer based in Zagreb, Croatia. I turn
          complex problems into considered, useful software — from the backend
          architecture to the details you interact with.
        </p>
        <p>
          My work lives mostly in PHP and Symfony. Outside of it, I explore Go,
          build independent products, and follow the questions that make me want
          to open my editor.
        </p>
        <div class="my-[30px] flex flex-wrap gap-5 max-[540px]:gap-2.5 text-sm font-[450] tracking-[.11em] uppercase leading-[1.7]">
          <span>Currently / Lognet</span><span>Previously / Papar</span
          ><span>Always / Learning</span>
        </div>
        <a class="inline-flex w-fit gap-6 border-b border-[#a6a79e] pb-[7px] [&>span]:text-[15px] text-sm font-[450] tracking-[.11em] uppercase leading-[1.7]" data-motion="text-link" href="mailto:antonio@obradovic.dev"
          >Let’s make something meaningful <span>↗</span></a
        >
      </div>
    </section>

    <section class="px-[7%] py-[110px] min-[1600px]:px-[max(7%,calc((100vw-1400px)/2))] max-[800px]:px-[6%] max-[800px]:py-20">
      <div class="mb-[65px] grid grid-cols-[1fr_auto] items-baseline [&>p]:col-span-full [&>p]:mb-[30px] [&>p]:text-[#6b6c65] max-[540px]:mb-[38px] max-[540px]:grid-cols-[minmax(0,1fr)] max-[540px]:gap-5 max-[540px]:[&>p]:col-auto max-[540px]:[&>p]:mb-[5px] max-[540px]:[&>p]:text-[13px] max-[540px]:[&>a]:gap-2.5 max-[540px]:[&>a]:text-xs" data-motion="section-heading" data-reveal>
        <p class="text-sm font-[450] tracking-[.11em] uppercase leading-[1.7]">03 / The journal</p>
        <h2 class="font-serif font-normal text-[clamp(45px,6vw,88px)] leading-[1.02] tracking-[-.045em] max-[540px]:text-[43px] [&_em]:font-normal">Notes from <em>the process.</em></h2>
        <NuxtLink to="/blog" class="inline-flex w-fit gap-6 border-b border-[#a6a79e] pb-[7px] [&>span]:text-[15px] text-sm font-[450] tracking-[.11em] uppercase leading-[1.7]" data-motion="text-link"
          >All writing <span>↗</span></NuxtLink
        >
      </div>

      <JournalIndex :posts="posts || []" />
    </section>

    <section class="flex items-center justify-between overflow-hidden bg-[#171b18] px-[7%] py-[100px] text-paper [&_h2]:text-[clamp(55px,8vw,120px)] [&_p]:mb-[30px] [&_p]:text-[#969f8d] max-[540px]:px-[6%] max-[540px]:py-[75px] max-[540px]:[&_h2]:text-[52px]" data-motion="contact-section">
      <div data-reveal>
        <p class="text-sm font-[450] tracking-[.11em] uppercase leading-[1.7]">04 / Start a conversation</p>
        <h2 class="font-serif font-normal text-[clamp(45px,6vw,88px)] leading-[1.02] tracking-[-.045em] max-[540px]:text-[43px] [&_em]:font-normal">Something in mind?<br />Let’s <em>build it.</em></h2>
        <a href="mailto:antonio@obradovic.dev" class="mt-[35px] inline-block border-b border-[#666e5e] pb-2.5 text-[17px] [&>span]:ml-[50px] max-[540px]:text-base"
          >antonio@obradovic.dev <span>↗</span></a
        >
      </div>
      <span class="mr-[4%] font-serif text-[250px] leading-[.8] tracking-[-.13em] text-[#9ba58d] max-[540px]:hidden" data-motion="contact-mark" aria-hidden="true">a.</span>
    </section>
  </div>
</template>
