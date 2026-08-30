/**
 * 日期时间工具
 * 全部基于 Date 实现，不依赖第三方库
 */

const DAY_MS = 24 * 60 * 60 * 1000

/** 格式化日期，如 formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss') */
export function formatDate(date: Date, template = 'YYYY-MM-DD HH:mm:ss'): string {
  const pad = (num: number) => String(num).padStart(2, '0')
  const map: Record<string, string> = {
    YYYY: String(date.getFullYear()),
    MM: pad(date.getMonth() + 1),
    DD: pad(date.getDate()),
    HH: pad(date.getHours()),
    mm: pad(date.getMinutes()),
    ss: pad(date.getSeconds()),
  }
  return template.replace(/YYYY|MM|DD|HH|mm|ss/g, (match) => map[match])
}

/** 是否为闰年 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

/** 获取某年某月的天数，month 从 1 开始 */
export function getDaysInMonth(year: number, month: number): number {
  // 利用 Date 的自动进位：下个月的第 0 天即本月最后一天
  return new Date(year, month, 0).getDate()
}

/** 日期加减天数，返回新 Date，不修改原对象 */
export function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * DAY_MS)
}

/** 计算两个日期相差的天数，按整天向下取整 */
export function diffDays(start: Date, end: Date): number {
  const startMs = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime()
  const endMs = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime()
  return Math.floor((endMs - startMs) / DAY_MS)
}

/** 相对时间描述，如刚刚、5 分钟前、3 天前 */
export function timeAgo(date: Date, now: Date = new Date()): string {
  const diff = now.getTime() - date.getTime()
  if (diff < 0) return '刚刚'
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  if (diff < minute) return '刚刚'
  if (diff < hour) return `${Math.floor(diff / minute)} 分钟前`
  if (diff < day) return `${Math.floor(diff / hour)} 小时前`
  if (diff < 30 * day) return `${Math.floor(diff / day)} 天前`
  if (diff < 365 * day) return `${Math.floor(diff / (30 * day))} 个月前`
  return `${Math.floor(diff / (365 * day))} 年前`
}

/** 获取某月的第一天和最后一天，返回数组 */
export function getMonthRange(year: number, month: number): [Date, Date] {
  return [new Date(year, month - 1, 1), new Date(year, month, 0)]
}
