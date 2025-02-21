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
import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import { colors } from "./utils";

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
        <ModalBody bg={colors.secondaryColor[0]}>
          <Text
            fontSize={["16px", null, "20px"]}
            lineHeight="1.25"
            pb="90px"
            color="white"
          >
            {message}
          </Text>
        </ModalBody>

        <ModalFooter>
          <HStack>
            <PrimaryButton
              bgColor="#ff5b5b"
              color="white"
              onClick={onYes}
              _hover={{
                bgColor: "#ef5b5b",
                borderColor: "#ff5b5b",
              }}
              size="md"
            >
              Delete
            </PrimaryButton>
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
