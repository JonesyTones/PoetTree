import { useState } from 'react'
import { Box, Container, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs, useToast } from '@chakra-ui/react'
import { Header } from '../components/Header'
import { PoemOfTheDay } from '../components/PoemOfTheDay'
import { SearchBar } from '../components/SearchBar'
import { ResultsList } from '../components/ResultsList'
import { PoemCard } from '../components/PoemCard'
import { PoemDetailModal } from '../components/PoemDetailModal'
import { FavoritesEmptyState } from '../components/FavoritesEmptyState'
import { ExploreTab } from '../components/ExploreTab'
import { FavoriteToast } from '../components/FavoriteToast'
import { ErrorToast } from '../components/ErrorToast'
import { useFavorites } from '../hooks/useFavorites'
import { searchByTitle, searchByAuthor, searchAll } from '../lib/api'
import type { Poem, SearchFilter } from '../types'

export default function HomePage() {
  const { favorites, toggleFavorite, checkIsFavorite } = useFavorites()
  const toast = useToast()

  const [searchQuery, setSearchQuery] = useState('')
  const [searchFilter, setSearchFilter] = useState<SearchFilter>('all')
  const [searchResults, setSearchResults] = useState<Poem[]>([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null)
  const [tabIndex, setTabIndex] = useState(0)

  function handleToggleFavorite(poem: Poem) {
    const wasSaved = checkIsFavorite(poem)
    toggleFavorite(poem)
    toast({
      position: 'bottom-right',
      duration: 2500,
      render: () => <FavoriteToast added={!wasSaved} title={poem.title} />,
    })
  }

  async function runSearch(query: string) {
    if (!query.trim()) {
      setSearchResults([])
      setHasSearched(false)
      return
    }
    setTabIndex(1)
    setSearchLoading(true)
    setHasSearched(true)
    try {
      let results: Poem[]
      if (searchFilter === 'title') results = await searchByTitle(query)
      else if (searchFilter === 'author') results = await searchByAuthor(query)
      else results = await searchAll(query)
      setSearchResults(results)
    } catch {
      setSearchResults([])
      toast({
        position: 'bottom-right',
        duration: 3000,
        render: () => <ErrorToast message="Could not load poems. Please try again." />,
      })
    } finally {
      setSearchLoading(false)
    }
  }

  return (
    <Box bg="gray.50" minH="100vh">
      <Header />
      <Container maxW="container.xl" pb={12}>
        <Box mb={8}>
          <PoemOfTheDay
            isSaved={checkIsFavorite}
            onSave={handleToggleFavorite}
            onReadMore={setSelectedPoem}
          />
        </Box>

        <Tabs index={tabIndex} onChange={setTabIndex}>
          <TabList borderBottomWidth="1px" borderBottomColor="gray.200">
            <Tab _selected={{ borderBottomWidth: '2px', borderBottomColor: 'green.700' }}>
              Explore
            </Tab>
            <Tab _selected={{ borderBottomWidth: '2px', borderBottomColor: 'green.700' }}>
              Search poems
            </Tab>
            <Tab _selected={{ borderBottomWidth: '2px', borderBottomColor: 'green.700' }}>
              My favorites
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel px={0}>
              <ExploreTab
                isSaved={checkIsFavorite}
                onSave={handleToggleFavorite}
                onReadMore={setSelectedPoem}
              />
            </TabPanel>

            <TabPanel px={0}>
              <Box mb={6} pt={4}>
                <SearchBar
                  value={searchQuery}
                  filter={searchFilter}
                  onSearch={setSearchQuery}
                  onFilterChange={setSearchFilter}
                  onSubmit={() => runSearch(searchQuery)}
                />
              </Box>
              <ResultsList
                poems={searchResults}
                loading={searchLoading}
                error={null}
                hasSearched={hasSearched}
                isSaved={checkIsFavorite}
                onSave={handleToggleFavorite}
                onReadMore={setSelectedPoem}
              />
            </TabPanel>

            <TabPanel px={0}>
              {favorites.length === 0 ? (
                <FavoritesEmptyState onExplore={() => setTabIndex(0)} />
              ) : (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} pt={6}>
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
            </TabPanel>
          </TabPanels>
        </Tabs>
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
