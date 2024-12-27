import {
  Box,
  StackProps,
  Text,
  useDisclosure,
  VStack,
  Image,
  SimpleGrid,
  HStack,
} from "@chakra-ui/react";
import { isEmpty } from "lodash";
import Head from "next/head";
import Layout from "@/components/Layout";
import FloatingActionButton from "@/components/FloatingActionButton";
import WithLoader from "@/components/WithLoader";
import { KeyedMutator } from "swr";
import { ProjectInterface } from "@/types/project";
import CreateProjectModel from "@/components/CreateProjectModel";
import ProjectCard from "@/components/project/ProjectCard";
import { Fragment } from "react";

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
      {/* <CreateTaskModel
        isOpen={isCreateTaskModalOpen}
        onClose={onCreateTaskModalClose}
      /> */}
      <CreateProjectModel
        isOpen={isCreateProjectModalOpen}
        onClose={onCreateProjectModalClose}
      />
      <Layout pageTitle="Smart Task Manager">
        <>
          <WithLoader apiUrl={`/project/all/`}>
            {({
              data: projects,
              mutate,
            }: {
              data: ProjectInterface[];
              mutate: KeyedMutator<ProjectInterface[]>;
            }) => {
              return (
                <>
                  {isEmpty(projects) ? (
                    <EmptyProject />
                  ) : (
                    <ProjectList projects={projects} />
                  )}
                </>
              );
            }}
          </WithLoader>

          <FloatingActionButton
            onClick={onCreateProjectModalOpen}
            // pageLink={`/createTask/${
            //   isEmpty(searchText) ? "" : `?title=${searchText}`
            // }`}
          />
        </>
      </Layout>
    </Box>
  );
};

const EmptyProject = ({
  message,
  showAddLink,
  ...props
}: {
  message?: React.ReactNode;
  showAddLink?: boolean;
} & StackProps) => {
  return (
    <VStack h="100%" justifyContent="center" {...props}>
      <Image
        src="https://img.icons8.com/pastel-glyph/64/website-error.png"
        w={["30px", null, "70px"]}
        h={["30px", null, "70px"]}
        alt=""
      />
      {message ?? (
        <Text
          fontSize={["12px", null, "16px"]}
          lineHeight="1.17"
          color="#00000070"
          textAlign="center"
        >
          No Project Found...
        </Text>
      )}
    </VStack>
  );
};

const ProjectList = ({ projects }: { projects: ProjectInterface[] }) => {
  return (
    <VStack alignItems="stretch" spacing={4}>
      <HStack justifyContent="space-between" spacing={4}>
        <Text
          fontFamily="Playfair Display"
          fontSize="32px"
          fontWeight={700}
          lineHeight="1.25"
        >
          Projects
        </Text>
      </HStack>

      <SimpleGrid columns={[1, 2, 3]}>
        {projects.map((project) => {
          return (
            <Fragment key={project._id}>
              <ProjectCard project={project} />
            </Fragment>
          );
        })}
      </SimpleGrid>
    </VStack>
  );
};

export default HomePage;
