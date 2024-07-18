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
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface CustomModalProps extends Omit<ModalProps, 'children'> {
  title: string;
  onSave: () => void;
  children: ReactNode;
  size?: string;
  loading: boolean;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  onSave,
  children,
  loading,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={size}>
        <ModalOverlay />
        <ModalContent bgColor={'white'}>
          <ModalHeader bgColor={'orange.500'} color={'white'}>
            {title}
          </ModalHeader>
          <ModalCloseButton color={'white'} />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button
              bgColor="orange.500"
              isLoading={loading}
              _hover={{ backgroundColor: '#f7ba8a' }}
              color="white"
              mr={3}
              type="submit"
            >
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </form>
  );
};
