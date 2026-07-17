<script setup lang="ts">
const { data: page } = await useAsyncData("projects-page", () => {
  return queryCollection("pages").path("/projects").first();
});
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

const { data: projects } = await useAsyncData("projects", () => {
  return queryCollection("projects").all();
});

const { global } = useAppConfig();

const title = page.value?.seo?.title || page.value?.title;
const description = page.value?.seo?.description || page.value?.description;

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
});

defineOgImage("Portfolio", { title, description });
</script>

<template>
  <UPage v-if="page" class="max-w-6xl mx-auto">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :ui="{
        title: 'mx-0! text-left',
        description: 'mx-0! text-left',
      }"
    />
    <UPageSection
      :ui="{
        container: 'pt-0!',
      }"
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <Motion
          v-for="(project, index) in projects"
          :key="project.title"
          :initial="{ opacity: 0, transform: 'translateY(10px)' }"
          :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ delay: 0.2 * index }"
          :in-view-options="{ once: true }"
        >
          <UPageCard
            :title="project.title"
            :description="project.description"
            :to="project.url"
            orientation="horizontal"
            variant="naked"
            class="group"
            :ui="{
              container: '!grid-cols-1'
            }"
          >
            <template #leading>
              <span class="text-sm text-muted">
                {{ new Date(project.date).getFullYear() }}
              </span>
            </template>
            <template #footer>
              <ULink
                :to="project.url"
                class="text-sm text-primary flex items-center"
              >
                View Project
                <UIcon
                  name="i-lucide-arrow-right"
                  class="size-4 text-primary transition-all opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
                />
              </ULink>
            </template>
          </UPageCard>
        </Motion>
      </div>
    </UPageSection>
  </UPage>
</template>
