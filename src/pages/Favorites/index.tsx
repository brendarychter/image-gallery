import { PictureGrid } from '@/components';
import { usePictureContext } from '@/context/PictureContext';

export default function Favorites() {
  const { pictures } = usePictureContext();

  return (
    <>
      {pictures.length > 0 ? (
        <PictureGrid pictures={pictures} />
      ) : (
        <div>
          no hay imagenes para mostrar, probar mas tarde. ir a gallery para
          agregar
        </div>
      )}
    </>
  );
}
