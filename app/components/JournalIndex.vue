<script setup lang="ts">
type Post = { title: string, description?: string, date: string, path: string }
const props = defineProps<{ posts: Post[] }>()
const years = computed(() => {
  const groups = new Map<number, Post[]>()
  for (const post of props.posts) {
    const year = new Date(post.date).getUTCFullYear()
    if (!Number.isFinite(year)) continue
    if (!groups.has(year)) groups.set(year, [])
    groups.get(year)!.push(post)
  }
  return [...groups].sort(([a], [b]) => b - a).map(([year, posts]) => ({ year, posts: posts.sort((a, b) => +new Date(b.date) - +new Date(a.date)) }))
})
const date = (value: string) => new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', timeZone: 'UTC' })
</script>

<template>
  <div class="journal-index">
    <section v-for="group in years" :key="group.year" class="journal-year" :aria-label="`Writing from ${group.year}`">
      <div class="journal-year-label"><h3>{{ group.year }}</h3><span class="micro">{{ String(group.posts.length).padStart(2, '0') }} entries</span></div>
      <div class="journal-year-posts"><NuxtLink v-for="post in group.posts" :key="post.path" :to="post.path" class="journal-entry editorial-row" data-cursor="Read"><time class="micro" :datetime="new Date(post.date).toISOString().slice(0, 10)">{{ date(post.date) }}</time><div><h4>{{ post.title }}</h4><p>{{ post.description }}</p></div><span class="journal-entry-arrow" aria-hidden="true">↗</span></NuxtLink></div>
    </section>
  </div>
</template>
