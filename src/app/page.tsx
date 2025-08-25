'use client'

import { useRecipes } from '@/hooks/useRecipes'
import { RecipeCard } from '@/components/RecipeCard'
import Link from 'next/link'

export default function Home() {
  const { recipes, loading, error, handleDelete } = useRecipes()

  if (loading)
    return <p className='text-center text-blue-400 animate-pulse'>Loading...</p>
  if (error) return <p className='text-red-500 text-center'>{error}</p>

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-gray-100 p-8'>
      {/* Container */}
      <div className='max-w-3xl mx-auto space-y-8'>
        {/* Header */}
        <div className='flex justify-between items-center'>
          <h1 className='text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent'>
            Recipes
          </h1>
          <Link
            href='/recipes/new'
            className='px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg shadow-blue-600/30 hover:scale-105 transition-transform'
          >
            + Add Recipe
          </Link>
        </div>

        {/* Recipes List */}
        <div className='grid gap-4'>
          {recipes.map((r) => (
            <div
              key={r.id}
              className='flex justify-between items-center p-5 rounded-2xl bg-gray-800/60 backdrop-blur-md shadow-xl border border-gray-700 hover:border-purple-500/50 hover:shadow-purple-500/20 transition-all duration-300'
            >
              <span className='text-lg font-semibold'>{r.title}</span>
              <div className='space-x-4'>
                <Link
                  href={`/recipes/${r.id}`}
                  className='text-cyan-400 hover:text-cyan-300 transition'
                >
                  Edit
                </Link>
                <button
                  onClick={() => {
                    if (
                      confirm('Are you sure you want to delete this recipe?')
                    ) {
                      handleDelete(r.id)
                    }
                  }}
                  className='text-red-400 hover:text-red-300 transition'
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
