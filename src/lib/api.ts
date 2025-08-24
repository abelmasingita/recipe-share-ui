import { Recipe } from '@/types/recipe'

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export async function getRecipes(): Promise<Recipe[]> {
  const res = await fetch(`${baseUrl}/recipes`)
  if (!res.ok) throw new Error('Failed to fetch recipes')
  return res.json()
}

export async function getRecipe(id: string): Promise<Recipe> {
  const res = await fetch(`${baseUrl}/recipes/${id}`)
  if (!res.ok) throw new Error('Recipe not found')
  return res.json()
}

export async function createRecipe(recipe: Omit<Recipe, 'id'>) {
  const res = await fetch(`${baseUrl}/recipes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipe),
  })
  if (!res.ok) {
    const err = await res.json()
    throw err
  }
  return res.json()
}

export async function updateRecipe(id: string, recipe: Omit<Recipe, 'id'>) {
  const res = await fetch(`${baseUrl}/recipes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipe),
  })
  if (!res.ok) {
    const err = await res.json()
    throw err
  }
}

export async function deleteRecipe(id: string) {
  const res = await fetch(`${baseUrl}/recipes/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete recipe')
}
