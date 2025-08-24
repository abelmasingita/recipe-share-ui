'use client'

import { useParams, useRouter } from 'next/navigation'
import { useRecipe } from '@/hooks/useRecipe'
import { RecipeForm } from '@/components/RecipeForm'

export default function EditRecipe() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const { recipe, loading, error, handleUpdate } = useRecipe(id)

  if (loading) return <p>Loading...</p>
  if (error || !recipe)
    return <p className='text-red-600'>{error ?? 'Not found'}</p>

  return (
    <div>
      <h1 className='text-xl font-bold p-6'>Edit Recipe</h1>
      <RecipeForm
        initial={recipe}
        onSubmit={async (data) => {
          await handleUpdate(data)
          router.push('/recipes')
        }}
        submitLabel='Update'
      />
    </div>
  )
}
