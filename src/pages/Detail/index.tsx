import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { getPicture } from '@/api';
import { PictureCard } from '@/components';
import { Box, IconButton, Spinner } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, error, isLoading, isError } = useQuery(['imageInfo', id], () =>
    getPicture(Number(id))
  );

  console.log(data)
  if (isLoading) {
    return <Spinner/>;
  }

  if (isError) return <h4>{`${error}` as string}</h4>;

  return (
    <>
      <Box display="flex" flexDirection="row" justifyContent="space-evenly">
        <IconButton
          isRound={true}
          variant="ghost"
          colorScheme="purple"
          aria-label="Favorite"
          icon={<FaArrowLeft color="white" />}
          onClick={() => navigate(-1)}
        />
        <PictureCard key={id} {...data} />
      </Box>
    </>
  );
}
