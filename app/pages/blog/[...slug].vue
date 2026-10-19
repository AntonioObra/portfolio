<script setup lang="ts">
definePageMeta({ key: route => route.path })
const route = useRoute()
const root = ref<HTMLElement>()
const { data: page } = await useAsyncData(`journal-entry:${route.path}`, () =>
  queryCollection('blog').path(route.path).first()
)
if (!page.value) throw createError({ statusCode: 404, statusMessage: 'Article not found', fatal: true })

const { data: index } = await useAsyncData('journal-reading-index', () =>
  queryCollection('blog').select('path', 'title', 'description', 'date').order('date', 'DESC').all()
)
const position = computed(() => index.value?.findIndex(post => post.path === route.path) ?? -1)
const adjacent = computed(() => {
  if (position.value < 0 || !index.value) return []
  const newer = index.value[position.value - 1]
  const older = index.value[position.value + 1]
  return [newer && { ...newer, label: 'Newer entry' }, older && { ...older, label: 'Older entry' }].filter((post): post is NonNullable<typeof post> => !!post)
})
const toc = computed(() => page.value?.body?.toc?.links || [])
// Nuxt Content's minimark arrays are [tag, attributes, ...children].
const textFromBody = (node: unknown): string => {
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return (typeof node[0] === 'string' ? node.slice(2) : node).map(textFromBody).join(' ')
  if (node && typeof node === 'object') {
    const item = node as { value?: unknown, children?: unknown }
    return textFromBody(item.value ?? item.children)
  }
  return ''
}
const readingTime = computed(() => page.value?.minRead || Math.max(1, Math.ceil(textFromBody(page.value?.body).split(/\s+/).filter(Boolean).length / 220)))
const date = computed(() => new Date(page.value!.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }))
const isoDate = computed(() => new Date(page.value!.date).toISOString().slice(0, 10))
const author = computed(() => page.value?.author?.name || 'Antonio Obradović')
const toast = useToast()
const copied = ref(false)
let copyTimeout: ReturnType<typeof setTimeout> | undefined
const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    copied.value = true
    if (copyTimeout) clearTimeout(copyTimeout)
    copyTimeout = setTimeout(() => { copied.value = false }, 2500)
  } catch {
    toast.add({ title: 'Could not copy the link', description: 'You can copy the address from your browser.', color: 'neutral' })
  }
}
onBeforeUnmount(() => { if (copyTimeout) clearTimeout(copyTimeout) })
useSeoMeta({
  title: () => page.value?.seo?.title || page.value?.title,
  description: () => page.value?.seo?.description || page.value?.description,
  ogTitle: () => page.value?.seo?.title || page.value?.title,
  ogDescription: () => page.value?.seo?.description || page.value?.description,
  ogImage: () => page.value?.image,
  ogType: 'article',
  articlePublishedTime: () => isoDate.value
})
useEditorialMotion(root)
</script>

<template>
  <article v-if="page" ref="root" class="pb-4" aria-labelledby="article-title">
    <header data-motion="archive-heading" class="pt-[50px] pb-14 max-[540px]:pt-8 max-[540px]:pb-10">
      <div class="mb-14 flex flex-wrap items-center justify-between gap-5 text-sm uppercase leading-[1.7] tracking-[.11em] text-[#777e6e] max-[540px]:mb-10">
        <NuxtLink to="/blog" class="group inline-flex items-center gap-3 py-2 text-ink" data-cursor="Back"><span aria-hidden="true" class="transition-transform group-hover:-translate-x-1">↖</span> Back to the journal</NuxtLink>
        <span>03 / Field notes</span>
      </div>
      <h1 id="article-title" class="max-w-[1100px] text-balance font-serif text-[clamp(56px,8vw,112px)] font-normal leading-[.98] tracking-[-.045em] max-[540px]:text-[clamp(44px,12vw,64px)]">{{ page.title }}</h1>
      <p class="mt-8 max-w-[740px] text-lg leading-[1.8] text-[#626b5b] max-[540px]:mt-6 max-[540px]:text-base">{{ page.description }}</p>
      <div class="mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-5 border-t border-rule pt-6 text-sm text-[#6d7564]">
        <div class="flex flex-wrap gap-x-8 gap-y-3"><time :datetime="isoDate">{{ date }}</time><span>{{ readingTime }} min read</span></div>
        <span class="text-ink">Words by {{ author }}</span>
      </div>
    </header>

    <div class="grid grid-cols-[180px_minmax(0,740px)] gap-[60px] border-t border-rule pt-12 max-[1000px]:grid-cols-[150px_minmax(0,1fr)] max-[1000px]:gap-9 max-[800px]:grid-cols-1 max-[800px]:gap-10 max-[540px]:pt-8">
      <aside class="self-start min-[801px]:sticky min-[801px]:top-10" aria-label="Article navigation">
        <details v-if="toc.length" class="group min-[801px]:hidden">
          <summary class="flex cursor-pointer list-none justify-between gap-4 border-b border-rule pb-4 text-sm uppercase tracking-[.11em] [&::-webkit-details-marker]:hidden">In this entry <span class="transition-transform group-open:rotate-45" aria-hidden="true">+</span></summary>
          <nav aria-label="Article contents" class="mt-5 space-y-3"><a v-for="link in toc" :key="link.id" :href="`#${link.id}`" class="block py-1 text-sm leading-relaxed text-[#6d7564] hover:text-ink">{{ link.text }}</a></nav>
        </details>
        <div class="max-[800px]:hidden"><p class="mb-6 text-sm uppercase tracking-[.11em] text-[#7b806f]">{{ toc.length ? 'In this entry' : 'From the journal' }}</p><nav v-if="toc.length" aria-label="Article contents" class="space-y-5"><div v-for="link in toc" :key="link.id"><a :href="`#${link.id}`" class="block text-sm leading-relaxed text-[#6d7564] transition-colors hover:text-ink">{{ link.text }}</a><div v-if="link.children?.length" class="mt-3 space-y-3 border-l border-rule pl-3"><a v-for="child in link.children" :key="child.id" :href="`#${child.id}`" class="block text-sm leading-relaxed text-[#7b806f] hover:text-ink">{{ child.text }}</a></div></div></nav><p v-else class="font-serif text-2xl leading-snug text-[#6d7564]">Notes from<br>the process.</p></div>
        <a href="#article-title" class="mt-10 hidden w-fit border-b border-rule pb-2 text-sm text-[#6d7564] hover:text-ink min-[801px]:inline-block">Back to the top ↑</a>
      </aside>

      <div class="min-w-0">
        <ContentRenderer
          v-if="page.body"
          :value="page"
          class="text-[17px] leading-[1.95] text-[#444d3e] max-[540px]:text-base [&_p]:my-6 [&_p]:leading-[1.95] [&_h2]:mt-14 [&_h2]:mb-6 [&_h2]:scroll-mt-8 [&_h2]:font-serif [&_h2]:text-[clamp(36px,4vw,52px)] [&_h2]:font-normal [&_h2]:leading-[1.1] [&_h2]:tracking-[-.03em] [&_h2]:text-ink [&_h3]:mt-10 [&_h3]:mb-5 [&_h3]:scroll-mt-8 [&_h3]:font-serif [&_h3]:text-[32px] [&_h3]:font-normal [&_h3]:leading-tight [&_h3]:tracking-[-.02em] [&_h3]:text-ink [&_h4]:mt-8 [&_h4]:font-medium [&_h4]:text-ink [&_a]:text-ink [&_a]:underline [&_a]:decoration-[#a2ab96] [&_a]:underline-offset-4 [&_a]:transition-colors [&_a:hover]:decoration-ink [&_h2_a]:no-underline [&_h3_a]:no-underline [&_ul]:my-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_li]:pl-1 [&_li::marker]:text-[#8c967f] [&_blockquote]:my-10 [&_blockquote]:border-l-2 [&_blockquote]:border-[#9fa98f] [&_blockquote]:pl-6 [&_blockquote]:font-serif [&_blockquote]:text-[27px] [&_blockquote]:italic [&_blockquote]:leading-relaxed [&_hr]:my-12 [&_hr]:border-rule [&_img]:my-8 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-none [&_img]:border [&_img]:border-rule [&_pre]:my-8 [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_pre]:rounded-none [&_pre]:border [&_pre]:border-rule [&_pre]:p-5 [&_pre]:text-sm [&_pre]:leading-relaxed [&_code]:break-words [&_code]:font-mono [&_code]:text-[.85em] [&_pre_code]:break-normal [&_table]:w-full [&_table]:text-sm [&_th]:border-b [&_th]:border-rule [&_th]:p-3 [&_th]:text-left [&_td]:border-b [&_td]:border-rule [&_td]:p-3"
        />
        <div class="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-rule pt-6"><span class="font-serif text-2xl italic text-[#7b806f]">Thanks for reading.</span><button type="button" class="flex min-h-11 items-center gap-5 border-b border-rule py-2 text-sm text-ink hover:border-ink" data-cursor="Copy" @click="copyLink"><span role="status">{{ copied ? 'Link copied' : 'Copy article link' }}</span><span aria-hidden="true">{{ copied ? '✓' : '↗' }}</span></button></div>
      </div>
    </div>

    <nav v-if="adjacent.length" aria-label="More journal entries" class="mt-24 border-t border-rule pt-8 max-[540px]:mt-16">
      <div class="mb-8 flex justify-between gap-5 text-sm uppercase tracking-[.11em] text-[#777e6e]"><span>Keep reading</span><NuxtLink to="/blog" class="text-ink">All entries ↗</NuxtLink></div>
      <div class="grid grid-cols-2 gap-10 max-[650px]:grid-cols-1 max-[650px]:gap-0"><NuxtLink v-for="post in adjacent" :key="post.path" :to="post.path" data-editorial data-cursor="Read" class="group block border-t border-rule py-8"><span class="text-sm uppercase tracking-[.11em] text-[#777e6e]">{{ post.label }}</span><div class="mt-5 flex justify-between gap-6"><h2 class="font-serif text-[clamp(30px,3.5vw,44px)] font-normal leading-[1.1] tracking-[-.025em] transition-transform group-hover:translate-x-2">{{ post.title }}</h2><span aria-hidden="true" class="text-2xl">↗</span></div><p class="mt-5 max-w-[460px] text-sm leading-[1.8] text-[#6d7564]">{{ post.description }}</p></NuxtLink></div>
    </nav>
  </article>
</template>
