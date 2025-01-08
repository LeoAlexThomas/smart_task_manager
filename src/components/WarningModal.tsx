import {
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import DeleteButton from "@/components/DeleteButton";
import { SecondaryButton } from "@/components/Buttons";

const WarningModal = ({
  isOpen,
  onClose,
  onYes,
  message,
}: {
  isOpen: boolean;
  onClose: () => void;
  onYes: () => void;
  message: string;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={["xs", "md", "xl", "3xl"]}
      isCentered
    >
      <ModalOverlay />
      <ModalContent mx={4}>
        <ModalHeader>Confirmation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="16px" lineHeight="1.25" mb={8}>
            {message}
          </Text>
        </ModalBody>

        <ModalFooter>
          <HStack>
            <DeleteButton
              bgColor="#ff5b5b"
              color="white"
              onClick={onYes}
              _hover={{
                bgColor: "#ff5b5b90",
              }}
              size="md"
            >
              Delete
            </DeleteButton>
            <SecondaryButton size="md" onClick={onClose}>
              Cancel
            </SecondaryButton>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default WarningModal;
