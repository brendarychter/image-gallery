import { SimpleGrid } from '@chakra-ui/react';
import { PictureCard } from '@/components';
import { Picture, PictureGridType } from '@/types';

export default function PictureGrid({ pictures, view }: PictureGridType) {
  return (
    <SimpleGrid minChildWidth="200px" spacing="30px" padding="20px">
      {pictures && pictures.map((picture: Picture) => (
        <PictureCard key={picture.id} picture={picture} view={view}/>
      ))}
    </SimpleGrid>
  );
}
