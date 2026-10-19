<script setup lang="ts">
definePageMeta({ key: (route) => route.path });
const route = useRoute();
const root = ref<HTMLElement>();
const { data: page } = await useAsyncData(`journal-entry:${route.path}`, () =>
  queryCollection("blog").path(route.path).first(),
);
if (!page.value)
  throw createError({
    statusCode: 404,
    statusMessage: "Article not found",
    fatal: true,
  });

// Nuxt Content's minimark arrays are [tag, attributes, ...children].
const textFromBody = (node: unknown): string => {
  if (typeof node === "string") return node;
  if (Array.isArray(node))
    return (typeof node[0] === "string" ? node.slice(2) : node)
      .map(textFromBody)
      .join(" ");
  if (node && typeof node === "object") {
    const item = node as { value?: unknown; children?: unknown };
    return textFromBody(item.value ?? item.children);
  }
  return "";
};
const readingTime = computed(
  () =>
    page.value?.minRead ||
    Math.max(
      1,
      Math.ceil(
        textFromBody(page.value?.body).split(/\s+/).filter(Boolean).length /
          220,
      ),
    ),
);
const date = computed(() =>
  new Date(page.value!.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }),
);
const isoDate = computed(() =>
  new Date(page.value!.date).toISOString().slice(0, 10),
);
useSeoMeta({
  title: () => page.value?.seo?.title || page.value?.title,
  description: () => page.value?.seo?.description || page.value?.description,
  ogTitle: () => page.value?.seo?.title || page.value?.title,
  ogDescription: () => page.value?.seo?.description || page.value?.description,
  ogImage: () => page.value?.image,
  ogType: "article",
  articlePublishedTime: () => isoDate.value,
});
useEditorialMotion(root);
</script>

<template>
  <article
    v-if="page"
    ref="root"
    class="mx-auto max-w-[1100px] pb-4"
    aria-labelledby="article-title"
  >
    <header
      data-motion="archive-heading"
      class="pt-[50px] pb-8 text-center max-[540px]:pt-8"
    >
      <div
        class="mb-14 flex justify-center text-sm uppercase leading-[1.7] tracking-[.11em] text-[#777e6e] max-[540px]:mb-10"
      >
        <NuxtLink
          to="/blog"
          class="group inline-flex items-center gap-3 py-2 text-ink"
          data-cursor="Back"
          ><span
            aria-hidden="true"
            class="transition-transform group-hover:-translate-x-1"
            >↖</span
          >
          Back to the journal</NuxtLink
        >
      </div>
      <h1
        id="article-title"
        class="mx-auto max-w-[1100px] text-balance font-serif text-[clamp(56px,8vw,112px)] font-normal leading-[.98] tracking-[-.045em] max-[540px]:text-[clamp(44px,12vw,64px)]"
      >
        {{ page.title }}
      </h1>
      <p
        class="mx-auto mt-8 max-w-[740px] text-lg leading-[1.8] text-[#626b5b] max-[540px]:mt-6 max-[540px]:text-base"
      >
        {{ page.description }}
      </p>
      <div
        class="flex flex-wrap justify-center gap-x-8 gap-y-3 pt-6 text-sm text-[#6d7564]"
      >
        <time :datetime="isoDate">{{ date }}</time>
        <span>{{ readingTime }} min read</span>
      </div>
    </header>

    <div class="mx-auto w-full max-w-[740px] min-w-0 border-t border-rule pt-8">
      <ContentRenderer
        v-if="page.body"
        :value="page"
        class="text-[17px] leading-[1.95] text-[#444d3e] max-[540px]:text-base [&_p]:my-6 [&_p]:leading-[1.95] [&_h2]:mt-14 [&_h2]:mb-6 [&_h2]:scroll-mt-8 [&_h2]:font-serif [&_h2]:text-[clamp(36px,4vw,52px)] [&_h2]:font-normal [&_h2]:leading-[1.1] [&_h2]:tracking-[-.03em] [&_h2]:text-ink [&_h3]:mt-10 [&_h3]:mb-5 [&_h3]:scroll-mt-8 [&_h3]:font-serif [&_h3]:text-[32px] [&_h3]:font-normal [&_h3]:leading-tight [&_h3]:tracking-[-.02em] [&_h3]:text-ink [&_h4]:mt-8 [&_h4]:font-medium [&_h4]:text-ink [&_a]:text-ink [&_a]:underline [&_a]:decoration-[#a2ab96] [&_a]:underline-offset-4 [&_a]:transition-colors [&_a:hover]:decoration-ink [&_h2_a]:no-underline [&_h3_a]:no-underline [&_ul]:my-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_li]:pl-1 [&_li::marker]:text-[#8c967f] [&_blockquote]:my-10 [&_blockquote]:border-l-2 [&_blockquote]:border-[#9fa98f] [&_blockquote]:pl-6 [&_blockquote]:font-serif [&_blockquote]:text-[27px] [&_blockquote]:italic [&_blockquote]:leading-relaxed [&_hr]:my-12 [&_hr]:border-rule [&_img]:my-8 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-none [&_img]:border [&_img]:border-rule [&_pre]:my-8 [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_pre]:rounded-none [&_pre]:border [&_pre]:border-rule [&_pre]:p-5 [&_pre]:text-sm [&_pre]:leading-relaxed [&_code]:break-words [&_code]:font-mono [&_code]:text-[.85em] [&_pre_code]:break-normal [&_table]:w-full [&_table]:text-sm [&_th]:border-b [&_th]:border-rule [&_th]:p-3 [&_th]:text-left [&_td]:border-b [&_td]:border-rule [&_td]:p-3"
      />
    </div>
  </article>
</template>
