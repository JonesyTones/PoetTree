import { Stack, Text } from '@chakra-ui/react'

function SearchIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="11" cy="11" r="8" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 21L16.65 16.65" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function SearchEmptyState() {
  return (
    <Stack align="center" spacing={3} py={16}>
      <SearchIcon />
      <Stack align="center" spacing={2}>
        <Text fontSize="lg" fontWeight="bold" color="gray.900">
          Search something to find something
        </Text>
        <Text fontSize="md" color="gray.400">
          Search by title or author to find your poem
        </Text>
      </Stack>
    </Stack>
  )
}
