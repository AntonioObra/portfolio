<script setup lang="ts">
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { gsap } from "gsap";
import { createSpiderLily } from "~/utils/spiderLily";

const host = ref<HTMLDivElement>();
const ready = ref(false);
const failed = ref(false);
const paused = ref(false);
let cleanup = () => {};
let disposed = false;
onMounted(async () => {
  // Let hydration and the first layout finish before creating the WebGL surface.
  await nextTick();
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  if (disposed || !host.value) return;
  const el = host.value;
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
  } catch {
    failed.value = true;
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  el.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(24, 1, 0.1, 50);
  camera.position.set(0, 1.4, 5.5);
  // Frame the bloom rather than the full stem, with room for its turning stamens.
  camera.lookAt(0, 0.65, 0);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.025);
  scene.environment = environment.texture;
  const lily = createSpiderLily();
  lily.group.rotation.set(0.14, -0.35, -0.18);
  scene.add(lily.group);
  const key = new THREE.DirectionalLight(0xffffff, 4);
  key.position.set(-3, 4, 4);
  const rim = new THREE.DirectionalLight(0xe4e8de, 3);
  rim.position.set(3, 1, -2);
  scene.add(key, rim);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  paused.value = reduced.matches;
  const bloom = { value: reduced.matches ? 1 : 0.65 };
  lily.setBloom(bloom.value);
  const opening = reduced.matches
    ? undefined
    : gsap.to(bloom, {
        value: 1,
        delay: 0.4,
        duration: 3.6,
        ease: "power2.inOut",
      });
  let inView = true;
  let frame = 0;
  let lastTime = 0;
  let elapsed = 0;
  let lastBloom = bloom.value;
  const pointer = new THREE.Vector2();
  const hero = el.closest("[data-motion=void-hero]") as HTMLElement | null;
  const move = (event: PointerEvent) => {
    if (!hero || event.pointerType !== "mouse") return;
    const rect = hero.getBoundingClientRect();
    pointer.set(
      (event.clientX - rect.left) / rect.width - 0.5,
      (event.clientY - rect.top) / rect.height - 0.5,
    );
  };
  hero?.addEventListener("pointermove", move);
  const resize = () => {
    const { width, height } = el.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  };
  const restore = () => {
    if (!disposed) resize();
  };
  const contextLost = (event: Event) => {
    event.preventDefault();
    ready.value = false;
  };
  const contextRestored = () => {
    if (!disposed) {
      resize();
      ready.value = true;
    }
  };
  renderer.domElement.addEventListener("webglcontextlost", contextLost);
  renderer.domElement.addEventListener("webglcontextrestored", contextRestored);
  window.addEventListener("pageshow", restore);
  document.fonts?.ready.then(restore);
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(el);
  const sync = () => {
    if (!inView || document.hidden || paused.value || reduced.matches)
      opening?.pause();
    else opening?.resume();
  };
  const intersection = new IntersectionObserver(([entry]) => {
    inView = !!entry?.isIntersecting;
    sync();
  });
  intersection.observe(el);
  document.addEventListener("visibilitychange", sync);
  const changeMotion = () => {
    paused.value = reduced.matches;
    if (reduced.matches) {
      opening?.progress(1);
      lily.setBloom(1);
      renderer.render(scene, camera);
    }
    sync();
  };
  reduced.addEventListener("change", changeMotion);
  const stopWatch = watch(paused, sync);
  const animate = (time: number) => {
    frame = requestAnimationFrame(animate);
    const delta = Math.min((time - lastTime) / 1000, 0.05);
    lastTime = time;
    if (!inView || document.hidden || paused.value || reduced.matches) return;
    elapsed += delta;
    lily.group.rotation.y = -0.35 + elapsed * 0.095;
    lily.group.rotation.z = -0.18 + Math.sin(elapsed * 0.35) * 0.035;
    lily.group.rotation.x +=
      (0.14 + pointer.y * 0.08 - lily.group.rotation.x) * 0.025;
    lily.group.position.x += (pointer.x * 0.08 - lily.group.position.x) * 0.025;
    lily.group.position.y = Math.sin(elapsed * 0.6) * 0.025;
    if (Math.abs(bloom.value - lastBloom) > 0.001) {
      lily.setBloom(bloom.value);
      lastBloom = bloom.value;
    }
    renderer.render(scene, camera);
  };
  // ResizeObserver retries if the initial hydration layout has zero dimensions.
  resize();
  ready.value = true;
  frame = requestAnimationFrame(animate);
  cleanup = () => {
    cancelAnimationFrame(frame);
    opening?.kill();
    stopWatch();
    resizeObserver.disconnect();
    intersection.disconnect();
    document.removeEventListener("visibilitychange", sync);
    reduced.removeEventListener("change", changeMotion);
    hero?.removeEventListener("pointermove", move);
    lily.dispose();
    environment.dispose();
    room.dispose();
    pmrem.dispose();
    window.removeEventListener("pageshow", restore);
    renderer.domElement.removeEventListener("webglcontextlost", contextLost);
    renderer.domElement.removeEventListener(
      "webglcontextrestored",
      contextRestored,
    );
    renderer.dispose();
    renderer.domElement.remove();
  };
});
onBeforeUnmount(() => {
  disposed = true;
  cleanup();
});
</script>

<template>
  <div class="pointer-events-none absolute inset-0 z-0 h-full w-full">
    <div
      ref="host"
      :class="ready ? 'opacity-100' : 'opacity-0'"
      class="absolute inset-y-0 left-[25%] -right-[8%] transition-opacity duration-[800ms] [&>canvas]:block [&>canvas]:h-full [&>canvas]:w-full max-[800px]:left-[15%] max-[800px]:-right-[20%] max-[540px]:-top-[12%] max-[540px]:bottom-[22%] max-[540px]:-left-[15%] max-[540px]:-right-[35%]"
      data-motion="lily-scene"
      role="img"
      aria-label="A vivid red spider lily with curling petals and long red stamens, slowly turning in the hero"
    />
    <div
      v-if="failed"
      class="absolute top-[45%] right-[5%] left-1/2 text-center text-[#939a90] text-sm font-[450] tracking-[.11em] uppercase leading-[1.7]"
      role="status"
    >
      The botanical study requires WebGL.
    </div>
  </div>
</template>
