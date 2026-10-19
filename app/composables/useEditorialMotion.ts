import type { Ref } from 'vue'

export function useEditorialMotion(root: Ref<HTMLElement | undefined>) {
  let disposed = false
  let cleanup = () => {}
  onMounted(async () => {
    const { gsap } = await import('gsap')
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    if (disposed || !root.value) return
    gsap.registerPlugin(ScrollTrigger)
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.from('[data-motion=archive-heading] h1', { y: 55, rotate: -2, duration: 1, ease: 'power3.out' })
        gsap.utils.toArray<HTMLElement>('[data-editorial]').forEach(row => {
          gsap.from(row, { y: 28, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: row, start: 'top 94%', once: true } })
        })
      }, root.value)
      return () => context.revert()
    })
    cleanup = () => media.revert()
  })
  onBeforeUnmount(() => { disposed = true; cleanup() })
}
