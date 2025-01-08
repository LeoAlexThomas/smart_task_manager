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
import { CreateTaskInterface } from "@/types/task";
import dayjs from "dayjs";
import { useApi } from "@/hook/useApi";
import api from "./api";
import { PrimaryButton } from "@/components/Buttons";

const defaultTaskValues: CreateTaskInterface = {
  title: "",
  description: "",
  endDate: "",
  location: "",
  priorityLevel: "",
  projectId: "",
};

const CreateTaskModel = ({
  isOpen,
  onClose,
  projectId,
}: {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}) => {
  const { makeApiCall } = useApi();

  const handleSubmit = (values: CreateTaskInterface) => {
    const requestObj: CreateTaskInterface = {
      ...values,
      endDate: dayjs(values.endDate).toISOString(),
    };
    makeApiCall({
      apiFn: () =>
        api("/task/create/", {
          method: "POST",
          data: requestObj,
        }),
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TaskForm
            formId={createTaskFormId}
            onSubmit={handleSubmit}
            defaultValues={{ ...defaultTaskValues, projectId: projectId }}
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
            form={createTaskFormId}
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
