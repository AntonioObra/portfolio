<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
defineProps<{ links?: NavigationMenuItem[] }>()
const route = useRoute()
</script>

<template>
  <header class="flex h-24 items-center justify-between border-b px-[5%] max-[800px]:h-[78px] max-[540px]:px-[6%]" :class="route.path === '/' ? 'border-white/15 bg-[#080909] text-paper' : 'border-rule'">
    <NuxtLink to="/" class="font-[family-name:Georgia,serif] text-4xl leading-none tracking-[-4px] [&>span]:mt-0.5 [&>span]:ml-[7px] [&>span]:inline-block [&>span]:align-top [&>span]:font-sans [&>span]:text-[9px] [&>span]:tracking-normal" aria-label="Antonio Obradović — home">ao<span>®</span></NuxtLink>
    <nav aria-label="Main navigation" class="flex gap-[38px] font-serif text-[28px] leading-none max-[800px]:gap-[23px] max-[540px]:gap-[18px] max-[540px]:text-2xl [&>a]:relative [&>a]:py-2.5 [&>a]:after:absolute [&>a]:after:inset-x-0 [&>a]:after:bottom-0 [&>a]:after:h-px [&>a]:after:origin-left [&>a]:after:scale-x-0 [&>a]:after:bg-current [&>a]:after:transition-transform [&>a]:after:duration-350 [&>a:hover]:after:scale-x-100 [&>.router-link-exact-active]:after:scale-x-100"><NuxtLink to="/projects">Work</NuxtLink><NuxtLink to="/blog">Journal</NuxtLink></nav>
    <a data-motion="header-contact" class="relative py-2.5 font-serif text-2xl max-[540px]:text-[0px] [&>span]:ml-5 [&>span]:text-xl max-[540px]:[&>span]:ml-0" href="mailto:antonio@obradovic.dev">Let’s talk <span>↗</span></a>
  </header>
</template>
