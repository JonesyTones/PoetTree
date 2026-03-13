import { Button, Icon, Stack, Text } from '@chakra-ui/react'
import { RepeatIcon } from '@chakra-ui/icons'

interface ExploreErrorStateProps {
  onRetry: () => void
}

export function ExploreErrorState({ onRetry }: ExploreErrorStateProps) {
  return (
    <Stack align="center" spacing={4} py={16}>
      <Icon as={RepeatIcon} boxSize={10} color="gray.900" />
      <Text fontWeight="bold" fontSize="lg" color="gray.900">
        Something strange happened
      </Text>
      <Text fontSize="md" color="gray.500" textAlign="center" maxW="320px">
        Try refreshing the page or click the button below to try again. If it persists, well.....read a book
      </Text>
      <Button
        bg="green.700"
        color="white"
        _hover={{ bg: 'green.800' }}
        px={8}
        onClick={onRetry}
      >
        Refresh
      </Button>
    </Stack>
  )
}
