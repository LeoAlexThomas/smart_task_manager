import Layout from "@/components/Layout";
import { CreateTaskInterface, TaskInterface } from "@/components/types/task";
import dayjs from "dayjs";
import Head from "next/head";
import { useRouter } from "next/router";
import TaskForm from "@/components/TaskForm";
import { useApi } from "@/components/hook/useApi";
import useCustomToast, {
  ToastStatusEnum,
} from "@/components/hook/useCustomToast";
import WithLoader from "@/components/WithLoader";
import api from "@/components/api";
import { ApiSuccessResponse } from "@/components/types/common";

const EditTask = () => {
  const router = useRouter();
  // const { getTaskById, editTask } = useFirebaseDBActions();
  const { makeApiCall } = useApi();
  const { showToast } = useCustomToast();
  const queryTaskId = String(router.query.id ?? "");

  const onSubmit = (values: CreateTaskInterface, taskId: string) => {
    makeApiCall<ApiSuccessResponse<{}>>({
      apiFn: () =>
        api(`/updateTask/${taskId}`, {
          method: "PUT",
          data: values,
        }),
      onSuccess: (res) => {
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
          title: err.message ?? "Something went wrong",
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
      <Layout pageTitle="Edit Task">
        <WithLoader apiUrl={queryTaskId ? `/getTask/${queryTaskId}` : ""}>
          {({ data }: { data: TaskInterface }) => {
            return (
              <TaskForm
                defaultValues={{
                  title: data.title,
                  description: data.description,
                  endDate: dayjs(data.endDate).format("YYYY-MM-DD"),
                  location: data.location,
                  priorityLevel: data.priorityLevel,
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
