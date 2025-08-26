'use client'

import { useEffect, useState } from 'react'
import { getRecipes, deleteRecipe } from '@/lib/api'
import { Recipe } from '@/types/recipe'


export function useRecipes(tag?: string) {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRecipes() {
      setLoading(true)
      try {
        const data = await getRecipes(tag) // pass tag to API
        setRecipes(data)
        setError(null)
      } catch (err) {
        setError('Failed to load recipes')
      } finally {
        setLoading(false)
      }
    }
    fetchRecipes()
  }, [tag])

  async function handleDelete(id: string) {
    try {
      await deleteRecipe(id)
      setRecipes((prev) => prev.filter((r) => r.id !== id))
    } catch {
      setError('Failed to delete recipe')
    }
  }

  return { recipes, loading, error, handleDelete }
}
