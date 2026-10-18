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
    ring.classList.toggle('cursor-active', !!interactive)
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
    <div ref="dot" class="cursor-dot" aria-hidden="true"><span /></div>
    <div ref="follower" class="custom-cursor" aria-hidden="true"><span class="cursor-ring"><span>{{ label }}</span></span></div>
  </Teleport>
</template>
