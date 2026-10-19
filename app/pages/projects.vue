<script setup lang="ts">
const { data: projects } = await useAsyncData("projects", () =>
  queryCollection("projects").order("date", "DESC").all(),
);
useSeoMeta({
  title: "Selected work",
  description:
    "Independent products and open source experiments by Antonio Obradović.",
});
const root = ref<HTMLElement>();
useEditorialMotion(root);
</script>

<template>
  <div ref="root">
    <header
      class="pt-[50px] pb-[85px] [&>h1]:m-0 [&>h1]:font-serif [&>h1]:text-[clamp(80px,13vw,190px)] [&>h1]:leading-[.83] [&>h1]:font-normal [&>h1]:tracking-[-.055em] [&_em]:pl-[12%] max-[800px]:pb-[65px] max-[540px]:pt-[30px] max-[540px]:[&>h1]:text-[24vw]"
      data-motion="archive-heading"
    >
      <h1>Built with<br /><em>intention.</em></h1>
      <div
        class="mt-[50px] flex items-end justify-end gap-[65px] [&>p]:text-base [&>p]:leading-[1.9] [&>p]:text-[#6d7564] max-[540px]:mt-[35px] max-[540px]:gap-[30px] max-[540px]:[&>p]:text-sm"
      >
        <span
          class="font-serif text-[70px] leading-none max-[540px]:text-[55px]"
          aria-hidden="true"
          >↙</span
        >
        <p>
          Independent products. Open source experiments.<br />A few things I’ve
          put into the world.
        </p>
      </div>
    </header>
    <ProjectIndex :projects="projects || []" />
  </div>
</template>
