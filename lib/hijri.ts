/**
 * Hijri (Islamic) calendar utilities
 * Algorithmic conversion — no external API
 */

export interface HijriDate {
  day: number
  month: number
  year: number
  monthName: string
  dayName: string
}

const HIJRI_MONTHS = [
  'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
  'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', "Sha'ban",
  'Ramadan', 'Shawwal', "Dhul Qa'dah", 'Dhul Hijjah',
]

const ARABIC_MONTHS = [
  'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني',
  'جمادى الأولى', 'جمادى الثانية', 'رجب', 'شعبان',
  'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة',
]

/**
 * Convert Gregorian date to Hijri using the Tabular Islamic calendar algorithm
 */
export function gregorianToHijri(date: Date): HijriDate {
  const JD = gregorianToJulian(date.getFullYear(), date.getMonth() + 1, date.getDate())
  const { year, month, day } = julianToHijri(JD)

  return {
    day,
    month,
    year,
    monthName: HIJRI_MONTHS[month - 1] || '',
    dayName: date.toLocaleDateString('en-US', { weekday: 'long' }),
  }
}

function gregorianToJulian(year: number, month: number, day: number): number {
  if (month <= 2) { year -= 1; month += 12 }
  const A = Math.floor(year / 100)
  const B = 2 - A + Math.floor(A / 4)
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524
}

function julianToHijri(JD: number): { year: number; month: number; day: number } {
  const l = JD - 1948440 + 10632
  const n = Math.floor((l - 1) / 10631)
  const ll = l - 10631 * n + 354
  const j = Math.floor((10985 - ll) / 5316) * Math.floor((50 * ll) / 17719) +
             Math.floor(ll / 5670) * Math.floor((43 * ll) / 15238)
  const lll = ll - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
               Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29
  const month = Math.floor((24 * lll) / 709)
  const day = lll - Math.floor((709 * month) / 24)
  const year = 30 * n + j - 30

  return { year, month: month === 0 ? 12 : month, day }
}

export function getHijriMonthName(month: number, arabic = false): string {
  return arabic ? ARABIC_MONTHS[month - 1] : HIJRI_MONTHS[month - 1]
}

export function getTodayHijri(): HijriDate {
  return gregorianToHijri(new Date())
}

/**
 * Estimate days until next Ramadan (Hijri month 9)
 */
export function getDaysUntilRamadan(): number {
  const today = getTodayHijri()
  if (today.month === 9) return 0
  const monthsUntil = today.month < 9 ? 9 - today.month : 12 - today.month + 9
  return Math.round(monthsUntil * 29.5) - today.day
}

export function getDaysUntilEidAlFitr(): number {
  const today = getTodayHijri()
  if (today.month === 10 && today.day === 1) return 0
  const hijriDayOfYear = (today.month - 1) * 29.5 + today.day
  const eidDayOfYear = 9.5 * 29.5 + 1 // month 10, day 1
  let diff = eidDayOfYear - hijriDayOfYear
  if (diff < 0) diff += 354
  return Math.round(diff)
}

export function isRamadan(): boolean {
  return getTodayHijri().month === 9
}