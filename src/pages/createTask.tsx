import Layout from "@/components/Layout";
import { CreateTaskInterface } from "@/components/types/task";
import { isArray, isNil } from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TaskForm from "@/components/TaskForm";

const defaultTaskValues: CreateTaskInterface = {
  title: "",
  description: "",
  endDate: "",
  location: "",
  priorityLevel: "",
};

const CreateTask = () => {
  const router = useRouter();

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

  const onSubmit = (values: CreateTaskInterface) => {
    console.log("onSubmit: ", values);
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
