import type { Poem } from '../types'

const BASE_URL = 'https://poetrydb.org'

function transform(raw: unknown): Poem[] {
  if (!Array.isArray(raw)) return []
  return raw as Poem[]
}

export async function fetchRandomPoem(): Promise<Poem[]> {
  const res = await fetch(`${BASE_URL}/random`)
  const data = await res.json()
  return transform(data)
}

export async function fetchRandomPoems(count: number): Promise<Poem[]> {
  const res = await fetch(`${BASE_URL}/random/${count}`)
  const data = await res.json()
  return transform(data)
}

export async function searchByTitle(query: string): Promise<Poem[]> {
  const res = await fetch(`${BASE_URL}/title/${encodeURIComponent(query)}`)
  const data = await res.json()
  return transform(data)
}

export async function searchByAuthor(query: string): Promise<Poem[]> {
  const res = await fetch(`${BASE_URL}/author/${encodeURIComponent(query)}`)
  const data = await res.json()
  return transform(data)
}

export async function searchAll(query: string): Promise<Poem[]> {
  const [byTitle, byAuthor] = await Promise.all([
    searchByTitle(query),
    searchByAuthor(query),
  ])
  const seen = new Set<string>()
  const merged: Poem[] = []
  for (const poem of [...byTitle, ...byAuthor]) {
    const key = `${poem.title}||${poem.author}`
    if (!seen.has(key)) {
      seen.add(key)
      merged.push(poem)
    }
  }
  return merged
}

export async function getPoemByTitle(title: string): Promise<Poem | null> {
  const res = await fetch(`${BASE_URL}/title/${encodeURIComponent(title)}`)
  const data = await res.json()
  const results = transform(data)
  return results[0] ?? null
}
