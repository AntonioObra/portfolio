<script setup lang="ts">
const dot = ref<HTMLElement>()
const follower = ref<HTMLElement>()
const label = ref('')
let disposed = false
let cleanup = () => {}
onMounted(async () => {
  const media = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
  const { gsap } = await import('gsap')
  if (disposed || !dot.value || !follower.value) return
  const point = dot.value
  const ring = follower.value
  const setDotX = gsap.quickSetter(point, 'x', 'px')
  const setDotY = gsap.quickSetter(point, 'y', 'px')
  const setRingX = gsap.quickSetter(ring, 'x', 'px')
  const setRingY = gsap.quickSetter(ring, 'y', 'px')
  let visible = false
  let targetX = 0
  let targetY = 0
  let ringX = 0
  let ringY = 0
  const hide = () => {
    visible = false
    document.documentElement.classList.remove('cursor-enabled')
    gsap.set([point, ring], { opacity: 0 })
  }
  const move = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse' || !media.matches) { hide(); return }
    const target = event.target instanceof Element ? event.target : null
    // Preserve native text insertion and selection cursors in editable fields.
    if (target?.closest('input, textarea, select, [contenteditable="true"], iframe')) { hide(); return }
    targetX = event.clientX; targetY = event.clientY
    setDotX(targetX); setDotY(targetY)
    if (!visible) {
      ringX = targetX; ringY = targetY
      setRingX(ringX); setRingY(ringY)
      gsap.set([point, ring], { opacity: 1 })
      document.documentElement.classList.add('cursor-enabled')
      visible = true
    }
    const interactive = target?.closest('a, button, [data-cursor]')
    label.value = interactive?.getAttribute('data-cursor') || (interactive?.matches('a') ? '↗' : '')
    ring.toggleAttribute('data-active', !!interactive)
  }
  const tick = (_time: number, delta: number) => {
    if (!visible) return
    const ease = 1 - Math.exp(-delta / 65)
    ringX += (targetX - ringX) * ease
    ringY += (targetY - ringY) * ease
    setRingX(ringX); setRingY(ringY)
  }
  const focus = (event: KeyboardEvent) => { if (event.key === 'Tab') hide() }
  const press = () => { if (visible) gsap.to(ring, { scale: .8, duration: .12 }) }
  const release = () => { gsap.to(ring, { scale: 1, duration: .2 }) }
  window.addEventListener('pointermove', move)
  window.addEventListener('pointerdown', press)
  window.addEventListener('pointerup', release)
  window.addEventListener('keydown', focus)
  document.documentElement.addEventListener('pointerleave', hide)
  window.addEventListener('blur', hide)
  media.addEventListener('change', hide)
  gsap.ticker.add(tick)
  cleanup = () => {
    hide()
    gsap.ticker.remove(tick)
    gsap.killTweensOf([point, ring])
    window.removeEventListener('pointermove', move)
    window.removeEventListener('pointerdown', press)
    window.removeEventListener('pointerup', release)
    window.removeEventListener('keydown', focus)
    document.documentElement.removeEventListener('pointerleave', hide)
    window.removeEventListener('blur', hide)
    media.removeEventListener('change', hide)
  }
})
onBeforeUnmount(() => { disposed = true; cleanup() })
</script>

<template>
  <Teleport to="body">
    <div ref="dot" class="pointer-events-none fixed top-0 left-0 z-[11000] hidden size-0 opacity-0 mix-blend-difference [@media(hover:hover)_and_(pointer:fine)_and_(prefers-reduced-motion:no-preference)]:block [&>span]:absolute [&>span]:size-[7px] [&>span]:-translate-x-1/2 [&>span]:-translate-y-1/2 [&>span]:rounded-full [&>span]:bg-white" aria-hidden="true"><span /></div>
    <div ref="follower" class="group/cursor pointer-events-none fixed top-0 left-0 z-[11000] hidden size-0 opacity-0 mix-blend-difference [@media(hover:hover)_and_(pointer:fine)_and_(prefers-reduced-motion:no-preference)]:block" aria-hidden="true"><span class="absolute flex size-[50px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 text-white transition-[width,height,background,border-color] duration-250 group-data-[active]/cursor:size-[94px] group-data-[active]/cursor:border-white group-data-[active]/cursor:bg-white group-data-[active]/cursor:text-black [&>span]:font-sans [&>span]:text-[13px] [&>span]:opacity-0 [&>span]:transition-opacity [&>span]:duration-150 group-data-[active]/cursor:[&>span]:opacity-100"><span>{{ label }}</span></span></div>
  </Teleport>
</template>
