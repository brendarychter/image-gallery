import { PictureGrid } from '@/components';
import { usePictureContext } from '@/context/PictureContext';
import { ViewType } from '@/types';

export default function Favorites() {
  const { pictures } = usePictureContext();

  return (
    <>
      {pictures.length > 0 ? (
        <PictureGrid pictures={pictures} view={ViewType.FAVORITES}/>
      ) : (
        <div>
          no hay imagenes para mostrar, probar mas tarde. ir a gallery para
          agregar
        </div>
      )}
    </>
  );
}
