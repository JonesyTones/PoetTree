import { useState } from 'react'
import type { Poem } from '../types'
import {
  getFavorites,
  saveFavorite,
  removeFavorite,
  isFavorite,
} from '../lib/storage'

export function useFavorites() {
  const [favorites, setFavorites] = useState<Poem[]>(() => getFavorites())

  function toggleFavorite(poem: Poem) {
    if (isFavorite(poem)) {
      removeFavorite(poem)
    } else {
      saveFavorite(poem)
    }
    setFavorites(getFavorites())
  }

  function checkIsFavorite(poem: Poem): boolean {
    return isFavorite(poem)
  }

  return { favorites, toggleFavorite, checkIsFavorite }
}
