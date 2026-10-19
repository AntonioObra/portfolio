<template>
  <div>
    <a class="fixed -top-[100px] z-[10001] bg-paper p-[15px] focus:top-0" href="#main-content">Skip to content</a>
    <AppHeader />
    <ClientOnly><CustomCursor /></ClientOnly>
    <main id="main-content" :class="$route.path !== '/' ? 'mx-auto min-h-[70vh] max-w-[1440px] px-[7%] pb-20 max-[540px]:px-[6%]' : ''"><slot /></main>
    <AppFooter />
  </div>
</template>
