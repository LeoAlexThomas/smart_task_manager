import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalFooterProps,
  ModalHeader,
  ModalHeaderProps,
  ModalProps,
} from "@chakra-ui/react";

const CustomModel = ({
  isOpen,
  onClose,
  title,
  modalTitleProps,
  children,
  footer,
  modalFooterProps,
  ...props
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  modalTitleProps?: ModalHeaderProps;
  footer: React.ReactNode;
  modalFooterProps?: ModalFooterProps;
} & ModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg" {...props}>
      <ModalContent>
        <ModalHeader {...modalTitleProps}>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody bg="blue.50">{children}</ModalBody>
        <ModalFooter py={2} pr={4} {...modalFooterProps}>
          {footer}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModel;
