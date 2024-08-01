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
import { dummyTaskList } from "./utils";
import dayjs from "dayjs";

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
    <Wrap
      spacing="16px"
      spacingY={["16px", null, null, "24px"]}
      alignItems="stretch"
      justify={["center", null, null, "space-around"]}
    >
      <WrapItem>
        <SectionWithHeader title="Overall Task Details">
          <OverallTaskChart />
        </SectionWithHeader>
      </WrapItem>
      <WrapItem>
        <SectionWithHeader title="Completed On / Before Due Date Task">
          <CompletedOnDueDateTaskChart />
        </SectionWithHeader>
      </WrapItem>
    </Wrap>
  );
};

const OverallTaskChart = () => {
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const completedTaskCount = dummyTaskList.filter(
    (task) => task.isCompleted
  ).length;
  const pendingTaskCount = dummyTaskList.length - completedTaskCount;
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

const CompletedOnDueDateTaskChart = () => {
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const completedTasks = dummyTaskList.filter((task) => task.isCompleted);
  const completedTaskCount = completedTasks.length;
  const completedOnDueDateTaskCount = completedTasks.filter((task) =>
    dayjs(task.completedDate).isBefore(task.endDate)
  ).length;
  const dashboardCompletedOnDueDateStatistics: {
    data: ChartData<"doughnut">;
    options: ChartOptions<"doughnut">;
  } = {
    data: {
      labels: ["Completed Task", "On-time Task"],
      datasets: [
        {
          data: [completedTaskCount, completedOnDueDateTaskCount],
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
