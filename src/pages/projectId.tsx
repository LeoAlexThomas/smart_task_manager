import Layout from "@/components/Layout";
import { Box, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import ProjectInfo from "@/components/project/ProjectInfo";
import TaskList from "@/components/task/TaskList";
import isString from "lodash/isString";

const ProjectIdPage = () => {
  const router = useRouter();
  const projectId = router.query.id ?? "";
  return (
    <Box h="100vh">
      <Head>
        <title>Project Id page</title>
      </Head>
      <Layout>
        <VStack alignItems="stretch" spacing={4}>
          <ProjectInfo projectId={isString(projectId) ? projectId : ""} />
          <TaskList projectId={isString(projectId) ? projectId : ""} />
        </VStack>
      </Layout>
    </Box>
  );
};

export default ProjectIdPage;
