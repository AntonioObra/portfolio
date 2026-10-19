<script setup lang="ts">
const { data: posts } = await useAsyncData('blogs', () => queryCollection('blog').order('date', 'DESC').all())
useSeoMeta({ title: 'The journal', description: 'Engineering notes, experiments, and lessons from the process of building software.' })
const root = ref<HTMLElement>()
useEditorialMotion(root)
</script>

<template>
  <div ref="root">
    <header class="pt-[50px] pb-[85px] [&>h1]:m-0 [&>h1]:font-serif [&>h1]:text-[clamp(80px,13vw,190px)] [&>h1]:leading-[.83] [&>h1]:font-normal [&>h1]:tracking-[-.055em] [&_em]:pl-[12%] max-[800px]:pb-[65px] max-[540px]:pt-[30px] max-[540px]:[&>h1]:text-[24vw]" data-motion="archive-heading"><div class="text-sm font-[450] tracking-[.11em] uppercase leading-[1.7] mb-[65px] flex justify-between text-[#777e6e] max-[540px]:mb-[50px] max-[540px]:gap-[18px] max-[540px]:text-[13px]"><span>03 / The journal</span><span>{{ String(posts?.length || 0).padStart(2, '0') }} entries</span></div><h1>Thinking<br><em>out loud.</em></h1><div class="mt-[50px] flex items-end justify-end gap-[65px] [&>p]:text-base [&>p]:leading-[1.9] [&>p]:text-[#6d7564] max-[540px]:mt-[35px] max-[540px]:gap-[30px] max-[540px]:[&>p]:text-sm"><span class="font-serif text-[70px] leading-none max-[540px]:text-[55px]" aria-hidden="true">↙</span><p>Notes on code, tools, and everything in between.<br>An ongoing record of figuring things out.</p></div></header>
    <JournalIndex :posts="posts || []" />
    <div class="mt-[70px] flex flex-wrap justify-between gap-[30px] border-t border-rule pt-[25px] text-[#6d7564] [&>a]:text-ink max-[540px]:mt-10 max-[540px]:text-xs text-sm font-[450] tracking-[.11em] uppercase leading-[1.7]"><span>Less noise. More perspective.</span><NuxtLink to="/projects">Explore the work ↗</NuxtLink></div>
  </div>
</template>
