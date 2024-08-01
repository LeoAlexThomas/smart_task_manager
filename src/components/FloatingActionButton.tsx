import { Box, IconButton, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import { AddCircle } from "@emotion-icons/fluentui-system-regular/AddCircle";

const FloatingActionButton = ({ pageLink }: { pageLink: string }) => {
  const isTablet = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      position="fixed"
      bottom={["90px", null, "20px"]}
      right={["20px", null, null, null, null, "150px"]}
    >
      <Link href={pageLink} passHref>
        <IconButton
          aria-label="Add Task"
          icon={<AddCircle size={isTablet ? "25px" : "30px"} color="white" />}
          borderRadius="full"
          size="md"
          bgColor="blue.500"
          _hover={{
            bgColor: "blue.600",
          }}
        />
      </Link>
    </Box>
  );
};

export default FloatingActionButton;
