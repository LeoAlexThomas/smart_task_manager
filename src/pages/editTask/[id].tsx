import Layout from "@/components/Layout";
import { CreateTaskInterface, TaskInterface } from "@/types/task";
import dayjs from "dayjs";
import Head from "next/head";
import { useRouter } from "next/router";
import TaskForm from "@/components/task/TaskForm";
import { useApi } from "@/hook/useApi";
import useCustomToast, { ToastStatusEnum } from "@/hook/useCustomToast";
import WithLoader from "@/components/WithLoader";
import api from "@/components/api";
import { ApiSuccessResponse } from "@/types/common";
import { editTaskFormId } from "@/components/utils";

const EditTask = () => {
  const router = useRouter();
  // const { getTaskById, editTask } = useFirebaseDBActions();
  const { makeApiCall } = useApi();
  const { showToast } = useCustomToast();
  const queryTaskId = String(router.query.id ?? "");

  const onSubmit = (values: CreateTaskInterface, taskId: string) => {
    makeApiCall<ApiSuccessResponse<{}>>({
      apiFn: () =>
        api(`/task/update/${taskId}`, {
          method: "PUT",
          data: values,
        }),
      onSuccess: (res: ApiSuccessResponse<{}>) => {
        if (res.isSuccess) {
          showToast({
            title: res.message,
            status: ToastStatusEnum.success,
          });
          router.push("/");
          return;
        }
        showToast({
          title: res.message,
          status: ToastStatusEnum.error,
        });
      },
      onFailure: (err: any) => {
        showToast({
          title: err?.response?.data?.message ?? "Something went wrong",
          status: ToastStatusEnum.error,
        });
      },
    });
  };

  return (
    <>
      <Head>
        <title>Edit Task</title>
      </Head>
      <Layout>
        <WithLoader apiUrl={queryTaskId ? `/task/${queryTaskId}` : ""}>
          {({ data }: { data: TaskInterface }) => {
            return (
              <TaskForm
                formId={editTaskFormId}
                defaultValues={{
                  projectId: data.projectId,
                  title: data.title,
                  description: data.description,
                  endDate: dayjs(data.endDate).format("YYYY-MM-DD"),
                  priorityLevel: data.priorityLevel,
                  status: data.status,
                }}
                onSubmit={(val) => onSubmit(val, data._id)}
              />
            );
          }}
        </WithLoader>
      </Layout>
    </>
  );
};

export default EditTask;
