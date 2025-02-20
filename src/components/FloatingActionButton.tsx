import { Box, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { AddCircle } from "@emotion-icons/fluentui-system-regular/AddCircle";

const FloatingActionButton = ({ onClick }: { onClick: () => void }) => {
  const isTablet = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      position="fixed"
      bottom="20px"
      right={["20px", null, null, null, null, "150px"]}
    >
      <IconButton
        aria-label="Add Task"
        icon={<AddCircle size={isTablet ? "25px" : "30px"} color="white" />}
        borderRadius="full"
        onClick={onClick}
        size="md"
        bgColor="blue.500"
        _hover={{
          bgColor: "blue.600",
        }}
      />
    </Box>
  );
};

export default FloatingActionButton;
