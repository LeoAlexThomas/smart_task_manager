import EmptyTask from "@/components/EmptyTask";
import { dummyTaskList } from "@/components/utils";
import {
  Box,
  IconButton,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { isEmpty } from "lodash";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { AddCircle } from "@emotion-icons/fluentui-system-regular/AddCircle";
import Layout from "@/components/Layout";
import SearchMenuPopup from "@/components/SearchMenuPopup";
import SearchTextInput from "@/components/SearchTextInput";
import TaskList from "@/components/TaskList";

const HomePage = () => {
  const [searchText, setSearchText] = useState<string>("");
  const filteredTasks = dummyTaskList.filter((task) =>
    task.title.toLowerCase().includes(searchText.toLowerCase())
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isTablet = useBreakpointValue({ base: true, md: false });

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
          {isEmpty(filteredTasks) ? (
            <EmptyTask searchText={searchText} />
          ) : (
            <TaskList tasks={filteredTasks} />
          )}
          <Box
            position="fixed"
            bottom={["90px", null, "20px"]}
            right={["20px", null, null, null, null, "150px"]}
          >
            <Link
              href={`/createTask/${
                isEmpty(searchText) ? "" : `?title=${searchText}`
              }`}
              passHref
            >
              <IconButton
                aria-label="Add Task"
                icon={
                  <AddCircle size={isTablet ? "25px" : "30px"} color="white" />
                }
                borderRadius="full"
                size="md"
                bgColor="blue.500"
                _hover={{
                  bgColor: "blue.600",
                }}
              />
            </Link>
          </Box>
        </>
      </Layout>
    </Box>
  );
};

export default HomePage;
