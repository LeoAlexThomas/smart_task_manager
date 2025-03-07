import TaskForm from "@/components/task/TaskForm";
import { createTaskFormId } from "@/components/utils";
import { Save } from "@emotion-icons/fa-regular/Save";
import { CreateTaskInterface, TaskStatusEnum } from "@/types/task";
import dayjs from "dayjs";
import { useApi } from "@/hook/useApi";
import api from "@/components/api";
import { PrimaryButton } from "@/components/Buttons";
import isNil from "lodash/isNil";
import CustomModel from "@/components/CustomModal";

const defaultValues: CreateTaskInterface = {
  title: "",
  description: "",
  endDate: "",
  priorityLevel: "",
  projectId: "",
  status: TaskStatusEnum.initial,
};

const CustomTaskModel = ({
  isOpen,
  onClose,
  projectId,
  taskId,
  initialTaskStatus = TaskStatusEnum.initial,
  onTaskCreated,
  defaultTaskValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  taskId?: string;
  initialTaskStatus?: TaskStatusEnum;
  onTaskCreated: () => void;
  defaultTaskValues?: CreateTaskInterface;
}) => {
  const { makeApiCall } = useApi();
  const isEditAction = !isNil(defaultTaskValues);

  const handleSubmit = (values: CreateTaskInterface) => {
    const requestObj: CreateTaskInterface = {
      ...values,
      endDate: dayjs(values.endDate).toISOString(),
    };
    makeApiCall({
      apiFn: isEditAction
        ? () =>
            api(isNil(taskId) ? "" : `/task/update/${taskId}`, {
              method: "PUT",
              data: requestObj,
            })
        : () =>
            api("/task/create/", {
              method: "POST",
              data: requestObj,
            }),
      onSuccess: () => {
        onTaskCreated();
        onClose();
      },
    });
  };
  return (
    <CustomModel
      title={isEditAction ? "Edit Task" : "Add Task"}
      footer={
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
      }
      isOpen={isOpen}
      onClose={onClose}
    >
      <TaskForm
        formId={createTaskFormId}
        onSubmit={handleSubmit}
        defaultValues={
          isNil(defaultTaskValues)
            ? {
                ...defaultValues,
                status: initialTaskStatus,
                projectId: projectId,
              }
            : {
                ...defaultTaskValues,
                status: initialTaskStatus,
                projectId: projectId,
              }
        }
      />
    </CustomModel>
  );
};

export default CustomTaskModel;
