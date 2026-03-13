import type { Poem } from '../types'

const FAVORITES_KEY = 'poetryApp_favorites'
const DAILY_KEY = 'poetryApp_poemOfTheDay'
const DAILY_DATE_KEY = 'poetryApp_poemOfTheDay_date'

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

export function getFavorites(): Poem[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY)
    return raw ? (JSON.parse(raw) as Poem[]) : []
  } catch {
    return []
  }
}

export function saveFavorite(poem: Poem): void {
  try {
    const favorites = getFavorites()
    if (!isFavorite(poem)) {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites, poem]))
    }
  } catch {
    // ignore quota errors
  }
}

export function removeFavorite(poem: Poem): void {
  try {
    const key = `${poem.title}||${poem.author}`
    const updated = getFavorites().filter(
      (p) => `${p.title}||${p.author}` !== key
    )
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated))
  } catch {
    // ignore
  }
}

export function isFavorite(poem: Poem): boolean {
  const key = `${poem.title}||${poem.author}`
  return getFavorites().some((p) => `${p.title}||${p.author}` === key)
}

export function getCachedDailyPoem(): Poem | null {
  try {
    const date = localStorage.getItem(DAILY_DATE_KEY)
    const raw = localStorage.getItem(DAILY_KEY)
    if (date === today() && raw) {
      return JSON.parse(raw) as Poem
    }
    return null
  } catch {
    return null
  }
}

export function cacheDailyPoem(poem: Poem): void {
  try {
    localStorage.setItem(DAILY_KEY, JSON.stringify(poem))
    localStorage.setItem(DAILY_DATE_KEY, today())
  } catch {
    // ignore
  }
}
