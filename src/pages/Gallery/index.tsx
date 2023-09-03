import { Grid, GridItem } from '@chakra-ui/react';
import ImageCard from '@/components/ImageCard';

export default function Gallery() {
  return (
    <>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <GridItem w="100%" h="10">
          <ImageCard />
        </GridItem>
      </Grid>
    </>
  );
}
