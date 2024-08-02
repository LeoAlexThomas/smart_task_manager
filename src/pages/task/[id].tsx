import EmptyTask from "@/components/EmptyTask";
import ImageWithText from "@/components/ImageWithText";
import Layout from "@/components/Layout";
import PrimaryButton from "@/components/PrimaryButton";
import { TaskInterface } from "@/components/types/task";
import { getPriorityColor, getTaskPriorityLabel } from "@/components/utils";
import {
  VStack,
  Text,
  Box,
  HStack,
  Switch,
  useBreakpointValue,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import Head from "next/head";
import { useRouter } from "next/router";
import { Edit } from "@emotion-icons/boxicons-solid/Edit";
import { DeleteOutline } from "@emotion-icons/material/DeleteOutline";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";
import WarningModal from "@/components/WarningModal";
import WithLoader from "@/components/WithLoader";
import useFirebaseDBActions from "@/components/service/firebaseDBService";
import { ErrorResponse } from "@/components/types/common";
import ErrorMsg from "@/components/ErrorMsg";
import useCustomToast, {
  ToastStatusEnum,
} from "@/components/hook/useCustomToast";
import useApi from "@/components/hook/useApi";

const TaskDetails = () => {
  const router = useRouter();
  const queryTaskId = String(router.query.id ?? "");
  const { showToast } = useCustomToast();
  const { makeApiCall } = useApi();
  const { getTaskById, deleteTask, updateTaskStatus } = useFirebaseDBActions();
  const isTablet = useBreakpointValue({ base: true, md: false });
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleDelete = (taskId: string) => {
    makeApiCall({
      apiFn: () => deleteTask(taskId),
      onSuccess: (res) => {
        onClose();
        if (res.isSuccess) {
          showToast({
            title: res.message,
            status: ToastStatusEnum.success,
          });
          router.replace("/");
          return;
        }
        showToast({ title: res.message, status: ToastStatusEnum.error });
      },
      onFailure: (err) => {
        showToast({
          title: err.message ?? "Something went wrong",
          status: ToastStatusEnum.error,
        });
      },
    });
  };

  const handleTaskStatus = (task: TaskInterface, isCompleted: boolean) => {
    makeApiCall({
      apiFn: () =>
        updateTaskStatus(task.id, {
          ...task,
          isCompleted,
          completedDate: isCompleted ? dayjs().toISOString() : null,
        }),
      onSuccess: (res) => {
        if (res.isSuccess) {
          showToast({
            title: res.message,
            status: ToastStatusEnum.success,
          });
          return;
        }
        showToast({ title: res.message, status: ToastStatusEnum.error });
      },
      onFailure: (err) => {
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
        <title>Task Details</title>
      </Head>
      <Layout pageTitle="Task Details">
        <>
          <WithLoader
            apiFn={() => getTaskById(queryTaskId ?? "")}
            customError={({ err }: { err: ErrorResponse }) => {
              if (err.message === "Task not found") {
                return <EmptyTask />;
              }
              return <ErrorMsg text={err.message} />;
            }}
            updateLatestData={(val) => {
              const task = val.find(
                (task: TaskInterface) => task.id === queryTaskId
              );
              if (!task) {
                return val;
              }
              return task;
            }}
          >
            {({ data: task }: { data: TaskInterface }) => {
              return (
                <>
                  <WarningModal
                    isOpen={isOpen}
                    onClose={onClose}
                    onYes={() => handleDelete(task.id)}
                    message={`Are you sure to delete ${
                      task?.title ?? "this task"
                    }?`}
                  />
                  <VStack alignItems="stretch" spacing={[6, null, 10]}>
                    <HStack
                      alignItems={["flex-start", null, "center"]}
                      justifyContent="space-between"
                    >
                      <Text
                        fontSize={["24px", null, "32px"]}
                        fontWeight={500}
                        lineHeight="1.2"
                      >
                        {task.title}
                      </Text>
                      <Switch
                        size={["md", null, "lg"]}
                        isChecked={task.isCompleted}
                        colorScheme="green"
                        onChange={(e) =>
                          handleTaskStatus(task, e.target.checked)
                        }
                      />
                    </HStack>
                    <Box w="100%">
                      <ContentHeader header="Description" />

                      <Text
                        fontSize={["16px", null, "18px"]}
                        lineHeight={1.2}
                        color="#00000080"
                        pt={[2, null, 4]}
                      >
                        {task.description}
                      </Text>
                    </Box>
                    <Text
                      fontSize={["16px", null, "20px"]}
                      lineHeight="1.2"
                      color={getPriorityColor(task.priorityLevel)}
                      fontWeight={700}
                    >
                      {getTaskPriorityLabel(task.priorityLevel)} Priority
                    </Text>
                    <ImageWithText
                      imageSrc="/images/calendar.svg"
                      text={dayjs(task.endDate).format("DD MMM YYYY")}
                    />
                    <ImageWithText
                      imageSrc="/images/locationGif.gif"
                      text={task.location}
                    />
                    <Stack
                      direction={["column", "row"]}
                      alignSelf={["stretch", "flex-end"]}
                    >
                      <Link
                        href={`/editTask/${task.id}`}
                        passHref
                        style={{
                          width: isTablet ? "100%" : "200px",
                        }}
                      >
                        <PrimaryButton
                          leftIcon={
                            <Edit
                              size={isTablet ? "20px" : "25px"}
                              color="white"
                            />
                          }
                          w="100%"
                          maxW={["100%", null, "200px"]}
                        >
                          Edit
                        </PrimaryButton>
                      </Link>
                      <DeleteButton
                        leftIcon={
                          <DeleteOutline
                            size={isTablet ? "20px" : "25px"}
                            color="#ff5b5b"
                          />
                        }
                        w="100%"
                        maxW={["100%", null, "150px"]}
                        onClick={onOpen}
                      >
                        Delete
                      </DeleteButton>
                    </Stack>
                  </VStack>
                </>
              );
            }}
          </WithLoader>
        </>
      </Layout>
    </>
  );
};

const ContentHeader = ({ header }: { header: string }) => {
  return (
    <Text fontSize={["18px", null, "22px"]} fontWeight={500} lineHeight={1.25}>
      {header}
    </Text>
  );
};

export default TaskDetails;
