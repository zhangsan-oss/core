/**
 * @core/utils 纯函数工具库入口
 *
 * 使用方式：
 *   import { debounce } from '@core/utils'
 *   import { isString, chunk, deepClone } from '@core/utils'
 *
 * 所有函数均为纯函数：不修改入参、不依赖外部状态、
 * 不依赖 DOM / BOM / Node API，可在 web、App、小程序中直接使用。
 */

export * from './type'
export * from './string'
export * from './array'
export * from './object'
export * from './number'
export * from './date'
export * from './function'
