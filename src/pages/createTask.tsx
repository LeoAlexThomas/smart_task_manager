import Layout from "@/components/Layout";
import { CreateTaskInterface } from "@/components/types/task";
import { isArray, isNil } from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TaskForm from "@/components/TaskForm";
import useCustomToast, {
  ToastStatusEnum,
} from "@/components/hook/useCustomToast";
import { useApi } from "@/components/hook/useApi";
import api from "@/components/api";

const defaultTaskValues: CreateTaskInterface = {
  title: "",
  description: "",
  endDate: "",
  location: "",
  priorityLevel: "",
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
        api("/createTask", {
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
          title: err.message ?? "Something went wrong",
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
      <Layout pageTitle="Add Task">
        <TaskForm
          defaultValues={{ ...defaultTaskValues, title: title ?? "" }}
          onSubmit={onSubmit}
        />
      </Layout>
    </>
  );
};

export default CreateTask;
