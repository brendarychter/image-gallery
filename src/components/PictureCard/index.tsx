import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  IconButton,
} from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
// import { Picture } from '@/types';
import { useNavigate, Link } from 'react-router-dom';

export default function PictureCard({
  id,
  author,
  width,
  height,
  thumbnail,
  download_url,
  detail
}: any) {
  const navigate = useNavigate();

  const handleFavorite = (e: any) => {
    e.stopPropagation();
    console.log('add to favorites if is card');
  };


  return (
    <Card
      maxW="600px"
      cursor={detail ? 'default' : 'pointer'}
      _hover={detail ? undefined : { transform: 'scale(1.05)' }}
      onClick={detail ? undefined : () => navigate(`/gallery/image/${id}`)}
    >
      <CardBody position="relative">
        <Image
          src={detail ? download_url : thumbnail}
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
          onClick={(e) => handleFavorite(e)}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{author}</Heading>
        </Stack>
        {detail && (
          <Stack mt="6" spacing="3">
            <Heading size="md">Alto: {width}</Heading>
            <Heading size="md">Largo: {height}</Heading>
            <Link
              to={download_url}
              download={author}
              target="_blank"
              rel="noreferrer"
            >
              Descargar
            </Link>
          </Stack>
        )}
      </CardBody>
    </Card>
  );
}
