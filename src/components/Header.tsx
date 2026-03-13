import { Box, Container, Heading, Text } from '@chakra-ui/react'

export function Header() {
  return (
    <Box py={8}>
      <Container maxW="container.xl">
        <Heading as="h1" size="3xl" fontWeight="bold">
          PoetTree
        </Heading>
        <Text fontSize="md" color="gray.600" mt={2}>
          Discover and save your favorite poems
        </Text>
      </Container>
    </Box>
  )
}
