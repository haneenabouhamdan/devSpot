import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface CustomModalProps extends Omit<ModalProps, "children"> {
  title: string;
  onSave: () => void;
  children: ReactNode;
  size: string;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title,
  size,
  onSave,
  children,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={size}>
      <ModalOverlay className="bg-light-gray"/>
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onSave}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
