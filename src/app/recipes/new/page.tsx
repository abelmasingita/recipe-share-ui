'use client'

import { useState } from 'react'
import { createRecipe } from '@/lib/api'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewRecipe() {
  const [form, setForm] = useState({
    title: '',
    ingredients: '',
    steps: '',
    cookingTimeMinutes: 0,
    tags: [] as string[],
  })
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      await createRecipe(form)
      router.push('/')
    } catch (err: unknown) {
      setError('Failed to save recipe')
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-gray-100 p-8 flex justify-center items-start'>
      <Link
        href='/'
        className='absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl 
                  bg-gradient-to-r from-gray-700 to-gray-800 text-gray-200 
                  shadow-md shadow-black/40 border border-gray-600/40
                  hover:from-gray-600 hover:to-gray-700 hover:scale-105 
                  transition-transform'
      >
        Back
      </Link>

      <form
        onSubmit={handleSubmit}
        className='w-full max-w-2xl p-8 rounded-2xl bg-gray-800/60 backdrop-blur-xl shadow-2xl border border-gray-700/50 space-y-6'
      >
        {/* Header */}
        <h1 className='text-3xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent'>
          Add New Recipe
        </h1>

        {error && (
          <p className='text-red-400 bg-red-900/30 p-3 rounded-lg border border-red-500/30'>
            {error}
          </p>
        )}

        {/* Title */}
        <label>Title</label>
        <input
          type='text'
          placeholder='Recipe Title'
          className='w-full px-4 py-3 rounded-xl bg-gray-900/70 border border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 outline-none transition'
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        {/* Ingredients */}
        <label>Ingredients (comma separated)</label>
        <textarea
          placeholder='Ingredients (comma separated)'
          rows={4}
          className='w-full px-4 py-3 rounded-xl bg-gray-900/70 border border-gray-700 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 outline-none transition'
          value={form.ingredients}
          onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
        />

        {/* Steps */}
        <label>Steps (one per line)</label>
        <textarea
          placeholder='Steps (one per line)'
          rows={4}
          className='w-full px-4 py-3 rounded-xl bg-gray-900/70 border border-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40 outline-none transition'
          value={form.steps}
          onChange={(e) => setForm({ ...form, steps: e.target.value })}
        />

        {/* Cooking Time */}
        <label>Cooking Time (minutes)</label>
        <input
          type='number'
          min={1}
          placeholder='Cooking Time (minutes)'
          className='w-full px-4 py-3 rounded-xl bg-gray-900/70 border border-gray-700 focus:border-green-400 focus:ring-2 focus:ring-green-500/40 outline-none transition'
          value={form.cookingTimeMinutes}
          onChange={(e) =>
            setForm({
              ...form,
              cookingTimeMinutes: Math.max(1, +e.target.value),
            })
          }
        />

        {/* Save button */}
        <button
          type='submit'
          className='w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg shadow-green-500/30 hover:scale-[1.02] transition-transform'
        >
          Save Recipe
        </button>
      </form>
    </div>
  )
}
