import EmptyTask from "@/components/EmptyTask";
import { Box, useDisclosure } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import Head from "next/head";
import { useState } from "react";
import Layout from "@/components/Layout";
import SearchMenuPopup from "@/components/SearchMenuPopup";
import SearchTextInput from "@/components/SearchTextInput";
import TaskList from "@/components/TaskList";
import { TaskInterface } from "@/types/task";
import FloatingActionButton from "@/components/FloatingActionButton";
import WithLoader from "@/components/WithLoader";
import { KeyedMutator } from "swr";
import { colors } from "@/components/utils";
import CreateTaskModel from "@/components/CustomTaskModel";

const HomePage = () => {
  const [searchText, setSearchText] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isCreateTaskModalOpen,
    onOpen: onCreateTaskModalOpen,
    onClose: onCreateTaskModalClose,
  } = useDisclosure();

  return (
    <Box bg="white" h="100vh">
      <Head>
        <title>Home Page</title>
      </Head>
      <CreateTaskModel
        isOpen={isCreateTaskModalOpen}
        onClose={onCreateTaskModalClose}
      />
      <Layout
        pageTitle="Smart Task Manager"
        headerActions={
          <>
            <SearchTextInput
              searchText={searchText}
              onSearchTextChange={setSearchText}
              display={["none", null, "block"]}
              _placeholder={{
                color: colors.primaryColor[0],
              }}
              color={colors.primaryColor[0]}
              border="1px solid"
              borderColor={colors.primaryColor[0]}
            />
            <Box display={["block", null, "none"]}>
              <SearchMenuPopup
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
                searchText={searchText}
                onSearchChange={setSearchText}
                placement="bottom-start"
              />
            </Box>
          </>
        }
      >
        <>
          <WithLoader apiUrl={`/getTasks/?searchText=${searchText}`}>
            {({
              data: tasks,
              mutate,
            }: {
              data: TaskInterface[];
              mutate: KeyedMutator<TaskInterface[]>;
            }) => {
              return (
                <>
                  {isEmpty(tasks) ? (
                    <EmptyTask searchText={searchText} showAddLink />
                  ) : (
                    <TaskList tasks={tasks} taskListMutate={mutate} />
                  )}
                </>
              );
            }}
          </WithLoader>

          <FloatingActionButton
            onClick={onCreateTaskModalOpen}
            // pageLink={`/createTask/${
            //   isEmpty(searchText) ? "" : `?title=${searchText}`
            // }`}
          />
        </>
      </Layout>
    </Box>
  );
};

export default HomePage;
