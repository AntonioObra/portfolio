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
  <div class="project-index">
    <article
      v-for="(project, index) in projects"
      :key="project.title"
      class="project-entry editorial-row"
    >
      <div class="project-entry-index micro">
        <span>0{{ index + 1 }}</span
        ><span>{{ new Date(project.date).getUTCFullYear() }}</span>
      </div>
      <div class="project-entry-main">
        <h3>{{ project.title }}</h3>
        <p>{{ project.description }}</p>
        <span class="micro project-entry-tags">{{
          project.tags.join(" / ")
        }}</span>
      </div>
      <div class="project-entry-links">
        <a
          v-for="link in links(project)"
          :key="link.label"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="project-destination micro"
          :aria-label="`${project.title} — ${link.label}`"
          data-cursor="Visit"
          ><span>{{ link.label }}</span
          ><span aria-hidden="true">↗</span></a
        >
      </div>
    </article>
  </div>
</template>
