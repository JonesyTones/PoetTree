import {
  Box,
  Card,
  CardBody,
  CardFooter,
  HStack,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'
import { SaveButton } from './SaveButton'
import type { Poem } from '../types'

interface PoemCardProps {
  poem: Poem
  featured?: boolean
  isSaved: boolean
  onSave: () => void
  onReadMore: () => void
}

const readMoreStyles = (saved: boolean) => ({
  as: 'button' as const,
  fontSize: 'sm',
  color: saved ? 'white' : 'green.700',
  fontWeight: 'medium',
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  padding: 0,
  _hover: { textDecoration: 'underline', color: saved ? 'white' : 'green.700' },
  _focusVisible: {
    outline: '2px solid',
    outlineColor: saved ? 'white' : 'green.700',
    outlineOffset: '2px',
    borderRadius: 'sm',
  },
})

const barkBackground = {
  position: 'absolute' as const,
  inset: 0,
  backgroundColor: '#94581F',
  backgroundImage: 'url(/treebark.svg)',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  zIndex: 0,
  borderRadius: 'inherit',
  _after: {
    content: '""',
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 'inherit',
  },
}

export function PoemCard({ poem, featured = false, isSaved, onSave, onReadMore }: PoemCardProps) {
  const excerpt = poem.lines.slice(0, 3).join(' / ')

  if (featured) {
    return (
      <Card borderWidth="1px" borderColor="gray.200" rounded="md" p={3} position="relative" overflow="hidden">
        {isSaved && <Box sx={barkBackground} />}
        <CardBody position="relative" zIndex={1}>
          <Stack spacing={4}>
            <Box borderLeftWidth="4px" borderLeftColor="green.700" pl={3}>
              <Text fontSize="sm" fontWeight="semibold" color={isSaved ? 'white' : 'gray.600'} mb={2}>
                Poem of the Day
              </Text>
              <HStack justify="space-between" align="flex-start" spacing={4}>
                <Heading as="h3" size="lg" mb={1} color={isSaved ? 'white' : undefined}>
                  {poem.title}
                </Heading>
                <Box flexShrink={0} mt="-6px">
                  <SaveButton isSaved={isSaved} onClick={onSave} />
                </Box>
              </HStack>
              <Text fontSize="lg" color={isSaved ? 'white' : 'gray.500'} mb={3}>
                {poem.author}
              </Text>
            </Box>
            <Text fontSize="lg" color={isSaved ? 'white' : 'gray.900'} lineHeight="tall">
              {excerpt}
            </Text>
            <HStack justify="space-between">
              <Box {...readMoreStyles(isSaved)} onClick={onReadMore}>
                Read more
              </Box>
              <Text fontSize="xs" color={isSaved ? 'white' : 'gray.400'}>
                {poem.linecount} lines
              </Text>
            </HStack>
          </Stack>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card borderWidth="1px" borderColor="gray.200" rounded="md" h="full" position="relative" overflow="hidden">
      {isSaved && <Box sx={barkBackground} />}
      <CardBody position="relative" zIndex={1}>
        <Stack spacing={4} h="full" justify="space-between">
          <Stack spacing={3}>
            <HStack justify="space-between" align="flex-start">
              <Heading as="h4" size="md" color={isSaved ? 'white' : undefined}>
                {poem.title}
              </Heading>
              <Box flexShrink={0} mt="-4px">
                <SaveButton isSaved={isSaved} onClick={onSave} />
              </Box>
            </HStack>
            <Stack spacing={2}>
              <Text fontSize="sm" fontWeight="semibold" color={isSaved ? 'white' : 'gray.500'}>
                {poem.author}
              </Text>
              <Text fontSize="sm" color={isSaved ? 'white' : 'gray.700'} noOfLines={3}>
                {excerpt}
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </CardBody>
      <CardFooter position="relative" zIndex={1}>
        <HStack justify="space-between" w="full">
          <Text {...readMoreStyles(isSaved)} onClick={onReadMore}>
            Read more
          </Text>
          <Text fontSize="xs" color={isSaved ? 'white' : 'gray.400'}>
            {poem.linecount} lines
          </Text>
        </HStack>
      </CardFooter>
    </Card>
  )
}
