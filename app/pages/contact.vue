<script setup lang="ts">
const { data: page } = await useAsyncData("index", () => {
  return queryCollection("index").first();
});
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

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
  <UPage v-if="page">
    <UPageHero
      title="Contact Me"
      description="Feel free to reach out via email."
      :ui="{
        container: '!pb-10 mt-40'
      }"
    />
    <UPageSection
      :ui="{
        container: 'pt-0! mt-0 flex items-center justify-center',
      }"
    >
      <ULink
        to="mailto:antonio@obradovic.dev"
        class="text-primary text-lg flex items-center gap-2"
      >
        <UButton variant="soft">
          <UIcon name="i-lucide-mail" class="size-5" />
          antonio@obradovic.dev
        </UButton>
      </ULink>
    </UPageSection>
  </UPage>
</template>
