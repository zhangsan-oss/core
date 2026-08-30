import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Sidebar = {
  '/guide/': [
    {
      text: '指南',
      items: [
        { text: '快速开始', link: '/guide/getting-started' },
        { text: '使用指南', link: '/guide/usage' },
      ],
    },
  ],
  '/api/': [
    {
      text: 'API 参考',
      items: [
        { text: '类型判断 type', link: '/api/type' },
        { text: '字符串 string', link: '/api/string' },
        { text: '数组 array', link: '/api/array' },
        { text: '对象 object', link: '/api/object' },
        { text: '数字 number', link: '/api/number' },
        { text: '日期 date', link: '/api/date' },
        { text: '函数 function', link: '/api/function' },
      ],
    },
  ],
}
