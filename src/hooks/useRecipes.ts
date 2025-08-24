'use client'

import { useEffect, useState } from 'react'
import { getRecipes, deleteRecipe } from '@/lib/api'
import { Recipe } from '@/types/recipe'

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getRecipes()
      .then(setRecipes)
      .catch(() => setError('Failed to load recipes'))
      .finally(() => setLoading(false))
  }, [])

  async function handleDelete(id: string) {
    try {
      await deleteRecipe(id)
      setRecipes((r) => r.filter((x) => x.id !== id))
    } catch {
      setError('Failed to delete recipe')
    }
  }

  return { recipes, loading, error, handleDelete }
}
