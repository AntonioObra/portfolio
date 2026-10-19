<script setup lang="ts">
useSeoMeta({ title: 'Start a conversation', description: 'Get in touch with Antonio Obradović, a developer and independent builder in Zagreb.' })
const root = ref<HTMLElement>()
useEditorialMotion(root)
</script>

<template>
  <div ref="root">
    <header class="pt-[50px] pb-[85px] [&>h1]:m-0 [&>h1]:font-serif [&>h1]:text-[clamp(80px,13vw,190px)] [&>h1]:leading-[.83] [&>h1]:font-normal [&>h1]:tracking-[-.055em] [&_em]:pl-[12%] max-[800px]:pb-[65px] max-[540px]:pt-[30px] max-[540px]:[&>h1]:text-[24vw]" data-motion="archive-heading"><div class="text-sm font-[450] tracking-[.11em] uppercase leading-[1.7] mb-[65px] flex justify-between text-[#777e6e] max-[540px]:mb-[50px] max-[540px]:gap-[18px] max-[540px]:text-[13px]"><span>04 / Start a conversation</span><span>Zagreb, Croatia</span></div><h1>Good things<br><em>start here.</em></h1><div class="mt-[50px] flex items-end justify-end gap-[65px] [&>p]:text-base [&>p]:leading-[1.9] [&>p]:text-[#6d7564] max-[540px]:mt-[35px] max-[540px]:gap-[30px] max-[540px]:[&>p]:text-sm"><span class="font-serif text-[70px] leading-none max-[540px]:text-[55px]" aria-hidden="true">↙</span><p>A project, an idea, or an interesting question.<br>My inbox is open.</p></div></header>
    <a href="mailto:antonio@obradovic.dev" class="flex items-baseline justify-between gap-[35px] border-y border-rule py-[35px] [&>span:nth-child(2)]:font-serif [&>span:nth-child(2)]:text-[clamp(28px,5vw,65px)] [&>span:nth-child(2)]:leading-[1.1] [&>span:nth-child(2)]:tracking-[-.035em] [&>span:last-child]:text-[35px] max-[540px]:flex-wrap max-[540px]:gap-[15px] max-[540px]:[&>span:first-child]:w-full max-[540px]:[&>span:nth-child(2)]:text-[29px] max-[540px]:[&>span:last-child]:text-[25px]" data-editorial data-cursor="Say hi"><span class="text-sm font-[450] tracking-[.11em] uppercase leading-[1.7]">Email</span><span>antonio@obradovic.dev</span><span aria-hidden="true">↗</span></a>
    <div class="mt-[70px] flex flex-wrap justify-between gap-[30px] border-t border-rule pt-[25px] text-[#6d7564] [&>a]:text-ink max-[540px]:mt-10 max-[540px]:text-xs text-sm font-[450] tracking-[.11em] uppercase leading-[1.7]"><a href="https://github.com/AntonioObra" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://x.com/obradovicdotdev" target="_blank" rel="noopener noreferrer">X / Twitter ↗</a></div>
  </div>
</template>
