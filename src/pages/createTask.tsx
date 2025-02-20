import Layout from "@/components/Layout";
import { CreateTaskInterface, TaskStatusEnum } from "@/types/task";
import { isArray, isNil } from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TaskForm from "@/components/task/TaskForm";
import useCustomToast, { ToastStatusEnum } from "@/hook/useCustomToast";
import { useApi } from "@/hook/useApi";
import api from "@/components/api";
import { createTaskFormId } from "@/components/utils";

const defaultTaskValues: CreateTaskInterface = {
  projectId: "",
  title: "",
  description: "",
  endDate: "",
  priorityLevel: "",
  status: TaskStatusEnum.initial,
};

const CreateTask = () => {
  const router = useRouter();
  const { makeApiCall } = useApi();
  const { showToast } = useCustomToast();
  // const { addTask } = useFirebaseDBActions();
  const [title, setTitle] = useState<string | undefined>();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const queryTitle = router.query.title;
    if (isNil(queryTitle)) {
      return;
    }
    setTitle(isArray(queryTitle) ? queryTitle[0] : queryTitle);
  }, [router.isReady]);

  const onSubmit = async (values: CreateTaskInterface) => {
    makeApiCall({
      apiFn: () =>
        api("/task/create", {
          method: "POST",
          data: { ...values, isCompleted: false },
        }),
      onSuccess: (res: any) => {
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
        <title>Create Task</title>
      </Head>
      <Layout>
        <TaskForm
          formId={createTaskFormId}
          defaultValues={{ ...defaultTaskValues, title: title ?? "" }}
          onSubmit={onSubmit}
        />
      </Layout>
    </>
  );
};

export default CreateTask;
