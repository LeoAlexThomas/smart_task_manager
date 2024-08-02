import DashboardStatistics from "@/components/DashboardStatistics";
import EmptyTask from "@/components/EmptyTask";
import Layout from "@/components/Layout";
import useFirebaseDBActions from "@/components/service/firebaseDBService";
import TaskList from "@/components/TaskList";
import { TaskInterface } from "@/components/types/task";
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

const Dashboard = () => {
  const { getTasks } = useFirebaseDBActions();

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
              <WithLoader
                apiFn={() => getTasks()}
                updateLatestData={(val) => val}
              >
                {({ data: tasks }: { data: TaskInterface[] }) => {
                  if (isEmpty(tasks)) {
                    return <EmptyTask />;
                  }
                  const completedTasks = tasks.filter(
                    (task) => task.isCompleted
                  );
                  if (isEmpty(completedTasks)) {
                    return (
                      <EmptyTask
                        message={<Text>Tasks are not completed</Text>}
                      />
                    );
                  }
                  return <TaskList tasks={completedTasks} />;
                }}
              </WithLoader>
            </TabPanel>
            <TabPanel px={0}>
              <WithLoader
                apiFn={() => getTasks()}
                updateLatestData={(val) => val}
              >
                {({ data: tasks }: { data: TaskInterface[] }) => {
                  if (isEmpty(tasks)) {
                    return <EmptyTask />;
                  }
                  const pendingTasks = tasks.filter(
                    (task) => !task.isCompleted
                  );
                  if (isEmpty(pendingTasks)) {
                    return (
                      <EmptyTask message={<Text>No Task are pending</Text>} />
                    );
                  }
                  return <TaskList tasks={pendingTasks} />;
                }}
              </WithLoader>
            </TabPanel>
            <TabPanel px={0}>
              <WithLoader
                apiFn={() => getTasks()}
                updateLatestData={(val) => val}
              >
                {({ data: tasks }: { data: TaskInterface[] }) => {
                  return (
                    <>
                      {isEmpty(tasks) ? (
                        <EmptyTask />
                      ) : (
                        <TaskList
                          tasks={tasks.filter(
                            (task) =>
                              dayjs(task.endDate).isAfter(dayjs()) &&
                              !task.isCompleted
                          )}
                        />
                      )}
                    </>
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
