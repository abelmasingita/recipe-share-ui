'use client'

import { useState } from 'react'
import { createRecipe } from '@/lib/api'
import { useRouter } from 'next/navigation'

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
      router.push('/recipes')
    } catch (err: unknown) {
      setError('Failed to save recipe')
    }
  }

  return (
    <form onSubmit={handleSubmit} className='p-6 space-y-4'>
      <h1 className='text-xl font-bold'>Add Recipe</h1>
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
        Save
      </button>
    </form>
  )
}
