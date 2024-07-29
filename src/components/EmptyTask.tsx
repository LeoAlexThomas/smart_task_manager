import { VStack, Text, chakra } from "@chakra-ui/react";
import isEmpty from "lodash/isEmpty";
import Link from "next/link";

const EmptyTask = ({ searchText }: { searchText: string }) => {
  return (
    <VStack h="100%" justifyContent="center">
      <Text
        fontSize={["12px", null, "16px"]}
        lineHeight="1.17"
        color="#00000070"
        textAlign="center"
      >
        No Task Found...{" "}
        <chakra.span fontStyle="italic">
          {isEmpty(searchText) ? "" : ` for ${searchText}`}
        </chakra.span>
      </Text>
      <Link href={`/createTask/?title=${searchText}`} passHref>
        <Text
          fontSize={["12px", null, "16px"]}
          lineHeight="1.17"
          color="blue"
          textDecoration="underline"
        >
          Try add task
        </Text>
      </Link>
    </VStack>
  );
};

export default EmptyTask;
