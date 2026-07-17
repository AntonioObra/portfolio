export default defineAppConfig({
  ui: {
    colors: {
      primary: "emerald",
    },
    pageHero: {
      slots: {
        container: "py-18 sm:py-24 lg:py-32",
        title: "mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl",
        description:
          "mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted",
      },
    },
  },
  footer: {
    credits: `Built by Antonio Obradovic • © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [
      {
        icon: "i-simple-icons-x",
        to: "https://x.com/obradovicdotdev",
        target: "_blank",
        "aria-label": "X",
      },
      {
        icon: "i-simple-icons-github",
        to: "https://github.com/AntonioObra",
        target: "_blank",
        "aria-label": "GitHub",
      },
    ],
  },
});
