import { VStack, Text, chakra, Image } from "@chakra-ui/react";
import isEmpty from "lodash/isEmpty";
import Link from "next/link";

const EmptyTask = ({ searchText }: { searchText?: string }) => {
  return (
    <VStack h="100%" justifyContent="center">
      <Image
        src="https://img.icons8.com/pastel-glyph/64/website-error.png"
        w={["30px", null, "70px"]}
        h={["30px", null, "70px"]}
        alt=""
      />
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
      <Link
        href={`/createTask/${
          isEmpty(searchText) ? "" : `?title=${searchText}`
        }`}
        passHref
      >
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
