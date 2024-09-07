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
import { ApiSuccessResponse, ErrorResponse } from "@/components/types/common";
import ErrorMsg from "@/components/ErrorMsg";
import useCustomToast, {
  ToastStatusEnum,
} from "@/components/hook/useCustomToast";
import { useApi } from "@/components/hook/useApi";
import WithLoaderSWR from "@/components/WithLoaderSWR";
import api from "@/components/api";
import { KeyedMutator } from "swr";

const TaskDetails = () => {
  const router = useRouter();
  const queryTaskId = String(router.query.id ?? "");
  const { showToast } = useCustomToast();
  const { makeApiCall } = useApi();
  const isTablet = useBreakpointValue({ base: true, md: false });
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleDelete = (taskId: string) => {
    makeApiCall<ApiSuccessResponse<{}>>({
      apiFn: () =>
        api(`/deleteTask/${taskId}`, {
          method: "DELETE",
        }),
      onSuccess: (res: any) => {
        onClose();
        router.replace("/");
        showToast({
          title: res.message,
          status: ToastStatusEnum.success,
        });
      },
      onFailure: (err: any) => {
        onClose();
        showToast({
          title: err.message ?? "Something went wrong",
          status: ToastStatusEnum.error,
        });
      },
    });
  };

  const handleUpdate = (
    updatableTask: TaskInterface,
    isCompleted: boolean,
    mutate: KeyedMutator<TaskInterface>
  ) => {
    const requestObj: TaskInterface = {
      ...updatableTask,
      isCompleted,
      completedDate: isCompleted ? dayjs().toISOString() : null,
    };
    mutate(requestObj, { revalidate: false });
    makeApiCall({
      apiFn: () =>
        api(`/updateTask/${updatableTask._id}`, {
          method: "PUT",
          data: requestObj,
        }),
      onSuccess: (res: any) => {
        mutate();
        showToast({
          title: res.message,
          status: ToastStatusEnum.success,
        });
      },
      onFailure: (err: any) => {
        mutate();
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
          <WithLoaderSWR
            apiUrl={queryTaskId ? `/getTask/${queryTaskId}` : ""}
            customError={({ err }: { err: ErrorResponse }) => {
              if (err.message === "Task not found") {
                return <EmptyTask />;
              }
              return <ErrorMsg text={err.message} />;
            }}
          >
            {({
              data: task,
              mutate,
            }: {
              data: TaskInterface;
              mutate: KeyedMutator<TaskInterface>;
            }) => {
              return (
                <>
                  <WarningModal
                    isOpen={isOpen}
                    onClose={onClose}
                    onYes={() => handleDelete(task._id)}
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
                          handleUpdate(task, e.target.checked, mutate)
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
                        href={`/editTask/${task._id}`}
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
          </WithLoaderSWR>
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
