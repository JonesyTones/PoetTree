import { useEffect, useState } from 'react'
import { Box, Button, HStack, SimpleGrid, Skeleton } from '@chakra-ui/react'
import { RepeatIcon } from '@chakra-ui/icons'
import { PoemCard } from './PoemCard'
import { ExploreErrorState } from './ExploreErrorState'
import { fetchRandomPoems } from '../lib/api'
import type { Poem } from '../types'

interface ExploreTabProps {
  isSaved: (poem: Poem) => boolean
  onSave: (poem: Poem) => void
  onReadMore: (poem: Poem) => void
}

export function ExploreTab({ isSaved, onSave, onReadMore }: ExploreTabProps) {
  const [poems, setPoems] = useState<Poem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function load() {
    setLoading(true)
    setError(null)
    fetchRandomPoems(18)
      .then(setPoems)
      .catch(() => setError('Could not load poems. Please try again.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <Box>
      <HStack justify="flex-end" pt={4} pb={2}>
        <Button
          size="sm"
          variant="outline"
          borderColor="gray.300"
          color="gray.700"
          leftIcon={<RepeatIcon />}
          _hover={{ bg: 'gray.100' }}
          onClick={load}
          isLoading={loading}
          loadingText="Refreshing"
        >
          Refresh
        </Button>
      </HStack>

      {error && <ExploreErrorState onRetry={load} />}

      {loading ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} pt={2}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} height="200px" rounded="md" />
          ))}
        </SimpleGrid>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} pt={2}>
          {poems.map((poem) => (
            <PoemCard
              key={`${poem.title}||${poem.author}`}
              poem={poem}
              isSaved={isSaved(poem)}
              onSave={() => onSave(poem)}
              onReadMore={() => onReadMore(poem)}
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  )
}
