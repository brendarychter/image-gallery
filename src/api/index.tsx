import { Picture } from '@/types';

const getThumbnail = (id: string) => `https://picsum.photos/id/${id}/300/200?random=${id}`

export const getPictures = (
  pageParam: number,
): Promise<Picture[]> =>
  fetch(`https://picsum.photos/v2/list/?limit=10&page=${pageParam}`).then(
    (res) =>
      res.json().then((data) => {
        return data.map((picture: Picture) => {
          const { id } = picture;
          picture.thumbnail = getThumbnail(id);
          picture.favorite = false;
          return picture;
        });
      })
  );

export const getPicture = (id: number): Promise<Picture> =>
  fetch(`https://picsum.photos/id/${id}/info`).then((res) =>
    res.json().then((picture: Picture) => {
      return {
        ...picture,
        thumbnail: getThumbnail(picture.id),
      };
    })
  );
