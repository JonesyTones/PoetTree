import { useEffect, useState } from 'react'
import {
  Box,
  HStack,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react'
import { getPoemByTitle } from '../lib/api'
import type { Poem } from '../types'

interface PoemDetailModalProps {
  poem: Poem | null
  isOpen: boolean
  isSaved: boolean
  onSave: () => void
  onClose: () => void
}

function LeafButton({ isSaved, onClick }: { isSaved: boolean; onClick: () => void }) {
  return (
    <Box
      as="button"
      aria-label={isSaved ? 'Remove from favorites' : 'Save poem'}
      onClick={onClick}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      flexShrink={0}
      borderRadius="full"
      p={1}
      transition="background 0.15s ease"
      _hover={{ bg: isSaved ? 'whiteAlpha.200' : 'gray.100' }}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transition: 'all 0.15s ease' }}
      >
        <path
          d="M11 20C9.24406 20.0053 7.55025 19.3505 6.25452 18.1654C4.95878 16.9803 4.15577 15.3515 4.00474 13.6021C3.8537 11.8527 4.36569 10.1104 5.43915 8.72074C6.51261 7.33112 8.06913 6.3957 9.8 6.1C15.5 5 17 4.48 19 2C20 4 21 6.18 21 10C21 15.5 16.22 20 11 20Z"
          fill={isSaved ? '#10A43F' : 'none'}
        />
        <path
          d="M2 21C2 18 3.85 15.64 7.08 15C9.5 14.52 12 13 13 12"
          fill={isSaved ? '#10A43F' : 'none'}
        />
        <path
          d="M2 21C2 18 3.85 15.64 7.08 15C9.5 14.52 12 13 13 12M11 20C9.24406 20.0053 7.55025 19.3505 6.25452 18.1654C4.95878 16.9803 4.15577 15.3515 4.00474 13.6021C3.8537 11.8527 4.36569 10.1104 5.43915 8.72074C6.51261 7.33112 8.06913 6.3957 9.8 6.1C15.5 5 17 4.48 19 2C20 4 21 6.18 21 10C21 15.5 16.22 20 11 20Z"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  )
}

export function PoemDetailModal({ poem, isOpen, isSaved, onSave, onClose }: PoemDetailModalProps) {
  const [fullPoem, setFullPoem] = useState<Poem | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen || !poem) return
    setFullPoem(null)
    setError(null)
    setLoading(true)
    getPoemByTitle(poem.title)
      .then((p) => {
        if (!p) setError('Poem not found.')
        else setFullPoem(p)
      })
      .catch(() => setError('Something went wrong while loading the poem.'))
      .finally(() => setLoading(false))
  }, [isOpen, poem])

  const displayPoem = fullPoem ?? poem

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent
        rounded="xl"
        overflow="hidden"
        bg={isSaved ? '#764619' : 'white'}
        position="relative"
      >
        {/* Bark border strips at top and bottom */}
        {isSaved && (
          <>
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              h="70px"
              zIndex={0}
              pointerEvents="none"
            >
              <Box
                position="absolute"
                inset={0}
                backgroundImage="url(/treebark.svg)"
                backgroundSize="cover"
                backgroundPosition="top center"
                backgroundRepeat="no-repeat"
              />
              <Box
                position="absolute"
                inset={0}
                background="linear-gradient(to bottom, transparent 15%, #764619 85%)"
              />
            </Box>
            <Box
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              h="70px"
              zIndex={0}
              pointerEvents="none"
            >
              <Box
                position="absolute"
                inset={0}
                backgroundImage="url(/treebark.svg)"
                backgroundSize="cover"
                backgroundPosition="bottom center"
                backgroundRepeat="no-repeat"
              />
              <Box
                position="absolute"
                inset={0}
                background="linear-gradient(to top, transparent 15%, #764619 85%)"
              />
            </Box>
          </>
        )}

        {/* Top-right action buttons: leaf + close */}
        <HStack position="absolute" top={3} right={3} spacing={1} zIndex={3}>
          <LeafButton isSaved={isSaved} onClick={onSave} />
          <IconButton
            aria-label="Close"
            variant="ghost"
            size="sm"
            isRound
            onClick={onClose}
            color={isSaved ? 'white' : undefined}
            _hover={{ bg: isSaved ? 'whiteAlpha.200' : 'gray.100' }}
            icon={
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            }
          />
        </HStack>

        {/* Sticky header — lives outside ModalBody so it never scrolls */}
        <Box px={6} pt={10} pb={4} position="relative" zIndex={1}>
          {loading ? (
            <Skeleton height="36px" w="70%" mb={3} />
          ) : (
            <Heading as="h2" size="xl" lineHeight="1.2" pr={16} color={isSaved ? 'white' : undefined}>
              {displayPoem?.title}
            </Heading>
          )}
          {loading ? (
            <Skeleton height="20px" w="40%" mt={2} />
          ) : (
            <HStack justify="space-between" mt={2}>
              <Text fontSize="lg" color={isSaved ? 'white' : 'gray.400'}>
                {displayPoem?.author}
              </Text>
              <Text fontSize="lg" color={isSaved ? 'white' : 'gray.400'}>
                {displayPoem?.linecount} lines
              </Text>
            </HStack>
          )}
        </Box>

        {/* Scrollable poem body */}
        <ModalBody px={6} pb={12} pt={2} position="relative" zIndex={1}>
          {loading && (
            <Stack spacing={3} pt={2}>
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} height="18px" w={`${70 + (i % 3) * 10}%`} mx="auto" />
              ))}
            </Stack>
          )}

          {error && (
            <Text color="red.500" fontSize="sm" textAlign="center">
              {error}
            </Text>
          )}

          {fullPoem && (
            <Box lineHeight="tall" textAlign="center">
              {fullPoem.lines.map((line, i) =>
                line === '' ? (
                  <Box key={i} h={4} />
                ) : (
                  <Text key={i} fontSize="md" color={isSaved ? 'white' : 'gray.800'}>
                    {line}
                  </Text>
                )
              )}
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
