'use client'

import { useState } from 'react'
import { useRecipes } from '@/hooks/useRecipes'
import Link from 'next/link'

export default function Home() {
  const [tagInput, setTagInput] = useState('')
  const [searchTag, setSearchTag] = useState<string | undefined>(undefined)
  const { recipes, loading, error, handleDelete } = useRecipes(searchTag)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchTag(tagInput.trim() || undefined) // trigger fetch only on submit
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-gray-100 p-8'>
      <div className='max-w-4xl mx-auto space-y-8'>
        {/* Header */}
        <div className='flex justify-between items-center'>
          <h1 className='text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent'>
            Recipes
          </h1>
          <Link
            href='/recipes/new'
            className='px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:scale-105 transition'
          >
            + Add Recipe
          </Link>
        </div>

        {/* Tag Search */}
        <form onSubmit={handleSearch} className='flex gap-2'>
          <input
            type='text'
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder='Search by tag...'
            className='flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500'
          />
          <button
            type='submit'
            className='px-4 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-500 transition'
          >
            Search
          </button>
          {searchTag && (
            <button
              type='button'
              onClick={() => {
                setTagInput('')
                setSearchTag(undefined) // resets back to all recipes
              }}
              className='px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition'
            >
              Clear
            </button>
          )}
        </form>

        {/* Recipes List */}
        <div className='grid gap-4'>
          {loading && (
            <p className='text-center text-blue-400 animate-pulse'>
              Loading...
            </p>
          )}
          {error && <p className='text-red-500 text-center'>{error}</p>}
          {!loading && !error && recipes.length === 0 && (
            <p className='text-center text-gray-500'>No recipes found</p>
          )}
          {!loading &&
            !error &&
            recipes.map((r) => (
              <div
                key={r.id}
                className='flex justify-between items-center p-5 rounded-2xl bg-gray-800/60 border border-gray-700 hover:border-purple-500/50 transition'
              >
                <div>
                  <div>
                    <span className='block text-lg font-semibold'>
                      {r.title}
                    </span>

                    {/* Dietary Tags */}
                    {r.dietaryTags && (
                      <div className='mt-2 flex gap-2 flex-wrap'>
                        {r.dietaryTags.split(',').map((tag) => (
                          <span
                            key={tag.trim()}
                            className='text-xs px-2 py-1 rounded-full bg-green-600/20 text-green-300 border border-green-500/30'
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className='mt-1 flex gap-2 flex-wrap'>
                    {r.tags?.map((t) => (
                      <span
                        key={t}
                        className='text-xs px-2 py-0.5 rounded-full bg-purple-600/30 text-purple-300 border border-purple-500/30'
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className='space-x-4'>
                  <Link
                    href={`/recipes/${r.id}`}
                    className='text-cyan-400 hover:text-cyan-300'
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className='text-red-400 hover:text-red-300'
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
