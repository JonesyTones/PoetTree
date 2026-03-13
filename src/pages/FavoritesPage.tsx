import { useState } from 'react'
import { Box, Container, Heading, SimpleGrid, useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { PoemCard } from '../components/PoemCard'
import { PoemDetailModal } from '../components/PoemDetailModal'
import { FavoriteToast } from '../components/FavoriteToast'
import { FavoritesEmptyState } from '../components/FavoritesEmptyState'
import { useFavorites } from '../hooks/useFavorites'
import type { Poem } from '../types'

export default function FavoritesPage() {
  const navigate = useNavigate()
  const { favorites, toggleFavorite, checkIsFavorite } = useFavorites()
  const toast = useToast()
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null)

  function handleToggleFavorite(poem: Poem) {
    const wasSaved = checkIsFavorite(poem)
    toggleFavorite(poem)
    if (wasSaved && selectedPoem?.title === poem.title) {
      setSelectedPoem(null)
    }
    toast({
      position: 'bottom-right',
      duration: 2500,
      render: () => <FavoriteToast added={!wasSaved} title={poem.title} />,
    })
  }

  return (
    <Box bg="gray.50" minH="100vh">
      <Header />
      <Container maxW="container.xl" pb={12}>
        <Heading as="h2" size="xl" mb={8}>
          My favorites
        </Heading>

        {favorites.length === 0 ? (
          <FavoritesEmptyState onExplore={() => navigate('/')} />
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {favorites.map((poem) => (
              <PoemCard
                key={`${poem.title}||${poem.author}`}
                poem={poem}
                isSaved={checkIsFavorite(poem)}
                onSave={() => handleToggleFavorite(poem)}
                onReadMore={() => setSelectedPoem(poem)}
              />
            ))}
          </SimpleGrid>
        )}
      </Container>

      <PoemDetailModal
        poem={selectedPoem}
        isOpen={selectedPoem !== null}
        isSaved={selectedPoem ? checkIsFavorite(selectedPoem) : false}
        onSave={() => selectedPoem && handleToggleFavorite(selectedPoem)}
        onClose={() => setSelectedPoem(null)}
      />
    </Box>
  )
}
