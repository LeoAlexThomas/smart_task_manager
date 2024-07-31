import EmptyTask from "@/components/EmptyTask";
import ImageWithText from "@/components/ImageWithText";
import Layout from "@/components/Layout";
import PrimaryButton from "@/components/PrimaryButton";
import { TaskInterface } from "@/components/types/task";
import {
  dummyTaskList,
  getPriorityColor,
  getTaskPriorityLabel,
} from "@/components/utils";
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
import { isArray, isNil } from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import { Edit } from "@emotion-icons/boxicons-solid/Edit";
import { DeleteOutline } from "@emotion-icons/material/DeleteOutline";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";
import WarningModal from "@/components/WarningModal";

const TaskDetails = () => {
  const router = useRouter();
  const queryTaskId = router.query.id;
  const isTablet = useBreakpointValue({ base: true, md: false });
  const { isOpen, onClose, onOpen } = useDisclosure();
  const task: TaskInterface | null | undefined = isNil(queryTaskId)
    ? null
    : dummyTaskList.find((task) =>
        isArray(queryTaskId)
          ? task.id.toString() === queryTaskId[0]
          : task.id.toString() === queryTaskId
      );

  const handleDelete = () => {
    console.log("Delete api called");
    onClose();
  };

  return (
    <>
      <Head>
        <title>Task Details</title>
      </Head>
      <Layout pageTitle="Task Details">
        <>
          <WarningModal
            isOpen={isOpen}
            onClose={onClose}
            onYes={handleDelete}
            message={`Are you sure to delete ${task?.title ?? "this task"}?`}
          />
          {isNil(task) ? (
            <EmptyTask />
          ) : (
            <VStack alignItems="stretch" spacing={4}>
              <HStack
                alignItems={["flex-start", null, "center"]}
                justifyContent="space-between"
              >
                <Text
                  fontSize={["24px", null, "28px"]}
                  fontWeight={500}
                  lineHeight="1.2"
                >
                  {task.title}
                </Text>
                <Switch
                  size={["md", null, "lg"]}
                  isChecked={task.isCompleted}
                  colorScheme="green"
                  onChange={(e) => console.log(e.target.checked)}
                />
              </HStack>
              <Box w="100%">
                <ContentHeader header="Description" />

                <Text
                  fontSize={["16px", null, "18px"]}
                  lineHeight={1.2}
                  color="#00000080"
                  pt={[2, null, 2]}
                >
                  {task.description}
                </Text>
              </Box>
              <ImageWithText
                imageSrc="/images/calendar.svg"
                text={dayjs(task.endDate).format("DD MMM YYYY")}
              />
              <Text
                fontSize={["12px", null, "16px"]}
                lineHeight="1.2"
                color={getPriorityColor(task.priorityLevel)}
                fontWeight={700}
              >
                {getTaskPriorityLabel(task.priorityLevel)} Priority
              </Text>
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
                      <Edit size={isTablet ? "20px" : "25px"} color="white" />
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
                  maxW={["100%", null, "200px"]}
                  onClick={onOpen}
                >
                  Delete
                </DeleteButton>
              </Stack>
            </VStack>
          )}
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
