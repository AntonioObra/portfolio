<script setup lang="ts">
type Project = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  url?: string;
  github?: string;
  website?: string;
};
defineProps<{ projects: Project[] }>();
const links = (project: Project) => {
  const github =
    project.github ||
    (project.url?.includes("github.com/") ? project.url : undefined);
  const website =
    project.website ||
    (project.url && !project.url.includes("github.com/")
      ? project.url
      : undefined);
  return [
    website && { label: "Website", url: website },
    github && { label: "GitHub", url: github },
  ].filter((link): link is { label: string; url: string } => !!link);
};
</script>

<template>
  <div>
    <article
      v-for="(project, index) in projects"
      :key="project.title"
      class="group/project relative grid grid-cols-[100px_minmax(0,1fr)_165px] gap-[35px] border-t border-rule py-[50px] last:border-b max-[800px]:grid-cols-[55px_minmax(0,1fr)_125px] max-[800px]:gap-[25px] max-[540px]:grid-cols-[42px_minmax(0,1fr)] max-[540px]:gap-[18px] max-[540px]:py-8" data-editorial
    >
      <div class="flex flex-col gap-3 pt-3.5 text-[#75796c] max-[540px]:gap-2 max-[540px]:text-xs text-sm font-[450] tracking-[.11em] uppercase leading-[1.7]">
        <span>0{{ index + 1 }}</span
        ><span>{{ new Date(project.date).getUTCFullYear() }}</span>
      </div>
      <div class="[&>h3]:mb-[22px] [&>h3]:font-serif [&>h3]:text-[clamp(48px,6vw,88px)] [&>h3]:leading-none [&>h3]:font-normal [&>h3]:tracking-[-.045em] [&>h3]:transition-transform [&>h3]:duration-500 [&>h3]:ease-[cubic-bezier(.2,.7,.2,1)] group-hover/project:[&>h3]:translate-x-3 max-[800px]:[&>h3]:text-[62px] max-[540px]:[&>h3]:text-[55px] [&>p]:mb-5 [&>p]:max-w-[500px] [&>p]:text-base [&>p]:leading-[1.9] [&>p]:text-[#656b5e]">
        <h3>{{ project.title }}</h3>
        <p>{{ project.description }}</p>
        <span class="font-[450] tracking-[.11em] uppercase leading-[1.7] text-[13px] text-[#777e6e] [overflow-wrap:anywhere] max-[540px]:text-xs">{{
          project.tags.join(" / ")
        }}</span>
      </div>
      <div class="flex flex-col flex-wrap gap-3 self-center max-[540px]:col-start-2 max-[540px]:flex-row max-[540px]:gap-x-6">
        <a
          v-for="link in links(project)"
          :key="link.label"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group/link flex justify-between gap-[30px] border-b border-rule py-3 transition-colors hover:border-ink max-[540px]:min-w-[100px] max-[540px]:gap-[22px] max-[540px]:text-[13px] [&>span:last-child]:text-xl [&>span:last-child]:leading-none [&>span:last-child]:transition-transform hover:[&>span:last-child]:translate-x-[3px] hover:[&>span:last-child]:-translate-y-[3px] text-sm font-[450] tracking-[.11em] uppercase leading-[1.7]"
          :aria-label="`${project.title} — ${link.label}`"
          data-cursor="Visit"
          ><span>{{ link.label }}</span
          ><span aria-hidden="true">↗</span></a
        >
      </div>
    </article>
  </div>
</template>
