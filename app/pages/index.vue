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
      .from(".hero-meta, .hero-title > p", {
        y: 18,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
      })
      .from(
        ".name-line > span",
        { yPercent: 110, rotate: 3, duration: 1.35, stagger: 0.14 },
        "-=.5",
      )
      .from(
        ".hero-bottom, .hero-aside",
        { y: 18, opacity: 0, duration: 0.8, stagger: 0.1 },
        "-=.7",
      );
    gsap.to(".hero-title", {
      y: -80,
      opacity: 0.25,
      ease: "none",
      scrollTrigger: {
        trigger: ".void-hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
    gsap.to(".lily-scene", {
      y: 65,
      ease: "none",
      scrollTrigger: {
        trigger: ".void-hero",
        start: "top top",
        end: "bottom top",
        scrub: 1.4,
      },
    });
    gsap.utils
      .toArray<HTMLElement>(
        ".section-heading h2, .about-copy h2, .contact-section h2",
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
    gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
      gsap.from(el, {
        y: 32,
        duration: 0.85,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 94%", once: true },
      });
    });
    gsap.utils.toArray<HTMLElement>(".editorial-row").forEach((el) => {
      gsap.from(el, {
        x: 22,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 94%", once: true },
      });
    });
    gsap.to(".about-star", {
      rotation: 150,
      ease: "none",
      scrollTrigger: {
        trigger: ".about-section",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });
    gsap.from(".contact-mark", {
      y: 90,
      rotate: -12,
      ease: "none",
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1,
      },
    });
    const magnetics = gsap.utils.toArray<HTMLElement>(
      ".circle-arrow, .header-contact, .text-link",
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
  <div ref="pageRoot" class="portfolio-home">
    <section class="void-hero" aria-labelledby="hero-title">
      <MetalFlower />
      <div class="hero-composition">
        <div class="hero-title hero-reveal">
          <p class="micro hero-kicker">
            Independent developer & builder / Zagreb, Croatia
          </p>
          <h1 id="hero-title">
            <span class="name-line"><span>Antonio</span></span
            ><span class="name-line name-surname"
              ><span>Obradović<span class="name-dot">.</span></span></span
            >
          </h1>
        </div>
      </div>
      <div class="hero-bottom hero-reveal">
        <a href="#work" class="explore micro"
          ><span class="circle-arrow">↓</span> Scroll to discover</a
        >
        <p>Thoughtful software.<br />Built with intention.</p>
        <span class="micro hero-edition"
          >An ongoing exploration<br />Code. Form. Function.</span
        >
      </div>
    </section>

    <section id="work" class="paper-section work-section">
      <div class="section-heading reveal">
        <p class="micro">01 / Selected work</p>
        <h2>Ideas, made <em>real.</em></h2>
        <NuxtLink to="/projects" class="text-link micro"
          >All projects <span>↗</span></NuxtLink
        >
      </div>
      <ProjectIndex :projects="projects || []" />
    </section>

    <section id="about" class="paper-section about-section">
      <div class="about-label reveal">
        <p class="micro">02 / A little about me</p>
        <span class="about-star" aria-hidden="true">✳</span
        ><span class="micro">Curiosity, by design.</span>
      </div>
      <div class="about-copy reveal">
        <h2>A developer’s mind.<br />A builder’s <em>instinct.</em></h2>
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
        <div class="about-facts micro">
          <span>Currently / Lognet</span><span>Previously / Papar</span
          ><span>Always / Learning</span>
        </div>
        <a class="text-link micro" href="mailto:antonio@obradovic.dev"
          >Let’s make something meaningful <span>↗</span></a
        >
      </div>
    </section>

    <section class="paper-section journal-section">
      <div class="section-heading reveal">
        <p class="micro">03 / The journal</p>
        <h2>Notes from <em>the process.</em></h2>
        <NuxtLink to="/blog" class="text-link micro"
          >All writing <span>↗</span></NuxtLink
        >
      </div>

      <JournalIndex :posts="posts || []" />
    </section>

    <section class="contact-section">
      <div class="reveal">
        <p class="micro">04 / Start a conversation</p>
        <h2>Something in mind?<br />Let’s <em>build it.</em></h2>
        <a href="mailto:antonio@obradovic.dev" class="contact-email"
          >antonio@obradovic.dev <span>↗</span></a
        >
      </div>
      <span class="contact-mark" aria-hidden="true">a.</span>
    </section>
  </div>
</template>
