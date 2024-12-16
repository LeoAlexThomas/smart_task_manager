import { Box, HStack, IconButton, SimpleGrid, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ArrowIosBack } from "@emotion-icons/evaicons-solid/ArrowIosBack";
import UserProfile from "@/components/UserProfile";
import { colors } from "@/components/utils";

const Header = ({
  title,
  actions,
}: {
  title: string;
  actions?: React.ReactNode;
}) => {
  const router = useRouter();
  const showBack = router.asPath !== "/";
  const handleBack = () => {
    router.back();
  };

  return (
    <Box
      w="100%"
      boxShadow="0px 0px 5px 2px #00000020"
      pos="sticky"
      top={0}
      bg={colors.secondaryColor[1]}
      zIndex={99}
    >
      <HStack maxW="1600px" mx="auto" justifyContent="space-between" p={4}>
        <SimpleGrid
          templateColumns={
            showBack
              ? ["15px minmax(0, 1fr)", "25px minmax(0, 1fr)"]
              : "minmax(0, 1fr)"
          }
          spacing={[4, null, 6]}
          alignItems="center"
        >
          {showBack && (
            <IconButton
              aria-label="back"
              icon={<ArrowIosBack color={colors.primaryColor[0]} size="25px" />}
              onClick={handleBack}
              bgColor="transparent"
              _hover={{}}
              _active={{}}
            />
          )}
          <Text
            fontSize={["20px", null, "24px"]}
            fontWeight={500}
            lineHeight="1.2"
            color={colors.primaryColor[0]}
          >
            {title}
          </Text>
        </SimpleGrid>
        <HStack gap={[4, null, 8]}>
          {actions} <UserProfile />
        </HStack>
      </HStack>
    </Box>
  );
};
export default Header;
