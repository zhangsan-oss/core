import { defineConfig } from 'vitepress'
import { nav } from './nav.mts'
import { sidebar } from './sidebar.mts'

// GitLab Pages 部署在子路径（https://用户名.gitlab.io/项目名/），本地开发无该变量时 base 为根路径
const siteBase = process.env.CI_PAGES_URL
  ? new URL(process.env.CI_PAGES_URL).pathname.replace(/\/$/, '')
  : ''
const base = siteBase || '/'

export default defineConfig({
  title: 'core-utils',
  description: '前端纯函数工具库，零依赖、跨端通用',
  lang: 'zh-CN',
  lastUpdated: true,
  base,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${siteBase}/favicon.svg` }],
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
