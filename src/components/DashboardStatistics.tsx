import {
  Box,
  BoxProps,
  Divider,
  Text,
  TextProps,
  useBreakpointValue,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import dayjs from "dayjs";
import isEmpty from "lodash/isEmpty";
import { TaskInterface } from "@/types/task";
import EmptyTask from "./EmptyTask";
import WithLoader from "./WithLoader";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

const DashboardStatistics = () => {
  return (
    <WithLoader apiUrl="/getTasks">
      {({ data: tasks }: { data: TaskInterface[] }) => {
        if (isEmpty(tasks)) {
          return <EmptyTask showAddLink h="50vh" />;
        }
        return (
          <Wrap
            spacing="16px"
            spacingY={["16px", null, null, "24px"]}
            alignItems="stretch"
            justify={["center", null, null, "space-around"]}
          >
            <WrapItem>
              <SectionWithHeader title="Overall Task Details">
                <OverallTaskChart tasks={tasks} />
              </SectionWithHeader>
            </WrapItem>
            <WrapItem>
              <SectionWithHeader title="Task Completion On Time">
                <CompletedOnDueDateTaskChart tasks={tasks} />
              </SectionWithHeader>
            </WrapItem>
          </Wrap>
        );
      }}
    </WithLoader>
  );
};

const OverallTaskChart = ({ tasks }: { tasks: TaskInterface[] }) => {
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const completedTaskCount = tasks.filter((task) => task.isCompleted).length;
  const pendingTaskCount = tasks.length - completedTaskCount;
  const dashboardOverallStatistics: {
    data: ChartData<"doughnut">;
    options: ChartOptions<"doughnut">;
  } = {
    data: {
      labels: ["Completed", "Pending"],
      datasets: [
        {
          data: [completedTaskCount, pendingTaskCount],
          backgroundColor: ["#44bb44", "#ff5b5b"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: isMobile ? "bottom" : "right",
        },
      },
    },
  };

  return (
    <Box w="100%" h="100%" p={4} pt={0}>
      <Doughnut
        data={dashboardOverallStatistics.data}
        options={dashboardOverallStatistics.options}
      />
    </Box>
  );
};

const CompletedOnDueDateTaskChart = ({ tasks }: { tasks: TaskInterface[] }) => {
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const completedTasks = tasks.filter((task) => task.isCompleted);
  const completedOnDueDateTaskCount = completedTasks.filter((task) =>
    dayjs(task.completedDate).isBefore(task.endDate)
  ).length;
  const completedNotOnDueDateTaskCount = completedTasks.filter(
    (task) => !dayjs(task.completedDate).isBefore(task.endDate)
  ).length;
  const dashboardCompletedOnDueDateStatistics: {
    data: ChartData<"doughnut">;
    options: ChartOptions<"doughnut">;
  } = {
    data: {
      labels: ["Not On-time", "On-time"],
      datasets: [
        {
          data: [completedNotOnDueDateTaskCount, completedOnDueDateTaskCount],
          backgroundColor: ["#44bb44", "#4e4ebb"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: isMobile ? "bottom" : "right",
        },
      },
    },
  };

  if (completedNotOnDueDateTaskCount < 1 && completedOnDueDateTaskCount < 1) {
    return (
      <EmptyTask
        my={[5, null, 10]}
        message={
          <Text fontSize={["12px", null, "16px"]}>Tasks are not completed</Text>
        }
      />
    );
  }

  return (
    <Box w="100%" h="100%" p={4} pt={0}>
      <Doughnut
        data={dashboardCompletedOnDueDateStatistics.data}
        options={dashboardCompletedOnDueDateStatistics.options}
      />
    </Box>
  );
};

const SectionWithHeader = ({
  title,
  titleProps,
  children,
  ...props
}: {
  title: string;
  children: React.ReactNode;
  titleProps?: TextProps;
} & BoxProps) => {
  return (
    <Box
      w="100%"
      maxW={["auto", null, "100%"]}
      maxH="450px"
      border="1px solid"
      borderColor="#e1e1e1"
      borderRadius="12px"
      {...props}
    >
      <Text
        fontSize={["16px", null, "20px"]}
        fontWeight={500}
        lineHeight="1.25"
        pb={2}
        p={4}
        noOfLines={2}
        {...titleProps}
      >
        {title}
      </Text>
      <Divider mb={4} />
      {children}
    </Box>
  );
};

export default DashboardStatistics;
