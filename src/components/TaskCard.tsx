import { Box, Checkbox, HStack, Text, VStack } from "@chakra-ui/react";
import { TaskInterface } from "@/types/task";
import { getPriorityColor, getTaskPriorityLabel } from "@/components/utils";
// import { DeleteOutline } from "@emotion-icons/material/DeleteOutline";
import dayjs from "dayjs";
import ImageWithText from "@/components/ImageWithText";
// import WarningModal from "@/components/WarningModal";

const TaskCard = ({
  task,
  onUpdate,
  onDelete,
}: {
  task: TaskInterface;
  onUpdate?: (isCompleted: boolean) => void;
  onDelete?: () => void;
}) => {
  const isTaskCompleted = task.isCompleted;
  // const { isOpen, onClose, onOpen } = useDisclosure();

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
      {/* <WarningModal
        isOpen={isOpen}
        onClose={onClose}
        onYes={() => {
          onClose();
          onDelete?.();
        }}
        message={`Are you sure to delete ${task.title}?`}
      /> */}
      <VStack alignItems="stretch" spacing={3}>
        <HStack alignItems="flex-end" justifyContent={["space-between"]}>
          <Text
            fontFamily="Playfair Display"
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
          <Checkbox
            size={["md", null, "lg"]}
            colorScheme="green"
            isChecked={isTaskCompleted}
            onChange={(e) => onUpdate?.(e.target.checked)}
            mt={1}
          />
        </HStack>
        <Text
          fontFamily="Roboto"
          fontSize={["10px", null, "12px"]}
          lineHeight="1.2"
          color="#00000070"
          noOfLines={2}
          textOverflow="ellipsis"
        >
          {task.description}
        </Text>
        <HStack justifyContent="space-between">
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
          <Text
            fontFamily="Roboto"
            fontSize={["12px", null, "12px"]}
            fontWeight={500}
            lineHeight="1.2"
            color={getPriorityColor(task.priorityLevel)}
          >
            {getTaskPriorityLabel(task.priorityLevel)} priority
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default TaskCard;
