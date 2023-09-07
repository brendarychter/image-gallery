import { Picture } from '@/types';

const isFavorite = (set: Set<string>, id: string) => {
  return set && set.has(id) ? true : false;
};

const getThumbnail = (id: string) => `https://picsum.photos/id/${id}/300/200?random=${id}`

export const getPictures = (
  pageParam: number,
  set: Set<string>
): Promise<Picture[]> =>
  fetch(`https://picsum.photos/v2/list/?limit=10&page=${pageParam}`).then(
    (res) =>
      res.json().then((data) => {
        return data.map((picture: Picture) => {
          const { id } = picture;
          picture.thumbnail = getThumbnail(id);
          picture.favorite = isFavorite(set, id);
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
