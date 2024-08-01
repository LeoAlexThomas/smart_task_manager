import EmptyTask from "@/components/EmptyTask";
import { Box, useDisclosure } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import Head from "next/head";
import { useState } from "react";
import Layout from "@/components/Layout";
import SearchMenuPopup from "@/components/SearchMenuPopup";
import SearchTextInput from "@/components/SearchTextInput";
import TaskList from "@/components/TaskList";
import WithLoader from "@/components/WithLoader";
import useFirebaseDBActions from "@/components/service/firebaseDBService";
import { TaskInterface } from "@/components/types/task";
import FloatingActionButton from "@/components/FloatingActionButton";

const HomePage = () => {
  const [searchText, setSearchText] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getTodos } = useFirebaseDBActions();

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
          <WithLoader
            apiFn={() => getTodos(searchText)}
            dependencies={searchText}
          >
            {({ data: tasks }: { data: TaskInterface[] }) => {
              return (
                <>
                  {isEmpty(tasks) ? (
                    <EmptyTask searchText={searchText} />
                  ) : (
                    <TaskList tasks={tasks} />
                  )}
                </>
              );
            }}
          </WithLoader>

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
