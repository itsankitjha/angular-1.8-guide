import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "AngularJS 1.8 in Production",
  description: "A Practical Guide for Legacy Systems",
  base: '/angular-1.8-guide/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/introduction' }
    ],

    sidebar: [
      {
        text: 'The Guide',
        items: [
          { text: '1. Introduction', link: '/guide/introduction' },
          { text: '2. Scopes & Controllers', link: '/guide/controllers' },
          { text: '3. Directives: The Secret Sauce', link: '/guide/directives' },
          { text: '4. Services & Factories', link: '/guide/services' },
          { text: '5. Dependency Injection', link: '/guide/dependency-injection' },
          { text: '6. Routing', link: '/guide/routing' },
          { text: '7. Filters & Expressions', link: '/guide/filters' },
          { text: '8. Talking to APIs ($http)', link: '/guide/http' },
          { text: '9. Structuring a Real App', link: '/guide/structuring' },
        ]
      },
      {
        text: 'Advanced Topics',
        items: [
          { text: 'Performance & Optimization', link: '/guide/performance' },
          { text: 'Debugging Common Issues', link: '/guide/debugging' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/itsankitjha/angular-1.8-guide' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026-present'
    }
  }
})
