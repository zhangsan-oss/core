# 使用指南

## 纯函数特性

所有函数均为纯函数，意味着：

- 不修改入参，传入的对象、数组不会被改动
- 不依赖外部状态，相同输入必然得到相同输出
- 不依赖 DOM / BOM / Node API，无副作用

因此可以放心在任意前端环境使用，也适合与 React、Vue 的状态管理配合，或在函数式编程中作为组合单元。

## 各环境可用性

| 环境 | 说明 |
| --- | --- |
| web | 可直接使用 |
| App | React Native、Flutter WebView 等可直接使用 |
| 小程序 | 微信、支付宝、Taro、uni-app 等可直接使用 |
| Node.js | 服务端同样适用 |

## 按需引入与 Tree-shaking

包声明了 `sideEffects: false`，打包器可以安全地进行 Tree-shaking，只把用到的函数打进产物：

```ts
import { isEmail } from '@core/utils'  // 只打包 isEmail 及其依赖
```

## 与 react-repo 本地联调

在同级目录的 react-repo 项目中安装本地包并启动开发服务器，可实时验证工具库效果：

```bash
pnpm build       # 先构建 @core/utils
cd ../react-repo
pnpm install     # 安装依赖，链接本地 @core/utils
pnpm dev         # 启动联调页面 http://localhost:5173
```

注意：`@core/utils` 的源码改动后，需重新执行 `pnpm build` 才能在 react-repo 中生效。

## 新增工具函数

1. 在对应模块目录新建文件或添加到现有文件
2. 在 `src/index.ts` 中导出
3. 在 `test/index.test.ts` 中补充测试用例
4. 运行 `pnpm test` 验证
