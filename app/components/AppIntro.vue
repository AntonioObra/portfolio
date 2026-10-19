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
useHead({ noscript: [{ innerHTML: '<style>[data-intro]{display:none!important}</style>' }] })
onMounted(async () => {
  fallback = setTimeout(finish, 5000)
  window.addEventListener('keydown', escape)
  await nextTick()
  await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())))
  if (disposed || !visible.value || !overlay.value) return
  const select = gsap.utils.selector(overlay.value)
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    timeline = gsap.timeline({ onComplete: finish }).to(overlay.value, { opacity: 0, duration: .3, delay: .15 })
    return
  }
  // CSS supplies these starting poses in the first server-rendered paint.
  // Animate forward only; do not reset already-visible elements during hydration.
  timeline = gsap.timeline({ onComplete: finish })
    .to(select('[data-motion=intro-letter]'), { y: 0, yPercent: 0, rotate: 0, stagger: .1, duration: .9, ease: 'power4.out' }, .1)
    .to(select('[data-motion=intro-caption]'), { opacity: 1, y: 0, stagger: .15, duration: .55 }, .35)
    .to(select('[data-motion=intro-rule] span'), { scaleX: 1, duration: 1.2, ease: 'power2.inOut' }, .2)
    .to(select('[data-motion=intro-word]'), { yPercent: -25, opacity: 0, duration: .5, ease: 'power3.in' }, 1.5)
    .to(select('[data-motion=intro-caption], [data-motion=intro-rule], [data-motion=intro-skip]'), { opacity: 0, duration: .3 }, 1.55)
    .to(select('[data-motion=intro-panel]'), { yPercent: -100, duration: .95, stagger: .12, ease: 'power4.inOut' }, 1.65)
})
onBeforeUnmount(() => {
  disposed = true
  finish()
  window.removeEventListener('keydown', escape)
})
</script>

<template>
  <div v-if="visible" ref="overlay" class="fixed inset-0 z-[12000] overflow-hidden pointer-events-auto animate-intro-safety motion-reduce:animate-none" data-intro aria-label="Opening Antonio’s portfolio">
    <div class="absolute inset-y-0 w-[50.1%] bg-[#090c09] left-0" data-motion="intro-panel" /><div class="absolute inset-y-0 w-[50.1%] bg-[#090c09] right-0" data-motion="intro-panel" />
    <div class="absolute top-[38px] inset-x-[5%] z-10 flex flex-wrap justify-between text-[#9ca593] max-[540px]:inset-x-[6%] max-[540px]:text-xs max-[540px]:[&>span:last-child]:max-w-[110px] max-[540px]:[&>span:last-child]:text-right [transform:translateY(12px)] opacity-0 motion-reduce:transform-none motion-reduce:opacity-100 text-sm font-[450] tracking-[.11em] uppercase leading-[1.7]" data-motion="intro-caption"><span>Antonio Obradović</span><span>Independent developer / Zagreb</span></div>
    <div class="absolute inset-0 z-10 flex flex-col items-center justify-center text-paper [&>p]:text-[13px] [&>p]:text-[#a7af9c]"><p class="[transform:translateY(12px)] opacity-0 motion-reduce:transform-none motion-reduce:opacity-100 text-sm font-[450] tracking-[.11em] uppercase leading-[1.7]" data-motion="intro-caption">Code. Form. Function.</p><div class="my-5 flex overflow-hidden pr-[.05em] pb-[.05em] font-serif text-[clamp(180px,30vw,380px)] leading-none tracking-[-.08em] max-[540px]:text-[60vw]" data-motion="intro-word" aria-hidden="true"><span class="block [transform:translateY(115%)_rotate(8deg)] motion-reduce:transform-none" data-motion="intro-letter">a</span><span class="block [transform:translateY(115%)_rotate(8deg)] motion-reduce:transform-none" data-motion="intro-letter">o</span><span class="block [transform:translateY(115%)_rotate(8deg)] motion-reduce:transform-none text-[#9ca98b]" data-motion="intro-letter">.</span></div><div class="mb-[25px] h-px w-[min(260px,50vw)] bg-white/[.08] [&>span]:block [&>span]:h-full [&>span]:w-full [&>span]:origin-left [&>span]:[transform:scaleX(0)] [&>span]:bg-[#abb49c] motion-reduce:[&>span]:[transform:scaleX(1)]" data-motion="intro-rule"><span /></div><p class="[transform:translateY(12px)] opacity-0 motion-reduce:transform-none motion-reduce:opacity-100 text-sm font-[450] tracking-[.11em] uppercase leading-[1.7]" data-motion="intro-caption" role="status">Opening the studio</p></div>
    <div class="absolute bottom-[38px] inset-x-[5%] z-10 flex flex-wrap justify-between text-[#9ca593] max-[540px]:inset-x-[6%] max-[540px]:text-xs max-[540px]:[&>span:last-child]:hidden [transform:translateY(12px)] opacity-0 motion-reduce:transform-none motion-reduce:opacity-100 text-sm font-[450] tracking-[.11em] uppercase leading-[1.7]" data-motion="intro-caption"><span>Selected portfolio / {{ new Date().getFullYear() }}</span><span>A study in building things.</span></div>
    <button class="pointer-events-auto absolute right-[5%] bottom-20 z-20 min-h-11 text-[#a7af9c] max-[540px]:right-[6%] max-[540px]:bottom-[38px] text-sm font-[450] tracking-[.11em] uppercase leading-[1.7]" data-motion="intro-skip" @click="finish">Enter now ↗</button>
  </div>
</template>
