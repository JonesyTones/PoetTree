import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react'
import { getPoemByTitle } from '../lib/api'
import { useFavorites } from '../hooks/useFavorites'
import { SaveButton } from '../components/SaveButton'
import type { Poem } from '../types'

export default function PoemDetailPage() {
  const { title } = useParams<{ title: string }>()
  const navigate = useNavigate()
  const { toggleFavorite, checkIsFavorite } = useFavorites()

  const [poem, setPoem] = useState<Poem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!title) return
    getPoemByTitle(decodeURIComponent(title))
      .then((p) => {
        if (!p) setError('Poem not found.')
        else setPoem(p)
      })
      .catch(() => setError('Something went wrong while loading the poem.'))
      .finally(() => setLoading(false))
  }, [title])

  return (
    <Box bg="gray.50" minH="100vh">
      <Container maxW="container.md" py={10}>
        <Button variant="ghost" size="sm" mb={8} onClick={() => navigate(-1)}>
          ← Back
        </Button>

        {loading && (
          <Stack spacing={4}>
            <Skeleton height="40px" w="60%" />
            <Skeleton height="24px" w="30%" />
            <Skeleton height="400px" />
          </Stack>
        )}

        {error && (
          <Alert status="error" rounded="md">
            <AlertIcon />
            {error}
          </Alert>
        )}

        {poem && (
          <Stack spacing={6}>
            <HStack justify="space-between" align="flex-start">
              <Box>
                <Heading as="h1" size="xl" mb={1}>
                  {poem.title}
                </Heading>
                <Text fontSize="lg" color="gray.500">
                  {poem.author}
                </Text>
              </Box>
              <SaveButton
                isSaved={checkIsFavorite(poem)}
                onClick={() => toggleFavorite(poem)}
              />
            </HStack>

            <Box lineHeight="tall">
              {poem.lines.map((line, i) =>
                line === '' ? (
                  <Box key={i} h={4} />
                ) : (
                  <Text key={i} fontSize="md" color="gray.800">
                    {line}
                  </Text>
                )
              )}
            </Box>
          </Stack>
        )}
      </Container>
    </Box>
  )
}
