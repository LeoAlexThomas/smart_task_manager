import { Box, HStack, Text } from "@chakra-ui/react";

const Header = ({
  title,
  actions,
}: {
  title: string;
  actions?: React.ReactNode;
}) => {
  return (
    <Box
      w="100%"
      boxShadow="0px 0px 5px 2px #00000020"
      pos="sticky"
      top={0}
      bg="white"
      zIndex={99}
    >
      <HStack maxW="1600px" mx="auto" justifyContent="space-between" p={4}>
        <Text
          fontSize={["16px", null, "24px"]}
          fontWeight={500}
          lineHeight="1.2"
        >
          {title}
        </Text>
        {actions}
      </HStack>
    </Box>
  );
};
export default Header;
