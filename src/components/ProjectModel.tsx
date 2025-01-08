import { CreateProjectInterface } from "@/types/project";
import { HStack, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import InputField from "./form/InputField";
import { colors, createProjectFormId } from "./utils";
import CustomReactAsyncSelectField from "./form/CustomReactAsyncSelectField";
import api from "./api";
import { UserInterface } from "@/types/user";
import { useApi } from "@/hook/useApi";
import { ApiSuccessResponse } from "@/types/common";
import isArray from "lodash/isArray";
import CustomModel from "./CustomModal";
import { useEffect } from "react";
import isNil from "lodash/isNil";
import { PrimaryButton, SecondaryButton } from "./Buttons";

const ProjectModel = ({
  isOpen,
  onClose,
  title,
  projectId,
  defaultValues,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  projectId?: string;
  defaultValues?: CreateProjectInterface;
  onSuccess?: () => void;
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

  useEffect(() => {
    if (!defaultValues) {
      return;
    }
    projectForm.reset(defaultValues);
  }, [defaultValues]);

  const onSubmit = (values: CreateProjectInterface) => {
    const requestObj = {
      ...values,
      title: values.title.trim(),
      members: values.memberIds.map((member) => member.value),
    };
    if (isNil(projectId)) {
      makeApiCall<ApiSuccessResponse<{}>>({
        apiFn: () =>
          api(`/project/create`, { method: "POST", data: requestObj }),
        successMsg: {
          title: "Project created successfully",
        },
        onSuccess: (res) => {
          onSuccess?.();
          handleModalClose();
        },
      });
      return;
    }
    makeApiCall<ApiSuccessResponse<{}>>({
      apiFn: () =>
        api(`/project/update/${projectId}`, {
          method: "PUT",
          data: requestObj,
        }),
      successMsg: {
        title: "Project updated successfully",
      },
      onSuccess: (res) => {
        onSuccess?.();
        handleModalClose();
      },
    });
  };

  const handleModalClose = () => {
    projectForm.reset();
    onClose();
  };
  return (
    <CustomModel
      isOpen={isOpen}
      onClose={handleModalClose}
      title={title}
      footer={
        <HStack spacing={2}>
          <SecondaryButton onClick={onClose}>Close</SecondaryButton>
          <PrimaryButton
            form={createProjectFormId}
            type="submit"
            backgroundColor={colors.secondaryColor[3]}
            color="white"
          >
            {isNil(projectId) ? "Create" : "Update"}
          </PrimaryButton>
        </HStack>
      }
    >
      <form
        id={createProjectFormId}
        style={{
          width: "100%",
        }}
        onSubmit={projectForm.handleSubmit(onSubmit)}
      >
        <VStack alignItems="stretch" pb={4}>
          <InputField
            hForm={projectForm}
            name="title"
            title="Title"
            rules={{ required: true }}
            placeholder="Enter project title"
          />
          <InputField
            hForm={projectForm}
            name="description"
            title="Description"
            rules={{ required: true }}
            placeholder="Enter project description"
          />
          <CustomReactAsyncSelectField
            hForm={projectForm}
            name="memberIds"
            title="Members"
            placeholder="Select members for project"
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
                    label: `${user.name} (${user.email})`,
                    value: user._id,
                  }));
                }
              )
            }
          />
        </VStack>
      </form>
    </CustomModel>
  );
};

export default ProjectModel;
