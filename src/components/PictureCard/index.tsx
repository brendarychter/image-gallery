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

export default function PictureCard({
  author,
  thumbnail,
  download_url
}: Picture) {
  //Recibir picture mas la data de donde viene
  console.log(download_url);

  const redirectToPictureDetail = ()=>{
    console.log('redirect a unico')
  }

  const handleFavorite =  (e: any) => {
    e.stopPropagation();
    console.log('add to favorites if is card. remove if is view')
  }

  return (
    <Card
      maxW="sm"
      cursor="pointer"
      _hover={{ transform: 'scale(1.05)' }}
      onClick={() => redirectToPictureDetail()}
    >
      <CardBody position="relative">
        <Image
          src={thumbnail}
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
          onClick={(e)=>handleFavorite(e)}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{author}</Heading>
        </Stack>
      </CardBody>
    </Card>
  );
}
