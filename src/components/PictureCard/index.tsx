import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  IconButton
} from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import { Picture } from '@/types';

export default function PictureCard({ author, download_url }: Picture) {
  return (
    <Card maxW="sm" cursor="pointer" _hover={{ transform: 'scale(1.05)' }}>
      <CardBody position="relative">
        <Image
          src={download_url}
          display="block"
          objectFit="cover"
          alt={author}
          borderRadius="lg"
          loading="lazy"
          width="100%"
          height="200px"
        />
        <IconButton
          isRound={true}
          variant="solid"
          colorScheme="purple"
          aria-label="Favorite"
          position="absolute"
          top="0"
          right="0"
          fontSize="20px"
          icon={<FaHeart color="white" />}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{author}</Heading>
        </Stack>
      </CardBody>
    </Card>
  );
}
