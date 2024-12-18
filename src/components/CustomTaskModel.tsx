import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import TaskForm from "@/components/TaskForm";
import { createTaskFormId } from "@/components/utils";
import { Save } from "@emotion-icons/fa-regular/Save";
import PrimaryButton from "@/components/PrimaryButton";
import { CreateTaskInterface } from "@/types/task";

const defaultTaskValues: CreateTaskInterface = {
  title: "",
  description: "",
  endDate: "",
  location: "",
  priorityLevel: "",
};

const CreateTaskModel = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TaskForm
            formId={createTaskFormId}
            onSubmit={(newTask) => {
              console.log("Created Tasks: ", newTask);
            }}
            defaultValues={defaultTaskValues}
          />
        </ModalBody>
        <ModalFooter>
          <PrimaryButton
            leftIcon={<Save width="25px" height="25px" color="white" />}
            maxW={["auto", null, "200px"]}
            alignSelf={["stretch", null, "flex-end"]}
            _hover={{
              bgColor: "blue.600",
            }}
            pos={["fixed", null, "relative"]}
            bottom={["85px", null, 0]}
            left={[4, null, 0]}
            right={[4, null, 0]}
            px={4}
            type="submit"
          >
            Save
          </PrimaryButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateTaskModel;
