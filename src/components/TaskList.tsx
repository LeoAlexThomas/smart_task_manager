import { SimpleGrid } from "@chakra-ui/react";
import { Fragment } from "react";
import TaskCard from "./TaskCard";
import { TaskInterface } from "./types/task";

const TaskList = ({ tasks }: { tasks: TaskInterface[] }) => {
  return (
    <SimpleGrid
      columns={[1, 2, null, null, 3]}
      alignItems="stretch"
      spacing="16px"
    >
      {tasks.map((task) => (
        <Fragment key={task.id}>
          <TaskCard task={task} />
        </Fragment>
      ))}
    </SimpleGrid>
  );
};

export default TaskList;
