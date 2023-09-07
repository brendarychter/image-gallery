import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { getPicture } from '@/api';
import { PictureCard } from '@/components';
import { Box, IconButton, Spinner, Heading } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { usePictureContext } from '@/context/PictureContext';

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites } = usePictureContext();
  const queryClient = useQueryClient();

  const { data, error, isLoading, isError } = useQuery(
    ['detail', id],
    () => getPicture(Number(id)),
    {
      enabled: false
    }
  );

  const favorite = favorites.some((picture) => picture.id === data?.id);
  queryClient.setQueryData(['detail', id], { ...data, favorite });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) return <Heading size="sm">{`${error}` as string}</Heading>;

  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        padding="1rem"
        alignItems="flex-start"
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
