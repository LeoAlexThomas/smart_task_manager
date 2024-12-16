import DashboardStatistics from "@/components/DashboardStatistics";
import EmptyTask from "@/components/EmptyTask";
import Layout from "@/components/Layout";
import TaskList from "@/components/TaskList";
import { TaskInterface } from "@/types/task";
import WithLoader from "@/components/WithLoader";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import isEmpty from "lodash/isEmpty";
import Head from "next/head";
import { KeyedMutator } from "swr";

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Layout pageTitle="Dashboard">
        <Tabs isFitted variant="enclosed">
          <TabList>
            <Tab
              fontSize={["12px", null, "16px"]}
              fontWeight={500}
              lineHeight="1.25"
            >
              Statistics
            </Tab>
            <Tab
              fontSize={["12px", null, "16px"]}
              fontWeight={500}
              lineHeight="1.25"
            >
              Completed Task
            </Tab>
            <Tab
              fontSize={["12px", null, "16px"]}
              fontWeight={500}
              lineHeight="1.25"
            >
              Pending Task
            </Tab>
            <Tab
              fontSize={["12px", null, "16px"]}
              fontWeight={500}
              lineHeight="1.25"
            >
              Upcoming Task
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <DashboardStatistics />
            </TabPanel>
            <TabPanel px={0}>
              <WithLoader apiUrl="/getTasks">
                {({
                  data: tasks,
                  mutate,
                }: {
                  data: TaskInterface[];
                  mutate: KeyedMutator<TaskInterface[]>;
                }) => {
                  if (isEmpty(tasks)) {
                    return <EmptyTask showAddLink h="50vh" />;
                  }
                  const completedTasks = tasks.filter(
                    (task) => task.isCompleted
                  );
                  if (isEmpty(completedTasks)) {
                    return (
                      <EmptyTask
                        message={<Text>Tasks are not completed</Text>}
                        h="50vh"
                      />
                    );
                  }
                  return (
                    <TaskList tasks={completedTasks} taskListMutate={mutate} />
                  );
                }}
              </WithLoader>
            </TabPanel>
            <TabPanel px={0}>
              <WithLoader apiUrl="/getTasks">
                {({
                  data: tasks,
                  mutate,
                }: {
                  data: TaskInterface[];
                  mutate: KeyedMutator<TaskInterface[]>;
                }) => {
                  if (isEmpty(tasks)) {
                    return <EmptyTask showAddLink h="50vh" />;
                  }
                  const pendingTasks = tasks.filter(
                    (task) => !task.isCompleted
                  );
                  if (isEmpty(pendingTasks)) {
                    return (
                      <EmptyTask
                        message={<Text>No Task are pending</Text>}
                        h="50vh"
                      />
                    );
                  }
                  return (
                    <TaskList tasks={pendingTasks} taskListMutate={mutate} />
                  );
                }}
              </WithLoader>
            </TabPanel>
            <TabPanel px={0}>
              <WithLoader apiUrl="/getTasks">
                {({
                  data: tasks,
                  mutate,
                }: {
                  data: TaskInterface[];
                  mutate: KeyedMutator<TaskInterface[]>;
                }) => {
                  if (isEmpty(tasks)) {
                    return <EmptyTask showAddLink h="50vh" />;
                  }
                  const upcomingTasks = tasks.filter(
                    (task) =>
                      dayjs(task.endDate).isAfter(dayjs()) && !task.isCompleted
                  );
                  if (isEmpty(upcomingTasks)) {
                    return (
                      <EmptyTask
                        message={<Text>There no upcoming tasks</Text>}
                        h="50vh"
                      />
                    );
                  }
                  return (
                    <TaskList tasks={upcomingTasks} taskListMutate={mutate} />
                  );
                }}
              </WithLoader>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Layout>
    </>
  );
};

export default Dashboard;
