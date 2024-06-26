import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  IconButton,
  Button,
  Text,
  Box
} from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { usePictureContext } from '@/context/PictureContext';
import { useDialogContext } from '@/context/DialogContext';
import { Picture } from '@/types';
import fallback from '@/assets/fallback.png';

const regexPath = {
  gallery: /^\/gallery$/,
  detail: /^\/gallery\/image\/(\d+)$/
};

export default function PictureCard(picture: Picture) {
  const navigate = useNavigate();
  const location = useLocation();

  const isGallery = regexPath.gallery.test(location.pathname);
  const isDetail = regexPath.detail.test(location.pathname);

  const { id, author, width, height, thumbnail, download_url, favorite } =
    picture;

  const { addPicture, updateId } = usePictureContext();
  const { toggleDialog } = useDialogContext();

  const handleFavorite = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (favorite) {
      updateId(id);
      toggleDialog();
    } else {
      addPicture(picture);
    }
  };

  return (
    <Card
      maxW="400px"
      width="100%"
      cursor={isDetail ? 'default' : 'pointer'}
      _hover={isDetail ? undefined : { transform: 'scale(1.05)' }}
      onClick={isDetail ? undefined : () => navigate(`/gallery/image/${id}`)}
    >
      <CardBody position="relative">
        <Image
          src={isDetail ? download_url : thumbnail}
          fallbackSrc={fallback}
          crossOrigin="anonymous"
          display="block"
          objectFit="cover"
          alt={author}
          borderRadius="lg"
          width="100%"
          height="200px"
        />
        <IconButton
          isRound={true}
          variant={favorite ? 'solid' : 'outline'}
          isDisabled={isGallery && favorite}
          colorScheme="purple"
          aria-label="Favorite"
          position="absolute"
          top="0"
          right="0"
          fontSize="20px"
          _hover={
            !favorite && !isGallery ? { transform: 'scale(1.05)' } : undefined
          }
          icon={<FaHeart color={favorite ? 'purple' : 'white'} />}
          onClick={(e) => handleFavorite(e)}
        />
        <Stack mt="6" spacing="3" justifyContent="center">
          <Heading size="md">{author}</Heading>
        </Stack>
        {isDetail && (
          <Stack
            mt="6"
            spacing="3"
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <Box>
              <Text size="sm">Alto: {width}</Text>
              <Text size="sm">Largo: {height}</Text>
            </Box>
            <Link
              to={download_url}
              download={author}
              target="_blank"
              rel="noreferrer"
            >
              <Button color="purple.200" variant="solid">
                Descargar
              </Button>
            </Link>
          </Stack>
        )}
      </CardBody>
    </Card>
  );
}
