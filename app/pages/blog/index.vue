<script setup lang="ts">
const { data: posts } = await useAsyncData('blogs', () => queryCollection('blog').order('date', 'DESC').all())
useSeoMeta({ title: 'The journal', description: 'Engineering notes, experiments, and lessons from the process of building software.' })
const root = ref<HTMLElement>()
useEditorialMotion(root)
</script>

<template>
  <div ref="root" class="archive-page">
    <header class="archive-heading"><div class="micro archive-eyebrow"><span>03 / The journal</span><span>{{ String(posts?.length || 0).padStart(2, '0') }} entries</span></div><h1>Thinking<br><em>out loud.</em></h1><div class="archive-intro"><span class="archive-symbol" aria-hidden="true">↙</span><p>Notes on code, tools, and everything in between.<br>An ongoing record of figuring things out.</p></div></header>
    <JournalIndex :posts="posts || []" />
    <div class="archive-end micro"><span>Less noise. More perspective.</span><NuxtLink to="/projects">Explore the work ↗</NuxtLink></div>
  </div>
</template>
