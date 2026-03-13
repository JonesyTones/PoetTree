import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import type { SearchFilter } from '../types'

interface SearchBarProps {
  value: string
  filter: SearchFilter
  onSearch: (query: string) => void
  onFilterChange: (filter: SearchFilter) => void
  onSubmit: () => void
}

export function SearchBar({ value, filter, onSearch, onFilterChange, onSubmit }: SearchBarProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit()
  }

  return (
    <Stack as="form" onSubmit={handleSubmit} spacing={0} w="full">
      <Stack spacing={3} direction={{ base: 'column', md: 'row' }}>
        <InputGroup flex={1}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.500" />
          </InputLeftElement>
          <Input
            placeholder="Search poems"
            borderRadius="md"
            value={value}
            pr="120px"
            onChange={(e) => onSearch(e.target.value)}
          />
          <HStack position="absolute" right={2} h="full" spacing={1} zIndex={1}>
            {value && (
              <Box
                as="button"
                type="button"
                aria-label="Clear search"
                onClick={() => onSearch('')}
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="gray.400"
                _hover={{ color: 'gray.600' }}
                p={1}
              >
                ✕
              </Box>
            )}
            <Select
              variant="unstyled"
              value={filter}
              w="auto"
              onChange={(e) => onFilterChange(e.target.value as SearchFilter)}
            >
              <option value="all">All</option>
              <option value="author">By Author</option>
              <option value="title">By Title</option>
            </Select>
          </HStack>
        </InputGroup>
        <Button
          type="submit"
          bg="green.700"
          color="white"
          _hover={{ bg: 'green.800' }}
          px={6}
          flexShrink={0}
          w={{ base: 'full', md: 'auto' }}
        >
          Search
        </Button>
      </Stack>
    </Stack>
  )
}
