import Link from 'next/link'
import { Recipe } from '@/types/recipe'

interface Props {
  recipe: Recipe
  onDelete?: (id: string) => void
}

export function RecipeCard({ recipe, onDelete }: Props) {
  return (
    <div className='border p-3 rounded flex justify-between items-center'>
      <Link href={`/recipes/${recipe.id}`} className='font-medium'>
        {recipe.title}
      </Link>
      <div className='space-x-2'>
        <Link href={`/recipes/${recipe.id}/edit`} className='text-blue-600'>
          Edit
        </Link>
        {onDelete && (
          <button onClick={() => onDelete(recipe.id)} className='text-red-600'>
            Delete
          </button>
        )}
      </div>
    </div>
  )
}
