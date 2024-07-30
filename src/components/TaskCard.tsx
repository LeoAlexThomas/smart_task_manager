import {
  Checkbox,
  HStack,
  SimpleGrid,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { TaskInterface } from "./types/TaskInterface";
import { getPriorityColor, getTaskPriorityLabel } from "./utils";
import { Edit } from "@emotion-icons/boxicons-solid/Edit";
import { DeleteOutline } from "@emotion-icons/material/DeleteOutline";
import dayjs from "dayjs";
import Link from "next/link";

const TaskCard = ({ task }: { task: TaskInterface }) => {
  const isTablet = useBreakpointValue({ base: true, md: false });
  const isTaskCompleted = task.isCompleted;
  return (
    <SimpleGrid
      templateColumns={["15px 1fr", null, "25px 1fr"]}
      spacing={["12px", null, "16px"]}
      boxShadow="0px 0px 2px 1px #00000050"
      borderRadius="12px"
      p={4}
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={isTaskCompleted ? "#efefef95" : "#ffffff"}
    >
      <Checkbox
        size={["md", null, "lg"]}
        colorScheme="green"
        isChecked={isTaskCompleted}
        mt={1}
      />
      <VStack alignItems="stretch">
        <HStack alignItems="flex-end" justifyContent={["space-between"]}>
          <Text
            fontSize={["16px", null, "20px"]}
            fontWeight={500}
            lineHeight="1.2"
            noOfLines={1}
            textOverflow="ellipsis"
          >
            {task.title}
          </Text>
          <Text
            fontSize={["10px", null, "12px"]}
            fontWeight={500}
            lineHeight="1.4"
            whiteSpace="nowrap"
          >
            ({dayjs(task.endDate).format("DD MMM YYYY hh:mm A")})
          </Text>
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
        <HStack justifyContent="space-between">
          <Text
            fontSize={["10px", null, "12px"]}
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
            <DeleteOutline size={isTablet ? "20px" : "25px"} color="red" />
          </HStack>
        </HStack>
      </VStack>
    </SimpleGrid>
  );
};

export default TaskCard;
