# 快速开始

## 安装

```bash
pnpm add @core/utils
# 或
npm install @core/utils
```

## 引入使用

```ts
import { isPhone, chunk, deepClone } from '@core/utils'

isPhone('13800138000')      // true
chunk([1, 2, 3, 4, 5], 2)   // [[1, 2], [3, 4], [5]]
deepClone({ a: { b: 1 } })  // 深拷贝新对象
```

## 类型守卫

类型判断类函数均返回类型谓词，通过判断后 TypeScript 会自动收窄类型：

```ts
import { isString } from '@core/utils'

function log(value: unknown) {
  if (isString(value)) {
    // 此处 value 已被收窄为 string，可直接调用字符串方法
    console.log(value.toUpperCase())
  }
}
```

## 本地开发

在 Monorepo 中开发调试：

```bash
pnpm install   # 安装依赖
pnpm build     # 构建工具库，输出 ESM / CJS / UMD 三种格式
pnpm test      # 运行单元测试
```
