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
    <form onSubmit={handleSubmit} className='p-6 space-y-4'>
      {error && <p className='text-red-600'>{error}</p>}
      <input
        type='text'
        placeholder='Title'
        className='border p-2 w-full'
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        placeholder='Ingredients'
        className='border p-2 w-full'
        value={form.ingredients}
        onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
      />
      <textarea
        placeholder='Steps'
        className='border p-2 w-full'
        value={form.steps}
        onChange={(e) => setForm({ ...form, steps: e.target.value })}
      />
      <input
        type='number'
        placeholder='Cooking Time (minutes)'
        className='border p-2 w-full'
        value={form.cookingTimeMinutes}
        onChange={(e) =>
          setForm({ ...form, cookingTimeMinutes: +e.target.value })
        }
      />
      <button
        type='submit'
        className='bg-green-600 text-white px-3 py-1 rounded'
      >
        {submitLabel}
      </button>
    </form>
  )
}
