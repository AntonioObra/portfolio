<script setup lang="ts">
import { gsap } from 'gsap'

// Render the cover in the initial HTML, before hydration or WebGL startup.
// This component persists across route changes, but resets on every document load.
const visible = ref(true)
const overlay = ref<HTMLElement>()
let timeline: gsap.core.Timeline | undefined
let fallback: ReturnType<typeof setTimeout> | undefined
let disposed = false
const finish = () => {
  timeline?.kill()
  if (fallback) clearTimeout(fallback)
  visible.value = false
}
const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') finish() }
useHead({ noscript: [{ innerHTML: '<style>.site-intro{display:none!important}</style>' }] })
onMounted(async () => {
  fallback = setTimeout(finish, 5000)
  window.addEventListener('keydown', escape)
  await nextTick()
  await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())))
  if (disposed || !visible.value || !overlay.value) return
  const select = gsap.utils.selector(overlay.value)
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // CSS supplies these starting poses in the first server-rendered paint.
  // Animate forward only; do not reset already-visible elements during hydration.
  timeline = gsap.timeline({ onComplete: finish }).to(overlay.value, { opacity: 0, duration: .3, delay: .15 })
    return
  }
  // CSS supplies these starting poses in the first server-rendered paint.
  // Animate forward only; do not reset already-visible elements during hydration.
  timeline = gsap.timeline({ onComplete: finish })
    .to(select('.intro-letter'), { y: 0, yPercent: 0, rotate: 0, stagger: .1, duration: .9, ease: 'power4.out' }, .1)
    .to(select('.intro-caption'), { opacity: 1, y: 0, stagger: .15, duration: .55 }, .35)
    .to(select('.intro-rule span'), { scaleX: 1, duration: 1.2, ease: 'power2.inOut' }, .2)
    .to(select('.intro-word'), { yPercent: -25, opacity: 0, duration: .5, ease: 'power3.in' }, 1.5)
    .to(select('.intro-caption, .intro-rule, .intro-skip'), { opacity: 0, duration: .3 }, 1.55)
    .to(select('.intro-panel'), { yPercent: -100, duration: .95, stagger: .12, ease: 'power4.inOut' }, 1.65)
})
onBeforeUnmount(() => {
  disposed = true
  finish()
  window.removeEventListener('keydown', escape)
})
</script>

<template>
  <div v-if="visible" ref="overlay" class="site-intro" aria-label="Opening Antonio’s portfolio">
    <div class="intro-panel intro-panel-left" /><div class="intro-panel intro-panel-right" />
    <div class="intro-top intro-caption micro"><span>Antonio Obradović</span><span>Independent developer / Zagreb</span></div>
    <div class="intro-copy"><p class="intro-caption micro">Code. Form. Function.</p><div class="intro-word" aria-hidden="true"><span class="intro-letter">a</span><span class="intro-letter">o</span><span class="intro-letter intro-period">.</span></div><div class="intro-rule"><span /></div><p class="intro-caption micro" role="status">Opening the studio</p></div>
    <div class="intro-bottom intro-caption micro"><span>Selected portfolio / {{ new Date().getFullYear() }}</span><span>A study in building things.</span></div>
    <button class="intro-skip micro" @click="finish">Enter now ↗</button>
  </div>
</template>
