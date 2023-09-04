import PictureCard from '@/components/PictureCard';
import { Picture } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SimpleGrid, Spinner } from '@chakra-ui/react';

export default function Gallery() {
  const getPictures = (pageParam: number): Promise<Picture[]> =>
    fetch(`https://picsum.photos/v2/list/?limit=10&page=${pageParam}`).then(
      (res) => res.json()
    );

  const { isLoading, isError, error, data, hasNextPage, fetchNextPage } =
    useInfiniteQuery(
      ['pictures'],
      ({ pageParam = 1 }) => getPictures(pageParam),
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
        <SimpleGrid minChildWidth="200px" spacing="30px" padding="20px">
          {pictures &&
            pictures.map((picture: Picture) => (
              <PictureCard key={picture.id} {...picture} />
            ))}
        </SimpleGrid>
      </InfiniteScroll>
    </>
  );
}
