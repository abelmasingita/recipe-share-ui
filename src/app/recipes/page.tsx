'use client'

import { useRecipes } from '@/hooks/useRecipes'
import { RecipeCard } from '@/components/RecipeCard'
import Link from 'next/link'

export default function RecipesPage() {
  const { recipes, loading, error, handleDelete } = useRecipes()

  if (loading) return <p>Loading...</p>
  if (error) return <p className='text-red-600'>{error}</p>

  return (
    <div className='p-6 space-y-4'>
      <h1 className='text-2xl font-bold'>Recipes</h1>
      <Link
        href='/recipes/new'
        className='bg-blue-600 text-white px-3 py-1 rounded'
      >
        Add Recipe
      </Link>
      <div className='mt-4 space-y-2'>
        {recipes.map((r) => (
          <RecipeCard key={r.id} recipe={r} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  )
}
