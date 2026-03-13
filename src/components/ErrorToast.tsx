import { Box, HStack, Stack, Text } from '@chakra-ui/react'

interface ErrorToastProps {
  message?: string
}

const AlertIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ flexShrink: 0 }}
  >
    <g clipPath="url(#clip0_24_15399)">
      <path
        d="M6.99984 4.66663V6.99996M6.99984 9.33329H7.00567M12.8332 6.99996C12.8332 10.2216 10.2215 12.8333 6.99984 12.8333C3.77818 12.8333 1.1665 10.2216 1.1665 6.99996C1.1665 3.7783 3.77818 1.16663 6.99984 1.16663C10.2215 1.16663 12.8332 3.7783 12.8332 6.99996Z"
        stroke="#991919"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_24_15399">
        <rect width="14" height="14" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

export function ErrorToast({ message = 'Please try again or refresh your browser' }: ErrorToastProps) {
  return (
    <Box
      bg="#FFF0F0"
      borderWidth="1px"
      borderColor="red.200"
      rounded="lg"
      px={4}
      py={3}
      maxW="sm"
      shadow="sm"
    >
      <HStack spacing={3} align="flex-start">
        <Box pt="1px">
          <AlertIcon />
        </Box>
        <Stack spacing={0.5}>
          <Text fontSize="sm" fontWeight="bold" color="#991919">
            There was a problem
          </Text>
          <Text fontSize="sm" color="#991919">
            {message}
          </Text>
        </Stack>
      </HStack>
    </Box>
  )
}
