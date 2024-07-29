"use client";

import EmptyTask from "@/components/EmptyTask";
import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import { dummyTaskList } from "@/components/utils";
import {
  Box,
  Center,
  IconButton,
  Text,
  VStack,
  chakra,
  useBreakpointValue,
} from "@chakra-ui/react";
import { isEmpty } from "lodash";
import Head from "next/head";
import Link from "next/link";
import { Fragment, useState } from "react";
import { AddCircle } from "@emotion-icons/fluentui-system-regular/AddCircle";
import Layout from "@/components/Layout";

const HomePage = () => {
  const [searchText, setSearchText] = useState<string>("");
  const filteredTasks = dummyTaskList.filter((task) =>
    task.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const isTablet = useBreakpointValue({ base: true, md: false });

  return (
    <Box bg="white" h="100vh">
      <Head>
        <title>Home Page</title>
      </Head>
      <Layout searchText={searchText} onSearchTextChange={setSearchText}>
        <>
          {isEmpty(filteredTasks) ? (
            <EmptyTask searchText={searchText} />
          ) : (
            <VStack
              maxW="1600px"
              mx="auto"
              alignItems="stretch"
              p={4}
              spacing={["12px", null, "16px"]}
            >
              {filteredTasks.map((task) => (
                <Fragment key={task.id}>
                  <TaskCard task={task} />
                </Fragment>
              ))}
            </VStack>
          )}
          <Link
            href={`/createTask/${
              isEmpty(searchText) ? "" : `?title=${searchText}`
            }`}
            passHref
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
            }}
          >
            <IconButton
              aria-label="Add Task"
              icon={
                <AddCircle size={isTablet ? "25px" : "30px"} color="white" />
              }
              borderRadius="full"
              size="md"
              bgColor="blue.500"
            />
          </Link>
        </>
      </Layout>
    </Box>
  );
};

export default HomePage;
