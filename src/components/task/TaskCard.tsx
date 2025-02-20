import {
  Box,
  HStack,
  Text,
  Image,
  useDisclosure,
  VStack,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { TaskInterface } from "@/types/task";
import { getPriorityColor, getTaskPriorityLabel } from "@/components/utils";
// import { DeleteOutline } from "@emotion-icons/material/DeleteOutline";
import dayjs from "dayjs";
import ImageWithText from "@/components/ImageWithText";
import CustomTaskModel from "@/components/task/CustomTaskModel";
import WarningModal from "@/components/WarningModal";
import { Edit } from "@emotion-icons/boxicons-solid/Edit";
import { DeleteOutline } from "@emotion-icons/material/DeleteOutline";
import { useApi } from "@/hook/useApi";
import api from "@/components/api";

const TaskCard = ({
  task,
  onUpdate,
}: {
  task: TaskInterface;
  onUpdate?: () => void;
}) => {
  const { makeApiCall } = useApi();
  const {
    isOpen: isWarningModalOpen,
    onClose: onWarningModalClose,
    onOpen: onWarningModalOpen,
  } = useDisclosure();
  const {
    isOpen: isEditModalOpen,
    onClose: onEditModalClose,
    onOpen: onEditModalOpen,
  } = useDisclosure();

  const handleDeleteTask = () => {
    onWarningModalClose();

    makeApiCall({
      apiFn: () =>
        api(`/task/delete/${task._id}`, {
          method: "DELETE",
        }),
      successMsg: { title: "Task deleted successfully" },
      onSuccess: () => {
        onUpdate?.();
      },
    });
  };

  return (
    <Box
      boxShadow="base"
      borderRadius="12px"
      p={4}
      justifyContent="space-between"
      alignItems="flex-start"
      bgGradient={`linear(to-bl, #e1e1e195, #ffffff)`}
      _hover={{
        boxShadow: "md",
      }}
    >
      <WarningModal
        isOpen={isWarningModalOpen}
        onClose={onWarningModalClose}
        onYes={handleDeleteTask}
        message={`Are you sure to delete this task?`}
      />
      <CustomTaskModel
        isOpen={isEditModalOpen}
        onClose={onEditModalClose}
        projectId={task.projectId}
        onTaskCreated={() => {
          onUpdate?.();
        }}
        taskId={task._id}
        initialTaskStatus={task.status}
        defaultTaskValues={{
          title: task.title,
          description: task.description,
          endDate: dayjs(task.endDate).format("YYYY-MM-DD"),
          priorityLevel: task.priorityLevel,
          projectId: task.projectId,
          status: task.status,
        }}
      />
      <VStack alignItems="stretch" spacing={3}>
        <HStack justifyContent="space-between">
          <Box
            bg={getPriorityColor(task.priorityLevel)}
            fontFamily="Roboto"
            fontSize="10px"
            fontWeight={500}
            lineHeight="1.1"
            borderRadius="10px"
            px={2}
            py={1}
            letterSpacing={0.5}
            color="white"
          >
            {getTaskPriorityLabel(task.priorityLevel).toUpperCase()}
          </Box>
          <Menu>
            <MenuButton
              as={IconButton}
              size="sm"
              border="none"
              borderRadius="full"
              aria-label=""
              icon={
                <Image src="/images/dots.svg" alt="" width={25} height={25} />
              }
              variant="outline"
            />
            <MenuList>
              <MenuItem icon={<Edit />} onClick={onEditModalOpen}>
                Edit Task
              </MenuItem>
              <MenuItem icon={<DeleteOutline />} onClick={onWarningModalOpen}>
                Delete Task
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
        <Text
          fontFamily="Playfair Display"
          fontSize={["16px", null, "20px"]}
          fontWeight={500}
          lineHeight="1.2"
          noOfLines={1}
          textOverflow="ellipsis"
        >
          {task.title}
        </Text>
        <Text
          fontFamily="Roboto"
          fontSize={["12px", null, "14px"]}
          lineHeight="1.2"
          noOfLines={2}
          textOverflow="ellipsis"
        >
          {task.description}
        </Text>
        <HStack justifyContent="space-between">
          <ImageWithText
            imageSrc="/images/calendar.svg"
            text={dayjs(task.endDate).format("DD MMM YYYY")}
            imageProps={{
              color: "blackAlpha.600",
            }}
            textProps={{
              fontSize: ["12px", null, "12px"],
              fontWeight: 500,
              lineHeight: "1.4",
              whiteSpace: "nowrap",
              color: "blackAlpha.600",
            }}
          />
        </HStack>
      </VStack>
    </Box>
  );
};

export default TaskCard;
