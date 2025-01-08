import { Box, useDisclosure } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import Head from "next/head";
import Layout from "@/components/Layout";
import FloatingActionButton from "@/components/FloatingActionButton";
import WithLoader from "@/components/WithLoader";
import { ProjectInterface } from "@/types/project";
import EmptyProject from "@/components/project/EmptyProject";
import ProjectList from "@/components/project/ProjectList";
import ProjectModel from "@/components/ProjectModel";

const HomePage = () => {
  const {
    isOpen: isCreateProjectModalOpen,
    onOpen: onCreateProjectModalOpen,
    onClose: onCreateProjectModalClose,
  } = useDisclosure();

  return (
    <Box bg="white" h="100vh">
      <Head>
        <title>Home Page</title>
      </Head>
      <Layout>
        <>
          <WithLoader apiUrl={`/project/all/`}>
            {({
              data: projects,
              mutate,
            }: {
              data: ProjectInterface[];
              mutate: () => void;
            }) => {
              return (
                <>
                  <ProjectModel
                    isOpen={isCreateProjectModalOpen}
                    title="Create Project"
                    onClose={onCreateProjectModalClose}
                    onSuccess={mutate}
                  />
                  {isEmpty(projects) ? (
                    <EmptyProject />
                  ) : (
                    <ProjectList projects={projects} />
                  )}
                </>
              );
            }}
          </WithLoader>

          <FloatingActionButton onClick={onCreateProjectModalOpen} />
        </>
      </Layout>
    </Box>
  );
};

export default HomePage;
