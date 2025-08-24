'use client'

import { useEffect, useState } from 'react'
import { getRecipe, updateRecipe } from '@/lib/api'
import { Recipe } from '@/types/recipe'

export function useRecipe(id: string) {
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getRecipe(id)
      .then(setRecipe)
      .catch(() => setError('Recipe not found'))
      .finally(() => setLoading(false))
  }, [id])

  async function handleUpdate(data: Omit<Recipe, 'id'>) {
    if (!recipe) return
    try {
      await updateRecipe(recipe.id, data)
      setRecipe({ ...recipe, ...data })
    } catch {
      setError('Failed to update recipe')
    }
  }

  return { recipe, loading, error, handleUpdate }
}
