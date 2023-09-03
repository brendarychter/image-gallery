import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  IconButton
} from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';
import { Picture } from '@types';

export default function ImageCard({author, downloadUrl, id}: Picture) {
  return (
    <Card maxW="sm" key={id}>
      <CardBody>
        <Image
          src={downloadUrl}
          alt={author}
          borderRadius="lg"
        />
        <IconButton
          isRound={true}
          variant="solid"
          colorScheme="purple"
          aria-label="Done"
          fontSize="20px"
          icon={<DownloadIcon />}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{author}</Heading>
        </Stack>
      </CardBody>
    </Card>
  );
}
