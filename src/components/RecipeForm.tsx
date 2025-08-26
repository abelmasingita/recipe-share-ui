'use client'

import { useState } from 'react'
import { Recipe } from '@/types/recipe'

interface Props {
  initial?: Partial<Recipe>
  onSubmit: (data: Omit<Recipe, 'id'>) => Promise<void>
  submitLabel?: string
}

export function RecipeForm({ initial, onSubmit, submitLabel = 'Save' }: Props) {
  const [form, setForm] = useState({
    title: initial?.title ?? '',
    ingredients: initial?.ingredients ?? '',
    steps: initial?.steps ?? '',
    cookingTimeMinutes: initial?.cookingTimeMinutes ?? 0,
    tags: initial?.tags ?? [],
    dietaryTags: initial?.dietaryTags ?? '',
  })

  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      await onSubmit(form)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Validation failed')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full max-w-2xl p-8 rounded-2xl bg-gray-800/60 backdrop-blur-xl shadow-2xl border border-gray-700/50 space-y-6'
    >
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
        className='w-full px-4 py-3 rounded-xl bg-gray-900/70 border border-gray-700 
                   focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 
                   outline-none transition'
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      {/* Ingredients */}
      <label>Ingredients (comma separated)</label>
      <textarea
        placeholder='Ingredients (comma separated)'
        rows={4}
        className='w-full px-4 py-3 rounded-xl bg-gray-900/70 border border-gray-700 
                   focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 
                   outline-none transition'
        value={form.ingredients}
        onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
      />

      {/* Steps */}
      <label>Steps (one per line)</label>
      <textarea
        placeholder='Steps (one per line)'
        rows={4}
        className='w-full px-4 py-3 rounded-xl bg-gray-900/70 border border-gray-700 
                   focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40 
                   outline-none transition'
        value={form.steps}
        onChange={(e) => setForm({ ...form, steps: e.target.value })}
      />

      <label>Dietary Tags</label>
      <textarea
        placeholder='Dietary Tags (comma separated, e.g. Vegan, Gluten-Free)'
        className='border p-2 w-full rounded-lg bg-gray-900/70 border-gray-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-green-500/40'
        value={form.dietaryTags}
        onChange={(e) => setForm({ ...form, dietaryTags: e.target.value })}
      />

      {/* Cooking Time */}
      <label>Cooking Time (minutes)</label>
      <input
        type='number'
        min={1}
        placeholder='Cooking Time (minutes)'
        className='w-full px-4 py-3 rounded-xl bg-gray-900/70 border border-gray-700 
                   focus:border-green-400 focus:ring-2 focus:ring-green-500/40 
                   outline-none transition'
        value={form.cookingTimeMinutes}
        onChange={(e) =>
          setForm({ ...form, cookingTimeMinutes: Math.max(1, +e.target.value) })
        }
      />

      {/* Submit button */}
      <button
        type='submit'
        className='w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 
                   text-white font-semibold shadow-lg shadow-green-500/30 
                   hover:scale-[1.02] transition-transform'
      >
        {submitLabel}
      </button>
    </form>
  )
}
