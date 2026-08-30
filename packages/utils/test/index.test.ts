import { describe, it, expect } from 'vitest'
import {
  isString,
  isNumber,
  isNil,
  isEmpty,
  isPhone,
  isEmail,
  isUrl,
} from '../src/type'
import { capitalize, kebabCase, camelCase, truncate, format } from '../src/string'
import { chunk, unique, groupBy, flatten, intersection, difference, sum } from '../src/array'
import { pick, omit, deepClone, deepMerge, shallowEqual } from '../src/object'
import { clamp, randomInt, toThousands, round, toPercent } from '../src/number'
import { formatDate, isLeapYear, getDaysInMonth, addDays, diffDays } from '../src/date'
import { debounce, throttle, once, memoize } from '../src/function'

describe('type 类型判断', () => {
  it('isString / isNumber', () => {
    expect(isString('a')).toBe(true)
    expect(isString(1)).toBe(false)
    expect(isNumber(1)).toBe(true)
    expect(isNumber(NaN)).toBe(false)
    expect(isNumber('1')).toBe(false)
  })

  it('isNil / isEmpty', () => {
    expect(isNil(null)).toBe(true)
    expect(isNil(undefined)).toBe(true)
    expect(isNil(0)).toBe(false)
    expect(isEmpty('')).toBe(true)
    expect(isEmpty([])).toBe(true)
    expect(isEmpty({})).toBe(true)
    expect(isEmpty({ a: 1 })).toBe(false)
  })

  it('isPhone / isEmail / isUrl', () => {
    expect(isPhone('13800138000')).toBe(true)
    expect(isPhone('123456')).toBe(false)
    expect(isEmail('a@b.com')).toBe(true)
    expect(isEmail('not-email')).toBe(false)
    expect(isUrl('https://example.com')).toBe(true)
    expect(isUrl('example.com')).toBe(false)
  })
})

describe('string 字符串工具', () => {
  it('capitalize', () => {
    expect(capitalize('hello')).toBe('Hello')
    expect(capitalize('')).toBe('')
  })

  it('kebabCase / camelCase', () => {
    expect(kebabCase('getUserById')).toBe('get-user-by-id')
    expect(camelCase('get-user-by-id')).toBe('getUserById')
    expect(camelCase('get_user_by_id')).toBe('getUserById')
  })

  it('truncate / format', () => {
    expect(truncate('abcdefghij', 5)).toBe('ab...')
    expect(truncate('ab', 5)).toBe('ab')
    expect(format('hello {name}, age {age}', { name: 'tom', age: 18 })).toBe(
      'hello tom, age 18'
    )
  })
})

describe('array 数组工具', () => {
  it('chunk', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
    expect(chunk([1], 0)).toEqual([])
  })

  it('unique / intersection / difference', () => {
    expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3])
    expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3])
    expect(difference([1, 2, 3], [2, 3, 4])).toEqual([1])
  })

  it('groupBy / flatten / sum', () => {
    expect(groupBy([{ t: 'a' }, { t: 'b' }, { t: 'a' }], 't')).toEqual({
      a: [{ t: 'a' }, { t: 'a' }],
      b: [{ t: 'b' }],
    })
    expect(flatten([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4])
    expect(sum([1, 2, 3])).toBe(6)
  })
})

describe('object 对象工具', () => {
  it('pick / omit', () => {
    const obj = { a: 1, b: 2, c: 3 }
    expect(pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 })
    expect(omit(obj, ['b'])).toEqual({ a: 1, c: 3 })
  })

  it('deepClone 深拷贝且互不影响', () => {
    const obj = { a: 1, nested: { b: [1, 2], date: new Date() } }
    const clone = deepClone(obj)
    expect(clone).toEqual(obj)
    expect(clone).not.toBe(obj)
    expect(clone.nested).not.toBe(obj.nested)
    clone.nested.b.push(3)
    expect(obj.nested.b).toEqual([1, 2])
  })

  it('deepMerge', () => {
    expect(deepMerge({ a: 1, b: { x: 1 } }, { b: { y: 2 }, c: 3 })).toEqual({
      a: 1,
      b: { x: 1, y: 2 },
      c: 3,
    })
  })

  it('shallowEqual', () => {
    expect(shallowEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true)
    expect(shallowEqual({ a: 1 }, { a: 2 })).toBe(false)
  })
})

describe('number 数字工具', () => {
  it('clamp / round / toPercent', () => {
    expect(clamp(15, 0, 10)).toBe(10)
    expect(clamp(-1, 0, 10)).toBe(0)
    expect(round(3.14159, 2)).toBe(3.14)
    expect(toPercent(0.1234)).toBe('12.34%')
  })

  it('randomInt 在闭区间内', () => {
    for (let i = 0; i < 100; i++) {
      const value = randomInt(1, 5)
      expect(value).toBeGreaterThanOrEqual(1)
      expect(value).toBeLessThanOrEqual(5)
    }
  })

  it('toThousands', () => {
    expect(toThousands(1234567.89)).toBe('1,234,567.89')
    expect(toThousands(123)).toBe('123')
  })
})

describe('date 日期工具', () => {
  it('formatDate', () => {
    const date = new Date(2026, 7, 30, 9, 5, 3)
    expect(formatDate(date, 'YYYY-MM-DD HH:mm:ss')).toBe('2026-08-30 09:05:03')
    expect(formatDate(date, 'YYYY/MM/DD')).toBe('2026/08/30')
  })

  it('isLeapYear / getDaysInMonth', () => {
    expect(isLeapYear(2024)).toBe(true)
    expect(isLeapYear(2026)).toBe(false)
    expect(getDaysInMonth(2026, 2)).toBe(28)
    expect(getDaysInMonth(2024, 2)).toBe(29)
  })

  it('addDays / diffDays', () => {
    const date = new Date(2026, 7, 30)
    expect(addDays(date, 2).getDate()).toBe(1)
    expect(diffDays(new Date(2026, 7, 28), new Date(2026, 7, 30))).toBe(2)
  })
})

describe('function 函数工具', () => {
  it('debounce 只执行最后一次', async () => {
    let count = 0
    const fn = debounce(() => {
      count++
    }, 50)
    fn()
    fn()
    fn()
    expect(count).toBe(0)
    await new Promise((resolve) => setTimeout(resolve, 100))
    expect(count).toBe(1)
  })

  it('throttle 限流执行', async () => {
    let count = 0
    const fn = throttle(() => {
      count++
    }, 50)
    fn()
    fn()
    fn()
    expect(count).toBe(1)
    await new Promise((resolve) => setTimeout(resolve, 60))
    fn()
    expect(count).toBe(2)
  })

  it('once 只执行一次', () => {
    let count = 0
    const fn = once(() => {
      count++
      return count
    })
    fn()
    fn()
    fn()
    expect(count).toBe(1)
  })

  it('memoize 相同参数走缓存', () => {
    let computeCount = 0
    const fn = memoize((a: number, b: number) => {
      computeCount++
      return a + b
    })
    expect(fn(1, 2)).toBe(3)
    expect(fn(1, 2)).toBe(3)
    expect(computeCount).toBe(1)
  })
})
