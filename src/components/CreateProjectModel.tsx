import { CreateProjectInterface } from "@/types/project";
import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import InputField from "./form/InputField";
import { colors, createProjectFormId } from "./utils";
import CustomReactAsyncSelectField from "./form/CustomReactAsyncSelectField";
import api from "./api";
import { UserInterface } from "@/types/user";
import { useApi } from "@/hook/useApi";
import { ApiSuccessResponse } from "@/types/common";
import isArray from "lodash/isArray";

const CreateProjectModel = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { makeApiCall } = useApi();
  const projectForm = useForm<CreateProjectInterface>({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      memberIds: [],
    },
  });

  const onSubmit = (values: CreateProjectInterface) => {
    const requestObj = {
      ...values,
      title: values.title.trim(),
      members: values.memberIds.map((member) => member.value),
    };
    makeApiCall<ApiSuccessResponse<{}>>({
      apiFn: () => api(`/project/create`, { method: "POST", data: requestObj }),
      successMsg: {
        title: "Project created successfully",
      },
      onSuccess: (res) => {
        handleModalClose();
      },
    });
  };

  const handleModalClose = () => {
    projectForm.reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose} isCentered size="lg">
      <ModalContent>
        <ModalHeader>Create Project</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form
            id={createProjectFormId}
            style={{
              width: "100%",
            }}
            onSubmit={projectForm.handleSubmit(onSubmit)}
          >
            <VStack alignItems="stretch">
              <InputField
                hForm={projectForm}
                name="title"
                title="Title"
                rules={{ required: true }}
              />
              <InputField
                hForm={projectForm}
                name="description"
                title="Description"
                rules={{ required: true }}
              />
              <CustomReactAsyncSelectField
                hForm={projectForm}
                name="memberIds"
                title="Members"
                isMultiChoice
                rules={{ required: false }}
                getOptions={(value) =>
                  api(`/user/all?searchText=${value}`).then(
                    (values: UserInterface[]) => {
                      if (!isArray(values)) {
                        return [];
                      }
                      console.log("Searching... ", values);
                      return values.map((user) => ({
                        label: user.name,
                        value: user._id,
                      }));
                    }
                  )
                }
              />
            </VStack>
          </form>
        </ModalBody>
        <ModalFooter>
          <HStack spacing={2}>
            <Button onClick={onClose}>Close</Button>
            <Button
              form={createProjectFormId}
              type="submit"
              backgroundColor={colors.secondaryColor[3]}
              color="white"
            >
              Create
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateProjectModel;
