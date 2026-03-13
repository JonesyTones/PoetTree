import { Alert, AlertIcon, Box, Skeleton } from '@chakra-ui/react'
import { PoemCard } from './PoemCard'
import { usePoemOfTheDay } from '../hooks/usePoemOfTheDay'

interface PoemOfTheDayProps {
  isSaved: (poem: import('../types').Poem) => boolean
  onSave: (poem: import('../types').Poem) => void
  onReadMore: (poem: import('../types').Poem) => void
}

export function PoemOfTheDay({ isSaved, onSave, onReadMore }: PoemOfTheDayProps) {
  const { poem, loading, error } = usePoemOfTheDay()

  if (loading) return <Skeleton height="160px" rounded="md" />

  if (error) {
    return (
      <Alert status="error" rounded="md">
        <AlertIcon />
        {error}
      </Alert>
    )
  }

  if (!poem) return null

  return (
    <Box>
      <PoemCard
        poem={poem}
        featured
        isSaved={isSaved(poem)}
        onSave={() => onSave(poem)}
        onReadMore={() => onReadMore(poem)}
      />
    </Box>
  )
}
