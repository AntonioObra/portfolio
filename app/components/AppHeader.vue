<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
defineProps<{ links?: NavigationMenuItem[] }>();
const route = useRoute();
</script>

<template>
  <header class="site-header" :class="{ 'header-dark': route.path === '/' }">
    <NuxtLink to="/" class="wordmark" aria-label="Antonio Obradović — home"
      >ao<span>®</span></NuxtLink
    >

    <nav aria-label="Main navigation">
      <NuxtLink to="/projects" class="text-lg">Work</NuxtLink
      ><NuxtLink to="/blog" class="text-lg">Journal</NuxtLink>
    </nav>

    <a class="header-contact" href="mailto:antonio@obradovic.dev"
      >Let’s talk <span>↗</span></a
    >
  </header>
</template>
