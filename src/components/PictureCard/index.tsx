import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  IconButton,
  useToast
} from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { usePictureContext } from '@/context/PictureContext';

export default function PictureCard(picture: any) {
  const navigate = useNavigate();
  const location = useLocation();
  const isDetail = location.pathname.includes('/gallery/image');
  const isFavorites = location.pathname.includes('/favorites');

  const toast = useToast();

  const {
    id,
    author,
    width,
    height,
    thumbnail,
    download_url,
    favorite
  } = picture;

  const { addPicture, removePicture } = usePictureContext();

  // get vista. si es detail, mostrar
  const handleFavorite = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    console.log(favorite)
    if (favorite) {
      // if vista no es gallery
      removePicture(id);
      console.log('show alert');
    } else {
      toast({
        title: 'Imagen agregada a Mis favoritas',
        status: 'success',
        duration: 5000,
        isClosable: true
      });
      addPicture(picture);
    }
  };

  return (
    <Card
      maxW="600px"
      cursor={isDetail ? 'default' : 'pointer'}
      _hover={isDetail ? undefined : { transform: 'scale(1.05)' }}
      onClick={isDetail ? undefined : () => navigate(`/gallery/image/${id}`)}
    >
      <CardBody position="relative">
        <Image
          src={isDetail ? download_url : thumbnail}
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
          variant={isFavorites ? "solid" : "outline"}
          colorScheme="purple"
          aria-label="Favorite"
          position="absolute"
          top="0"
          right="0"
          fontSize="20px"
          _hover={{ transform: 'scale(1.05)' }}
          icon={<FaHeart color="white" />}
          onClick={(e) => handleFavorite(e)}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{author}</Heading>
        </Stack>
        {isDetail && (
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
