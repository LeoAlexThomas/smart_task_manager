import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import CustomModel from "@/components/CustomModal";
import CreateTaskModel from "@/components/CustomTaskModel";
import Layout from "@/components/Layout";
import ProjectModel from "@/components/ProjectModel";
import TaskCard from "@/components/TaskCard";
import { colors } from "@/components/utils";
import WithLoader from "@/components/WithLoader";
import { ProjectInterface } from "@/types/project";
import { TaskInterface, TaskStatusEnum } from "@/types/task";
import {
  Avatar,
  AvatarGroup,
  Box,
  Grid,
  HStack,
  Spacer,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { isEmpty } from "lodash";
import isNil from "lodash/isNil";
import Head from "next/head";
import { useRouter } from "next/router";

const ProjectIdPage = () => {
  const router = useRouter();
  const projectId = router.query.id;
  const {
    isOpen: isCreateTaskModalOpen,
    onOpen: onCreateTaskModalOpen,
    onClose: onCreateTaskModalClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteProjectModalOpen,
    onOpen: onDeleteProjectModalOpen,
    onClose: onDeleteProjectModalClose,
  } = useDisclosure();

  const {
    isOpen: isEditProjectModalOpen,
    onOpen: onEditProjectModalOpen,
    onClose: onEditProjectModalClose,
  } = useDisclosure();
  return (
    <Box h="100vh">
      <Head>
        <title>Project Id page</title>
      </Head>
      <Layout>
        <WithLoader apiUrl={!isNil(projectId) ? `/project/${projectId}` : ""}>
          {({
            data,
            mutate,
          }: {
            data: ProjectInterface;
            mutate: () => void;
          }) => {
            const tasks = data.tasks;
            return (
              <VStack alignItems="stretch" spacing={4}>
                <CreateTaskModel
                  projectId={data._id}
                  isOpen={isCreateTaskModalOpen}
                  onClose={onCreateTaskModalClose}
                />
                <CustomModel
                  title="Confirmation!!!!"
                  isOpen={isDeleteProjectModalOpen}
                  onClose={onDeleteProjectModalClose}
                  footer={
                    <HStack>
                      <PrimaryButton
                        size="md"
                        bg="red.600"
                        _hover={{
                          bg: "red.300",
                        }}
                      >
                        Delete
                      </PrimaryButton>
                    </HStack>
                  }
                >
                  <Text pb="60px">
                    Are you sure you want to delete this project?
                  </Text>
                </CustomModel>
                <ProjectModel
                  isOpen={isEditProjectModalOpen}
                  onClose={onEditProjectModalClose}
                  title="Edit Project"
                  onSuccess={mutate}
                  projectId={data._id}
                  defaultValues={{
                    title: data.title,
                    description: data.description,
                    memberIds: data.members.map((mem) => ({
                      label: `${mem.name} (${mem.email})`,
                      value: mem._id,
                    })),
                  }}
                />
                <HStack justifyContent="space-between">
                  <VStack alignItems="stretch">
                    <Text
                      fontFamily="Playfair Display"
                      fontSize={["26px", null, "34px"]}
                      fontWeight={700}
                    >
                      {data.title}
                    </Text>
                    <Text
                      fontFamily="Noto Serif"
                      fontSize={["16px", null, "20px"]}
                      fontWeight={500}
                    >
                      {data.description}
                    </Text>
                  </VStack>
                  <HStack>
                    <PrimaryButton onClick={onEditProjectModalOpen}>
                      Edit
                    </PrimaryButton>
                    <SecondaryButton
                      borderColor="red.400"
                      color="red.400"
                      _hover={{
                        bg: "red.50",
                        borderColor: "red.400",
                      }}
                      onClick={onDeleteProjectModalOpen}
                    >
                      Delete
                    </SecondaryButton>
                  </HStack>
                </HStack>
                <HStack alignItems="center" spacing={4}>
                  <Text
                    fontFamily="Noto Serif"
                    fontSize={["16px", null, "20px"]}
                    fontWeight={700}
                  >
                    Members:{" "}
                  </Text>
                  <AvatarGroup max={3} size={["sm", null, "md"]}>
                    {data.members.map((mem) => (
                      <Avatar name={mem.name} />
                    ))}
                  </AvatarGroup>
                </HStack>
                <Text
                  fontFamily="Noto Serif"
                  fontSize={["16px", null, "20px"]}
                  fontWeight={700}
                >
                  Tasks:
                </Text>

                {isEmpty(tasks) ? (
                  <VStack>
                    <Text>Please Add Task to this project</Text>
                    <PrimaryButton size="sm" onClick={onCreateTaskModalOpen}>
                      Add Task
                    </PrimaryButton>
                  </VStack>
                ) : (
                  <Grid
                    templateColumns={["1fr", null, "1fr 1fr 1fr 1fr"]}
                    gap={4}
                  >
                    <TaskColumn
                      header="ToDo"
                      tasks={tasks.filter(
                        (task) => task.status === TaskStatusEnum.todo
                      )}
                      showCreateTask
                      onCreateTask={onCreateTaskModalOpen}
                    />
                    <TaskColumn
                      header="In Progress"
                      tasks={tasks.filter(
                        (task) => task.status === TaskStatusEnum.inProcess
                      )}
                    />
                    <TaskColumn
                      header="Completed"
                      tasks={tasks.filter(
                        (task) => task.status === TaskStatusEnum.completed
                      )}
                    />
                    <TaskColumn
                      header="Blocked"
                      tasks={tasks.filter(
                        (task) => task.status === TaskStatusEnum.blocked
                      )}
                    />
                  </Grid>
                )}
              </VStack>
            );
          }}
        </WithLoader>
      </Layout>
    </Box>
  );
};

const TaskColumn = ({
  header,
  tasks,
  showCreateTask = false,
  onCreateTask,
}: {
  header: string;
  tasks: TaskInterface[];
  showCreateTask?: boolean;
  onCreateTask?: () => void;
}) => {
  return (
    <Box>
      <Box
        border="1px solid black"
        borderRadius="8px"
        backgroundColor={colors.primaryColor[1]}
        textAlign="center"
        fontFamily="Roboto"
        fontSize={["14px", null, "18px"]}
        fontWeight={700}
      >
        {header} ({tasks.length})
      </Box>
      <Spacer h={4} />
      <VStack alignItems="stretch" h="50vh" p={2} overflowY="auto" spacing={4}>
        {tasks.map((task) => (
          <TaskCard task={task} />
        ))}
      </VStack>
      <Spacer h={4} />
      {showCreateTask && (
        <Box
          bg={colors.primaryColor[1]}
          borderRadius={4}
          textAlign="center"
          w="100%"
          fontFamily="Roboto"
          fontSize="14px"
          fontWeight={700}
          p={2}
          cursor="pointer"
          onClick={onCreateTask}
        >
          Add Task
        </Box>
      )}
    </Box>
  );
};

export default ProjectIdPage;
