import { SimpleGrid } from '@chakra-ui/react';
import { PictureCard } from '@/components';
import { Picture, Pictures } from '@/types';

export default function PictureGrid({pictures}: Pictures) {
  return (
    <SimpleGrid minChildWidth="200px" spacing="30px" padding="20px" justifyItems="center">
      {pictures.map((picture: Picture) => (
        <PictureCard key={picture.id} {...picture}/>
      ))}
    </SimpleGrid>
  );
}
