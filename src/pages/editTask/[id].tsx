import Layout from "@/components/Layout";
import { CreateTaskInterface, TaskInterface } from "@/components/types/task";
import { dummyTaskList } from "@/components/utils";
import dayjs from "dayjs";
import { isArray, isNil } from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TaskForm from "@/components/TaskForm";

const EditTask = () => {
  const router = useRouter();
  const [selectedTask, setSelectedTask] = useState<TaskInterface | undefined>();
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const queryTaskId = router.query.id;
    if (isNil(queryTaskId)) {
      return;
    }
    const selectedQueryTaskId = isArray(queryTaskId)
      ? queryTaskId[0]
      : queryTaskId;

    const querySelectedTask = dummyTaskList.find(
      (task) => task.id.toString() === selectedQueryTaskId
    );
    if (isNil(querySelectedTask)) {
      router.replace("/createTask/");
      return;
    }
    setSelectedTask(querySelectedTask);
  }, [router.isReady]);

  const onSubmit = (values: CreateTaskInterface) => {
    console.log("onSubmit: ", values);
  };

  return (
    <>
      <Head>
        <title>Edit Task</title>
      </Head>
      <Layout pageTitle="Edit Task">
        <TaskForm
          defaultValues={
            isNil(selectedTask)
              ? undefined
              : {
                  title: selectedTask.title,
                  description: selectedTask.description,
                  endDate: dayjs(selectedTask.endDate).format("YYYY-MM-DD"),
                  location: selectedTask.location,
                  priorityLevel: selectedTask.priorityLevel,
                }
          }
          onSubmit={onSubmit}
        />
      </Layout>
    </>
  );
};

export default EditTask;
