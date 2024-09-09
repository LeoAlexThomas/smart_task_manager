import EmptyTask from "@/components/EmptyTask";
import { Box, useDisclosure } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import Head from "next/head";
import { useState } from "react";
import Layout from "@/components/Layout";
import SearchMenuPopup from "@/components/SearchMenuPopup";
import SearchTextInput from "@/components/SearchTextInput";
import TaskList from "@/components/TaskList";
import { TaskInterface } from "@/components/types/task";
import FloatingActionButton from "@/components/FloatingActionButton";
import WithLoaderSWR from "@/components/WithLoaderSWR";
import { KeyedMutator } from "swr";

const HomePage = () => {
  const [searchText, setSearchText] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="white" h="100vh">
      <Head>
        <title>Home Page</title>
      </Head>
      <Layout
        pageTitle="Task Manager"
        headerActions={
          <>
            <SearchTextInput
              searchText={searchText}
              onSearchTextChange={setSearchText}
              display={["none", null, "block"]}
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
          <WithLoaderSWR apiUrl={`/getTasks/?searchText=${searchText}`}>
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
          </WithLoaderSWR>

          <FloatingActionButton
            pageLink={`/createTask/${
              isEmpty(searchText) ? "" : `?title=${searchText}`
            }`}
          />
        </>
      </Layout>
    </Box>
  );
};

export default HomePage;
