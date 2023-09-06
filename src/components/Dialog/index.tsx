import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from '@chakra-ui/react';
import { useDialogContext } from '@/context/DialogContext';

export default function Dialog() {
  const { toggleDialog, isDialogOpen, executeAction, pictureId } = useDialogContext();

  return (
    <>
      <Modal isOpen={isDialogOpen} onClose={(toggleDialog)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Borrar imagen de mis favoritos</ModalHeader>
          <ModalCloseButton />
          <ModalBody>¿Desea continuar?</ModalBody>
          <ModalFooter>
            <Button color="white" mr={3} onClick={() => toggleDialog()}>
              Cerrar
            </Button>
            <Button colorScheme="red" onClick={() => executeAction(pictureId)}>
              Borrar imagen
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
