import { defineConfig } from 'vitepress'
import { nav } from './nav.mts'
import { sidebar } from './sidebar.mts'

export default defineConfig({
  title: 'core-utils',
  description: '前端纯函数工具库，零依赖、跨端通用',
  lang: 'zh-CN',
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
  ],

  themeConfig: {
    logo: '/favicon.svg',
    nav,
    sidebar,

    footer: {
      message: 'MIT License',
      copyright: 'Copyright © core-utils',
    },

    search: {
      provider: 'local',
    },
  },
})
