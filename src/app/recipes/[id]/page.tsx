'use client'

import { useParams, useRouter } from 'next/navigation'
import { useRecipe } from '@/hooks/useRecipe'
import { RecipeForm } from '@/components/RecipeForm'
import Link from 'next/link'

export default function EditRecipe() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const { recipe, loading, error, handleUpdate } = useRecipe(id)

  if (loading)
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-cyan-400'>
        <p className='animate-pulse'>Loading recipe...</p>
      </div>
    )

  if (error || !recipe)
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900'>
        <p className='text-red-400 bg-red-900/30 px-6 py-3 rounded-xl border border-red-500/30 shadow-lg'>
          {error ?? 'Recipe not found'}
        </p>
      </div>
    )

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-gray-100 p-8 flex justify-center items-start'>
      <div className='w-full max-w-3xl space-y-8'>
        {/* Header */}
        <h1 className='text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent'>
          Edit Recipe
        </h1>

        <Link
          href='/'
          className='inline-block px-4 py-2 rounded-xl bg-gradient-to-r from-gray-700 to-gray-800 text-gray-200 shadow-md hover:scale-105 hover:from-gray-600 hover:to-gray-700 transition'
        >
          Back
        </Link>

        {/* Recipe Form */}
        <RecipeForm
          initial={recipe}
          onSubmit={async (data) => {
            await handleUpdate(data)
            router.push('/')
          }}
          submitLabel='Update'
        />
      </div>
    </div>
  )
}
