import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from '@chakra-ui/react';
import { PictureGrid } from '@/components';
import { getPictures } from '@/api';
import { usePictureContext } from '@/context/PictureContext';

export default function Gallery() {
  const { favoriteIdsSet } = usePictureContext();
  const { isLoading, isError, error, data, hasNextPage, fetchNextPage } =
    useInfiniteQuery(
      ['pictures'],
      ({ pageParam = 1 }) => getPictures(pageParam, favoriteIdsSet),
      {
        getNextPageParam: (lastPage, allPages) => {
          const nextPage =
            lastPage.length === 10 ? allPages.length + 1 : undefined;
          return nextPage;
        }
      }
    );

  if (isLoading) {
    return <Spinner />;
  }

  // TODO: error component
  if (isError) return <h4>{`${error}` as string}</h4>;

  const pictures = data?.pages.reduce((prev, page) => {
    return [...prev, ...page];
  }, []);

  return (
    <>
      <InfiniteScroll
        dataLength={pictures ? pictures.length : 0}
        next={() => fetchNextPage()}
        hasMore={!!hasNextPage}
        loader={<Spinner />}
      >
        {pictures && pictures.length > 0 ? (
          <PictureGrid pictures={pictures} />
        ) : (
          <div>no hay imagenes para mostrar, probar mas tarde</div>
        )}
      </InfiniteScroll>
    </>
  );
}
