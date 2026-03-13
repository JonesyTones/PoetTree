import { Stack, Text } from '@chakra-ui/react'

interface SearchErrorStateProps {
  noResults?: boolean
}

function SearchIcon({ muted }: { muted: boolean }) {
  const stroke = muted ? '#A0AEC0' : '#1A202C' // gray.400 vs gray.800
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="11" cy="11" r="8" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 21L16.65 16.65" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function SearchErrorState({ noResults = false }: SearchErrorStateProps) {
  return (
    <Stack align="center" spacing={3} py={16}>
      <SearchIcon muted={noResults} />
      <Stack align="center" spacing={2}>
        <Text fontSize="lg" fontWeight="bold" color="gray.900">
          {noResults ? 'No poems matched that search' : 'Something went wrong'}
        </Text>
        <Text fontSize="md" color="gray.400">
          {noResults ? 'Try a different author or title' : 'Could not load poems. Please try again.'}
        </Text>
      </Stack>
    </Stack>
  )
}
