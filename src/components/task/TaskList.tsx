import { TaskStatusEnum, TaskInterface } from "@/types/task";
import {
  useDisclosure,
  Grid,
  Box,
  HStack,
  Spacer,
  VStack,
  Text,
} from "@chakra-ui/react";
import { isEmpty, isNil } from "lodash";
import { Fragment, useState } from "react";
import useSWR from "swr";
import CustomTaskModel from "@/components/task/CustomTaskModel";
import ErrorMsg from "@/components/ErrorMsg";
import Loader from "@/components/Loader";
import TaskCard from "@/components/task/TaskCard";
import {
  mutateAllTaskStatusApiCall,
  colors,
  getStatusColor,
} from "@/components/utils";
import { AddCircle } from "@emotion-icons/fluentui-system-regular/AddCircle";

const TaskList = ({ projectId }: { projectId: string }) => {
  const {
    isOpen: isCreateTaskModalOpen,
    onOpen: onCreateTaskModalOpen,
    onClose: onCreateTaskModalClose,
  } = useDisclosure();

  const [selectedColumnStatus, setSelectedColumnStatus] =
    useState<TaskStatusEnum>(TaskStatusEnum.initial);

  const handleCreateTaskModalClose = () => {
    setSelectedColumnStatus(TaskStatusEnum.initial);
    onCreateTaskModalClose();
  };

  const handleCreateTaskModalOpen = (status: TaskStatusEnum) => {
    setSelectedColumnStatus(status);
    onCreateTaskModalOpen();
  };

  return (
    <>
      <CustomTaskModel
        projectId={projectId}
        initialTaskStatus={selectedColumnStatus}
        isOpen={isCreateTaskModalOpen}
        onClose={handleCreateTaskModalClose}
        onTaskCreated={() => mutateAllTaskStatusApiCall({ projectId })}
      />

      <Grid templateColumns={["1fr", null, "1fr 1fr 1fr 1fr"]} gap={4}>
        <TaskColumn
          header="Initial"
          statusColumn={TaskStatusEnum.initial}
          onCreateTask={() => handleCreateTaskModalOpen(TaskStatusEnum.initial)}
          projectId={projectId}
        />
        <TaskColumn
          header="In Progress"
          statusColumn={TaskStatusEnum.inProcess}
          projectId={projectId}
          onCreateTask={() =>
            handleCreateTaskModalOpen(TaskStatusEnum.inProcess)
          }
        />
        <TaskColumn
          header="Completed"
          statusColumn={TaskStatusEnum.completed}
          projectId={projectId}
          onCreateTask={() =>
            handleCreateTaskModalOpen(TaskStatusEnum.completed)
          }
        />
        <TaskColumn
          header="Blocked"
          projectId={projectId}
          statusColumn={TaskStatusEnum.blocked}
          showCreateTask={false}
        />
      </Grid>
    </>
  );
};

const TaskColumn = ({
  header,
  statusColumn,
  showCreateTask = true,
  onCreateTask,
  projectId,
}: {
  header: string;
  statusColumn: TaskStatusEnum;
  showCreateTask?: boolean;
  onCreateTask?: () => void;
  projectId: string;
}) => {
  const { data: tasks, error } = useSWR<TaskInterface[]>(
    !isEmpty(projectId)
      ? `/task/status/${statusColumn}?projectId=${projectId}`
      : ""
  );

  const isLoading = !tasks && !error;

  return (
    <Box
      bg="#dcdcdc30"
      borderRadius="12px"
      h={["100%", null, "70vh"]}
      overflowY={["inherit", null, "auto"]}
      p={1}
    >
      <Box
        boxShadow="base"
        borderRadius="12px"
        bg={colors.primaryColor[0]}
        px={3}
        py={2}
        pos="sticky"
        top={0}
      >
        <HStack justifyContent="space-between">
          <HStack>
            <Box
              bg={getStatusColor(statusColumn)}
              h="10px"
              w="10px"
              borderRadius="full"
            />
            <Text
              fontFamily="Roboto"
              fontSize={["14px", null, "18px"]}
              fontWeight={700}
              lineHeight="1.0"
            >
              {header} {isNil(tasks) ? "" : `(${tasks.length})`}
            </Text>
          </HStack>

          {showCreateTask && <AddCircle size="20px" onClick={onCreateTask} />}
        </HStack>
      </Box>
      <Spacer h={4} />
      <VStack alignItems="stretch" p={1} spacing={4}>
        {isLoading ? (
          <Loader />
        ) : !isNil(error) ? (
          <ErrorMsg text={error.res?.data?.message} />
        ) : isNil(tasks) ? (
          <></>
        ) : (
          tasks.map((task) => (
            <Fragment key={task._id}>
              <TaskCard
                task={task}
                onUpdate={() => mutateAllTaskStatusApiCall({ projectId })}
              />
            </Fragment>
          ))
        )}
      </VStack>
    </Box>
  );
};
export default TaskList;
