import { Button, Stack, Text } from '@chakra-ui/react'

interface FavoritesEmptyStateProps {
  onExplore: () => void
}

function LeafIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.6665 28C2.6665 24 5.13317 20.8533 9.43984 20C12.6665 19.36 15.9998 17.3333 17.3332 16M14.6665 26.6667C12.3253 26.6738 10.0668 25.8007 8.33919 24.2206C6.61155 22.6404 5.54086 20.4687 5.33948 18.1361C5.13811 15.8036 5.82076 13.4805 7.25204 11.6277C8.68332 9.77483 10.7587 8.5276 13.0665 8.13333C20.6665 6.66666 22.6665 5.97333 25.3332 2.66666C26.6665 5.33333 27.9998 8.24 27.9998 13.3333C27.9998 20.6667 21.6265 26.6667 14.6665 26.6667Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function FavoritesEmptyState({ onExplore }: FavoritesEmptyStateProps) {
  return (
    <Stack align="center" spacing={4} py={16}>
      <LeafIcon />
      <Stack align="center" spacing={2}>
        <Text fontSize="lg" fontWeight="bold" color="gray.900">
          You haven't saved any poems yet
        </Text>
        <Text fontSize="md" color="gray.400">
          Save poems you love to build your own collection
        </Text>
      </Stack>
      <Button
        bg="green.700"
        color="white"
        _hover={{ bg: 'green.800' }}
        rounded="lg"
        px={8}
        py={6}
        onClick={onExplore}
      >
        Explore poems
      </Button>
    </Stack>
  )
}
