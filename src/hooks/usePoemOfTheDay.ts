import { useState, useEffect } from 'react'
import type { Poem } from '../types'
import { fetchRandomPoem } from '../lib/api'
import { getCachedDailyPoem, cacheDailyPoem } from '../lib/storage'

export function usePoemOfTheDay() {
  const [poem, setPoem] = useState<Poem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const cached = getCachedDailyPoem()
    if (cached) {
      setPoem(cached)
      setLoading(false)
      return
    }
    fetchRandomPoem()
      .then(([p]) => {
        cacheDailyPoem(p)
        setPoem(p)
      })
      .catch(() => setError('Could not load poem of the day'))
      .finally(() => setLoading(false))
  }, [])

  return { poem, loading, error }
}
