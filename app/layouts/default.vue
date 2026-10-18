<template>
  <div class="site-shell">
    <a class="skip-link" href="#main-content">Skip to content</a>
    <AppHeader />
    <ClientOnly><CustomCursor /></ClientOnly>
    <main id="main-content" :class="{ 'inner-page': $route.path !== '/' }"><slot /></main>
    <AppFooter />
  </div>
</template>
