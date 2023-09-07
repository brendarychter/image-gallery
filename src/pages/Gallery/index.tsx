import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner, Heading } from '@chakra-ui/react';
import { PictureGrid } from '@/components';
import { getPictures } from '@/api';
import { usePictureContext } from '@/context/PictureContext';

export default function Gallery() {
  const { favorites } = usePictureContext();
  const queryClient = useQueryClient();

  const { isLoading, isError, error, data, hasNextPage, fetchNextPage } =
    useInfiniteQuery(
      ['pics'],
      ({ pageParam = 1 }) => getPictures(pageParam),
      {
        getNextPageParam: (lastPage, allPages) => {
          const nextPage =
            lastPage.length === 10 ? allPages.length + 1 : undefined;
          return nextPage;
        }
      }
    );

    console.log(data)
  if (data) {
    queryClient.setQueryData(['pics'], (prevData: any) => ({
      ...prevData,
      pages: data.pages.map((page) =>
        page.map((todo) =>
          favorites.some((favorite) => favorite.id === todo.id)
            ? { ...todo, favorite: true }
            : todo
        )
      )
    }));
  }

  const pictures = data?.pages.reduce((prev, page) => {
    return [...prev, ...page];
  }, []);

  if (isLoading) {
    return <Spinner m="20px"/>;
  }

  if (isError) return <Heading size="sm">{`${error}` as string}</Heading>;


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
