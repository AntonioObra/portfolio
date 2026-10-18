<script setup lang="ts">
useSeoMeta({ title: 'Start a conversation', description: 'Get in touch with Antonio Obradović, a developer and independent builder in Zagreb.' })
const root = ref<HTMLElement>()
useEditorialMotion(root)
</script>

<template>
  <div ref="root" class="archive-page contact-page">
    <header class="archive-heading"><div class="micro archive-eyebrow"><span>04 / Start a conversation</span><span>Zagreb, Croatia</span></div><h1>Good things<br><em>start here.</em></h1><div class="archive-intro"><span class="archive-symbol" aria-hidden="true">↙</span><p>A project, an idea, or an interesting question.<br>My inbox is open.</p></div></header>
    <a href="mailto:antonio@obradovic.dev" class="contact-destination editorial-row" data-cursor="Say hi"><span class="micro">Email</span><span>antonio@obradovic.dev</span><span aria-hidden="true">↗</span></a>
    <div class="archive-end micro"><a href="https://github.com/AntonioObra" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://x.com/obradovicdotdev" target="_blank" rel="noopener noreferrer">X / Twitter ↗</a></div>
  </div>
</template>
