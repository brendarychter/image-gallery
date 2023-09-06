import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

export default function Dialog() {
  const { isOpen, onClose } = useDisclosure()
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Borrar imagen de mis favoritos</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            ¿Desea borrar la imagen?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='purple.700' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='red'>Borrar imagen</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}