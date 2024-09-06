import {
  Box,
  Checkbox,
  HStack,
  Text,
  VStack,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { TaskInterface } from "./types/task";
import { getPriorityColor, getTaskPriorityLabel } from "./utils";
import { Edit } from "@emotion-icons/boxicons-solid/Edit";
import { DeleteOutline } from "@emotion-icons/material/DeleteOutline";
import dayjs from "dayjs";
import Link from "next/link";
import ImageWithText from "./ImageWithText";
import WarningModal from "./WarningModal";
import useFirebaseDBActions from "./service/firebaseDBService";
import useCustomToast, { ToastStatusEnum } from "./hook/useCustomToast";
import { useApi } from "@/components/hook/useApi";

const TaskCard = ({ task }: { task: TaskInterface }) => {
  const isTablet = useBreakpointValue({ base: true, md: false });
  const isTaskCompleted = task.isCompleted;
  const { makeApiCall } = useApi();
  const { showToast } = useCustomToast();
  const { deleteTask, updateTaskStatus } = useFirebaseDBActions();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleDelete = () => {
    makeApiCall({
      apiFn: () => deleteTask(task.id),
      onSuccess: (res: any) => {
        onClose();
        if (res.isSuccess) {
          showToast({
            title: res.message,
            status: ToastStatusEnum.success,
          });
          return;
        }
        showToast({ title: res.message, status: ToastStatusEnum.error });
      },
      onFailure: (err: any) => {
        showToast({
          title: err.message ?? "Something went wrong",
          status: ToastStatusEnum.error,
        });
      },
    });
  };

  const handleTaskStatus = (isCompleted: boolean) => {
    makeApiCall({
      apiFn: () =>
        updateTaskStatus(task.id, {
          ...task,
          isCompleted,
          completedDate: isCompleted ? dayjs().toISOString() : null,
        }),
      onSuccess: (res: any) => {
        if (res.isSuccess) {
          showToast({
            title: res.message,
            status: ToastStatusEnum.success,
          });
          return;
        }
        showToast({ title: res.message, status: ToastStatusEnum.error });
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
    <Box
      boxShadow="0px 0px 2px 1px #00000050"
      borderRadius="12px"
      p={4}
      justifyContent="space-between"
      alignItems="flex-start"
      bgGradient={`linear(to-tr, #e1e1e195, #ffffff)`}
      _hover={{
        boxShadow: "0px 0px 2px 2px #00000050",
      }}
    >
      <WarningModal
        isOpen={isOpen}
        onClose={onClose}
        onYes={handleDelete}
        message={`Are you sure to delete ${task.title}?`}
      />
      <VStack alignItems="stretch" spacing={3}>
        <HStack alignItems="flex-end" justifyContent={["space-between"]}>
          <Link href={`/task/${task.id}/`}>
            <Text
              fontSize={["16px", null, "20px"]}
              fontWeight={500}
              lineHeight="1.2"
              noOfLines={1}
              textOverflow="ellipsis"
              color="blue.500"
              textDecoration="underline"
            >
              {task.title}
            </Text>
          </Link>
          <Checkbox
            size={["md", null, "lg"]}
            colorScheme="green"
            isChecked={isTaskCompleted}
            onChange={(e) => handleTaskStatus(e.target.checked)}
            mt={1}
          />
        </HStack>
        <Text
          fontSize={["10px", null, "12px"]}
          lineHeight="1.2"
          color="#00000070"
          noOfLines={2}
          textOverflow="ellipsis"
        >
          {task.description}
        </Text>
        <ImageWithText
          imageSrc="/images/calendar.svg"
          text={dayjs(task.endDate).format("DD MMM YYYY")}
          textProps={{
            fontSize: ["12px", null, "12px"],
            fontWeight: 500,
            lineHeight: "1.4",
            whiteSpace: "nowrap",
          }}
        />

        <HStack justifyContent="space-between">
          <Text
            fontSize={["12px", null, "12px"]}
            fontWeight={500}
            lineHeight="1.2"
            color={getPriorityColor(task.priorityLevel)}
          >
            {getTaskPriorityLabel(task.priorityLevel)} priority
          </Text>
          <HStack spacing={["12px", null, "24px"]} alignSelf="flex-end">
            <Link
              href={`/editTask/${task.id}/`}
              passHref
              style={{
                pointerEvents: isTaskCompleted ? "none" : "auto",
                cursor: isTaskCompleted ? "not-allowed" : "pointer",
              }}
              aria-disabled={isTaskCompleted}
              tabIndex={isTaskCompleted ? -1 : undefined}
            >
              <Edit size={isTablet ? "20px" : "25px"} color="blue" />
            </Link>
            <DeleteOutline
              size={isTablet ? "20px" : "25px"}
              color="#ff5b5b"
              onClick={onOpen}
              cursor="pointer"
            />
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
};

export default TaskCard;
