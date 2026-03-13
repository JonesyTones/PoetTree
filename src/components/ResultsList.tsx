import { useEffect, useState } from 'react'
import { Box, Button, SimpleGrid, Skeleton } from '@chakra-ui/react'
import { PoemCard } from './PoemCard'
import { SearchEmptyState } from './SearchEmptyState'
import { SearchErrorState } from './SearchErrorState'
import type { Poem } from '../types'

const PAGE_SIZE = 18

interface ResultsListProps {
  poems: Poem[]
  loading: boolean
  error: string | null
  hasSearched: boolean
  isSaved: (poem: Poem) => boolean
  onSave: (poem: Poem) => void
  onReadMore: (poem: Poem) => void
}

export function ResultsList({
  poems,
  loading,
  error,
  hasSearched,
  isSaved,
  onSave,
  onReadMore,
}: ResultsListProps) {
  const [limit, setLimit] = useState(PAGE_SIZE)

  useEffect(() => {
    setLimit(PAGE_SIZE)
  }, [poems])

  if (loading) {
    return (
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} pt={6}>
        <Skeleton height="200px" rounded="md" />
        <Skeleton height="200px" rounded="md" />
        <Skeleton height="200px" rounded="md" />
      </SimpleGrid>
    )
  }

  if (error) {
    return <SearchErrorState />
  }

  if (hasSearched && poems.length === 0) {
    return <SearchErrorState noResults />
  }

  if (!hasSearched) return <SearchEmptyState />

  const visible = poems.slice(0, limit)
  const hasMore = poems.length > limit

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} pt={6}>
        {visible.map((poem) => (
          <PoemCard
            key={`${poem.title}||${poem.author}`}
            poem={poem}
            isSaved={isSaved(poem)}
            onSave={() => onSave(poem)}
            onReadMore={() => onReadMore(poem)}
          />
        ))}
      </SimpleGrid>

      {hasMore && (
        <Box textAlign="center" mt={8}>
          <Button
            variant="outline"
            borderColor="gray.300"
            color="gray.700"
            _hover={{ bg: 'gray.100' }}
            onClick={() => setLimit((prev) => prev + PAGE_SIZE)}
          >
            Show more
          </Button>
        </Box>
      )}
    </Box>
  )
}
