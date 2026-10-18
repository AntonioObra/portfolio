<script setup lang="ts">
const { data: projects } = await useAsyncData('projects', () => queryCollection('projects').order('date', 'DESC').all())
useSeoMeta({ title: 'Selected work', description: 'Independent products and open source experiments by Antonio Obradović.' })
const root = ref<HTMLElement>()
useEditorialMotion(root)
</script>

<template>
  <div ref="root" class="archive-page">
    <header class="archive-heading"><div class="micro archive-eyebrow"><span>01 / Selected work</span><span>{{ String(projects?.length || 0).padStart(2, '0') }} projects</span></div><h1>Built with<br><em>intention.</em></h1><div class="archive-intro"><span class="archive-symbol" aria-hidden="true">↙</span><p>Independent products. Open source experiments.<br>A few things I’ve put into the world.</p></div></header>
    <ProjectIndex :projects="projects || []" />
    <div class="archive-end micro"><span>Always a work in progress.</span><a href="mailto:antonio@obradovic.dev">Have something in mind? ↗</a></div>
  </div>
</template>
