import { PictureGrid } from '@/components';
import { usePictureContext } from '@/context/PictureContext';
import { ViewType } from '@/types';
import { Text, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const { favorites  } = usePictureContext();
  
  return (
    <>
      {favorites && favorites.length > 0 ? (
        <PictureGrid pictures={favorites} view={ViewType.FAVORITES} />
      ) : (
        <Box>
          <Text display="inline-block">
            Ups! La lista se encuentra vacía. Para agregar imagenes ir a
          </Text>
          <Link color="teal.500" to="/gallery">
            {' '}
            <Text display="inline-block" color="purple.300" as='b'>
              Mi galería
            </Text>
          </Link>
        </Box>
      )}
    </>
  );
}
