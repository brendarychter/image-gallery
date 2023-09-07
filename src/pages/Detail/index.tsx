import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { getPicture } from '@/api';
import { PictureCard } from '@/components';
import { Box, IconButton, Spinner } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { usePictureContext } from '@/context/PictureContext';
import { useEffect } from 'react';

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateId, data, error, isLoading, isError } = usePictureContext();
  
  useEffect(() => {
    updateId(id)

  }, [id, updateId]);


  if (isLoading) {
    return <Spinner />;
  }

  if (isError) return <h4>{`${error}` as string}</h4>;

  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        padding="1rem"
        alignItems="center"
        justifyContent="center"
      >
        <IconButton
          isRound={true}
          variant="ghost"
          colorScheme="purple"
          aria-label="Favorite"
          icon={<FaArrowLeft color="white" />}
          onClick={() => navigate(-1)}
          mr="3%"
        />
        {data && <PictureCard {...data} />}
      </Box>
    </>
  );
}
