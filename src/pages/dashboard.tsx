import DashboardStatistics from "@/components/DashboardStatistics";
import Layout from "@/components/Layout";
import TaskList from "@/components/TaskList";
import { dummyTaskList } from "@/components/utils";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import dayjs from "dayjs";
import Head from "next/head";

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
              <TaskList
                tasks={dummyTaskList.filter((task) => task.isCompleted)}
              />
            </TabPanel>
            <TabPanel px={0}>
              <TaskList
                tasks={dummyTaskList.filter((task) => !task.isCompleted)}
              />
            </TabPanel>
            <TabPanel px={0}>
              <TaskList
                tasks={dummyTaskList.filter((task) =>
                  dayjs(task.endDate).isAfter(dayjs())
                )}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Layout>
    </>
  );
};

export default Dashboard;
