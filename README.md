# core-utils

前端纯函数工具库，零依赖、跨端通用，基于 pnpm Monorepo + Vite + TypeScript 构建，可发布到 npm 供 web、App、小程序等任意前端项目使用。

## 目录结构

```
.
├── packages/
│   └── utils/            # 工具库子包，发布到 npm 的就是它
│       ├── src/
│       │   ├── index.ts  # 总入口，汇总导出
│       │   ├── type/     # 类型判断
│       │   ├── string/   # 字符串处理
│       │   ├── array/    # 数组工具
│       │   ├── object/   # 对象工具
│       │   ├── number/   # 数字处理
│       │   ├── date/     # 日期时间
│       │   └── function/ # 防抖、节流、记忆化
│       └── test/         # Vitest 单元测试
├── pnpm-workspace.yaml   # Monorepo 工作区声明
└── tsconfig.base.json    # 共享 TS 配置
```

工具库的实际使用方，如同级目录下的 react-repo 项目，通过本地依赖方式安装使用，模拟真实安装后的效果。

## 使用方式

安装后按需引入：

```ts
import { isPhone, chunk, deepClone } from '@core/utils'

isPhone('13800138000')          // true
chunk([1, 2, 3, 4, 5], 2)       // [[1, 2], [3, 4], [5]]
deepClone({ a: { b: 1 } })      // 深拷贝
```

所有函数均为纯函数：不修改入参、不依赖 DOM / BOM / Node API、无运行时依赖，因此：

- web 项目可直接使用
- App 项目，如 React Native、Flutter WebView 可直接使用
- 小程序，如微信、支付宝、Taro、uni-app 可直接使用
- Node.js 服务端也可使用

## 本地开发

```bash
pnpm install        # 安装依赖
pnpm build          # 构建工具库，输出 ESM / CJS / UMD 三种格式
pnpm test           # 运行单元测试
```

本地联调：在 react-repo 中安装本地包并启动开发服务器，可实时验证工具库效果：

```bash
pnpm build                                  # 先构建 @core/utils
cd ../react-repo
pnpm install                                # 安装依赖，链接本地 @core/utils
pnpm dev                                    # 启动联调页面 http://localhost:5173
```

注意：`@core/utils` 的源码改动后，需重新执行 `pnpm build` 才能在 react-repo 中生效。

## 发布到 npm

### 第一步：改包名

发布前将 [packages/utils/package.json](packages/utils/package.json) 中的 `name` 改为你的包名：

- 普通包名，如 `my-utils`
- 或 scoped 包名，如 `@your-scope/utils`，需要先确认 scope 在 npm 上未被占用

包名在 npm 上全局唯一，可先用 `npm view <包名>` 检查是否已被占用。

### 第二步：登录 npm

```bash
npm login
```

按提示输入用户名、密码和邮箱。未注册的先到 https://www.npmjs.com 注册。

### 第三步：发布

```bash
pnpm publish:utils   # 发布 @core/utils（prepublishOnly 会自动先构建）
pnpm release         # 或一键发布：构建 + 发布
```

发布成功后，任何人即可安装使用：

```bash
npm install @core/utils
```

### 版本更新

从根目录执行版本脚本，只修改版本号，不自动提交 git：

```bash
pnpm version:patch   # 补丁版本 0.0.1 -> 0.0.2
pnpm version:minor   # 次版本 0.0.1 -> 0.1.0
pnpm version:major   # 主版本 0.0.1 -> 1.0.0
```

修改版本号后执行 `pnpm release` 即可发布新版本。

### 包内容说明

package.json 关键字段：

| 字段 | 作用 |
| --- | --- |
| `exports` | 现代导入入口，区分 ESM 和 CJS，条件按顺序匹配 |
| `main` / `module` | 兼容不支持 exports 字段的旧工具链 |
| `types` | TypeScript 类型声明入口 |
| `files` | 发布到 npm 的文件白名单，只发 dist 目录 |
| `sideEffects: false` | 告诉打包器可以安全 tree-shaking，未用到的函数不会打进产物 |
| `publishConfig.access: public` | scoped 包需要显式声明公开 |

### 常见问题

- 版本号重复：每个版本号只能发布一次，删除后也不能复用，需要升版本号
- 包名被占用：换一个名字，或加 scope
- 发布私有包：去掉 `publishConfig.access: public`，默认发布为私有包，需要 npm 付费账号

## 新增工具函数

1. 在对应模块目录新建文件或添加到现有文件
2. 在 [src/index.ts](packages/utils/src/index.ts) 中导出
3. 在 [test/index.test.ts](packages/utils/test/index.test.ts) 中补充测试用例
4. 运行 `pnpm test` 验证

## 技术栈

- pnpm workspace：Monorepo 多包管理
- Vite 库模式：构建 ESM、CJS、UMD 三种格式产物
- TypeScript：严格模式 + 自动生成类型声明
- Vitest：单元测试
- vite-plugin-dts：打包时自动生成 .d.ts 声明文件
