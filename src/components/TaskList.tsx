import { SimpleGrid } from "@chakra-ui/react";
import { Fragment } from "react";
import TaskCard from "./TaskCard";
import { TaskInterface } from "@/types/task";
import { KeyedMutator } from "swr";
import useCustomToast, { ToastStatusEnum } from "@/hook/useCustomToast";
import { useApi } from "@/hook/useApi";
import { ApiSuccessResponse } from "@/types/common";
import api from "./api";
import dayjs from "dayjs";

const TaskList = ({
  tasks,
  taskListMutate,
}: {
  tasks: TaskInterface[];
  taskListMutate: KeyedMutator<TaskInterface[]>;
}) => {
  const { makeApiCall } = useApi();
  const { showToast } = useCustomToast();

  const handleDeleteTask = (taskId: string) => {
    taskListMutate(
      tasks.filter((task) => task._id !== taskId),
      { revalidate: false }
    );
    makeApiCall<ApiSuccessResponse<{}>>({
      apiFn: () =>
        api(`/deleteTask/${taskId}`, {
          method: "DELETE",
        }),
      onSuccess: (res) => {
        taskListMutate();
        showToast({
          title: res.message,
          status: ToastStatusEnum.success,
        });
      },
      onFailure: (err: any) => {
        taskListMutate();
        showToast({
          title: err.message ?? "Something went wrong",
          status: ToastStatusEnum.error,
        });
      },
    });
  };

  const handleUpdateTask = (
    updatableTask: TaskInterface,
    isCompleted: boolean
  ) => {
    const requestObj: TaskInterface = {
      ...updatableTask,
      isCompleted,
      completedDate: isCompleted ? dayjs().toISOString() : null,
    };
    taskListMutate(
      tasks.map((task) => {
        if (task._id !== updatableTask._id) {
          return task;
        }
        return requestObj;
      }),
      { revalidate: false }
    );

    makeApiCall({
      apiFn: () =>
        api(`/updateTask/${updatableTask._id}`, {
          method: "PUT",
          data: requestObj,
        }),
      showLoader: false,
      onSuccess: (res: any) => {
        showToast({
          title: res.message,
          status: ToastStatusEnum.success,
        });
        taskListMutate();
      },
      onFailure: (err: any) => {
        taskListMutate();
        showToast({
          title: err.message ?? "Something went wrong",
          status: ToastStatusEnum.error,
        });
      },
    });
  };

  return (
    <SimpleGrid
      columns={[1, 2, null, null, 3]}
      alignItems="stretch"
      spacing="16px"
    >
      {tasks.map((task) => (
        <Fragment key={task._id}>
          <TaskCard
            task={task}
            onDelete={() => handleDeleteTask(task._id)}
            onUpdate={(isCompleted) => handleUpdateTask(task, isCompleted)}
          />
        </Fragment>
      ))}
    </SimpleGrid>
  );
};

export default TaskList;
