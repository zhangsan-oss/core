import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'

// 包以 ESM 模式运行，__dirname 不可用，用 import.meta.dirname 替代
const pkgDir = import.meta.dirname

// Vite 库模式：一次构建输出 ESM / CJS / UMD 三种格式
// ESM 供现代打包器按需 tree-shaking，CJS 供 CommonJS 项目，UMD 供浏览器 script 直接引入
export default defineConfig({
  plugins: [
    dts({
      tsconfigPath: './tsconfig.json',
      // 合并所有 .d.ts 为单个 index.d.ts，发布更干净
      rollupTypes: true,
      // 声明文件统一输出到 dist
      outDir: 'dist',
      include: ['src']
    }),
  ],
  build: {
    lib: {
      entry: resolve(pkgDir, 'src/index.ts'),
      name: 'CoreUtils',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format: string) => {
        if (format === 'es') return 'index.js'
        if (format === 'cjs') return 'index.cjs'
        return 'index.umd.js'
      },
    },
    sourcemap: true,
    minify: 'esbuild',
    rollupOptions: {
      // 纯函数工具库零外部依赖：无 peerDependencies、无 external，全部内联
      output: {
        // 保持导出名稳定，避免被压缩混淆后破坏按名导入
        exports: 'named',
      },
    },
  },
})
