<script setup lang="ts">
type Post = { title: string; description?: string; date: string; path: string };
const props = defineProps<{ posts: Post[] }>();
const years = computed(() => {
  const groups = new Map<number, Post[]>();
  for (const post of props.posts) {
    const year = new Date(post.date).getUTCFullYear();
    if (!Number.isFinite(year)) continue;
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year)!.push(post);
  }
  return [...groups]
    .sort(([a], [b]) => b - a)
    .map(([year, posts]) => ({
      year,
      posts: posts.sort((a, b) => +new Date(b.date) - +new Date(a.date)),
    }));
});
const date = (value: string) =>
  new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    timeZone: "UTC",
  });
</script>

<template>
  <div>
    <section
      v-for="group in years"
      :key="group.year"
      class="mb-[60px] grid grid-cols-[170px_1fr] gap-[50px] max-[800px]:grid-cols-[110px_1fr] max-[800px]:gap-[30px] max-[540px]:mb-[45px] max-[540px]:grid-cols-1 max-[540px]:gap-5"
      :aria-label="`Writing from ${group.year}`"
    >
      <div
        class="sticky top-[35px] self-start border-t border-ink pt-[22px] [&>h3]:mb-3.5 [&>h3]:font-serif [&>h3]:text-[64px] [&>h3]:leading-none [&>h3]:tracking-[-.055em] [&>span]:text-[13px] [&>span]:text-[#7b806f] max-[800px]:[&>h3]:text-[50px] max-[540px]:static max-[540px]:flex max-[540px]:items-baseline max-[540px]:justify-between max-[540px]:pt-[18px] max-[540px]:[&>h3]:mb-0 max-[540px]:[&>h3]:text-5xl"
      >
        <h3>{{ group.year }}</h3>
        <span
          class="text-sm font-[450] tracking-[.11em] uppercase leading-[1.7]"
          >{{ String(group.posts.length).padStart(2, "0") }} entries</span
        >
      </div>
      <div>
        <NuxtLink
          v-for="post in group.posts"
          :key="post.path"
          :to="post.path"
          class="group/entry relative grid grid-cols-[80px_minmax(0,1fr)_25px] items-baseline gap-5 border-t border-rule py-[30px] [&>time]:text-[13px] [&>time]:text-[#7b7e72] [&_h4]:mb-3 [&_h4]:font-serif [&_h4]:text-[34px] [&_h4]:leading-[1.12] [&_h4]:tracking-[-.025em] [&_h4]:transition-transform [&_h4]:duration-400 hover:[&_h4]:translate-x-2 [&_p]:max-w-[560px] [&_p]:text-base [&_p]:leading-[1.8] [&_p]:text-[#747b6a] max-[800px]:grid-cols-[75px_minmax(0,1fr)_20px] max-[800px]:gap-[15px] max-[800px]:[&_h4]:text-[29px] max-[540px]:grid-cols-[65px_minmax(0,1fr)_18px] max-[540px]:gap-3 max-[540px]:py-6 max-[540px]:[&_h4]:text-[28px] max-[540px]:[&_p]:text-sm max-[540px]:[&>time]:text-xs"
          data-editorial
          data-cursor="Read"
          ><time
            class="text-sm font-[450] tracking-[.11em] uppercase leading-[1.7]"
            :datetime="new Date(post.date).toISOString().slice(0, 10)"
            >{{ date(post.date) }}</time
          >
          <div>
            <h4>{{ post.title }}</h4>
            <p>{{ post.description }}</p>
          </div>
          <span
            class="text-[25px] transition-transform group-hover/entry:translate-x-[3px] group-hover/entry:-translate-y-[3px]"
            aria-hidden="true"
            >↗</span
          ></NuxtLink
        >
      </div>
    </section>
  </div>
</template>
