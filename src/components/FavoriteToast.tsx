import { Box, HStack, Stack, Text } from '@chakra-ui/react'

interface FavoriteToastProps {
  added: boolean
  title: string
}

function truncate(str: string, max = 28): string {
  return str.length > max ? str.slice(0, max).trimEnd() + '…' : str
}

function LeafIcon({ color }: { color: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <g clipPath="url(#clip0_20_15325)">
        <path
          d="M1.1665 12.25C1.1665 10.5 2.24567 9.12329 4.12984 8.74996C5.5415 8.46996 6.99984 7.58329 7.58317 6.99996M6.4165 11.6666C5.39221 11.6697 4.40415 11.2878 3.64831 10.5965C2.89246 9.90515 2.42403 8.95503 2.33593 7.93452C2.24783 6.91402 2.54649 5.89767 3.17267 5.08706C3.79886 4.27645 4.70683 3.73078 5.7165 3.55829C9.0415 2.91663 9.9165 2.61329 11.0832 1.16663C11.6665 2.33329 12.2498 3.60496 12.2498 5.83329C12.2498 9.04163 9.4615 11.6666 6.4165 11.6666Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_20_15325">
          <rect width="14" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export function FavoriteToast({ added, title }: FavoriteToastProps) {
  const shortTitle = truncate(title)

  if (!added) {
    return (
      <Box
        bg="gray.100"
        borderWidth="1px"
        borderColor="gray.200"
        rounded="lg"
        px={4}
        py={3}
        maxW="sm"
        shadow="sm"
      >
        <HStack spacing={3} align="center">
          <LeafIcon color="#6B7280" />
          <Text fontSize="sm" fontWeight="bold" color="gray.700">
            {shortTitle} removed from favorites
          </Text>
        </HStack>
      </Box>
    )
  }

  return (
    <Box
      bg="#F0FAF2"
      borderWidth="1px"
      borderColor="green.200"
      rounded="lg"
      px={4}
      py={3}
      maxW="sm"
      shadow="sm"
    >
      <HStack spacing={3} align="flex-start">
        <Box pt="1px">
          <LeafIcon color="#116932" />
        </Box>
        <Stack spacing={0.5}>
          <Text fontSize="sm" fontWeight="bold" color="green.900">
            {shortTitle} added to favorites
          </Text>
          <Text fontSize="sm" color="green.700">
            View it in &apos;My favorites&apos; below
          </Text>
        </Stack>
      </HStack>
    </Box>
  )
}
