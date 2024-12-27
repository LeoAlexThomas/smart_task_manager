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

const CreateProjectModel = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const projectForm = useForm<CreateProjectInterface>({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      members: [],
    },
  });

  const onSubmit = (values: CreateProjectInterface) => {
    console.log("Project form: ", values);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
                name="members"
                isMultiChoice
                rules={{ required: true }}
                getOptions={(value) =>
                  api(`/user/all?searchText=${value}`).then(
                    (values: UserInterface[]) =>
                      values.map((user) => ({
                        label: user.name,
                        value: user.id,
                      }))
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
