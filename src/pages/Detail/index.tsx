import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { getPicture } from '@/api';
import { PictureCard } from '@/components';
import { Box, IconButton, Spinner } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { ViewType } from '@/types';
import { usePictureContext } from '@/context/PictureContext';

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favoriteIdsSet } = usePictureContext();

  const { data, error, isLoading, isError } = useQuery(['imageInfo', id], () =>
    getPicture(Number(id), favoriteIdsSet)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) return <h4>{`${error}` as string}</h4>;

  return (
    <>
      <Box display="flex" flexDirection="row">
        <IconButton
          isRound={true}
          variant="ghost"
          colorScheme="purple"
          aria-label="Favorite"
          icon={<FaArrowLeft color="white" />}
          onClick={() => navigate(-1)}
        />
        {data && <PictureCard picture={data} view={ViewType.DETAIL} />}
      </Box>
    </>
  );
}
