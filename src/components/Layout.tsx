import { SimpleGrid, VStack, Box } from "@chakra-ui/react";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import NavBar from "@/components/NavBar";
import { colors } from "@/components/utils";

const Layout = ({
  pageTitle,
  headerActions,
  children,
}: {
  pageTitle: string;
  headerActions?: React.ReactNode;
  children: React.ReactElement;
}) => {
  return (
    <VStack alignItems="stretch" spacing={0} bg={colors.primaryColor[0]}>
      <Header title={pageTitle} actions={headerActions} />
      <SimpleGrid
        templateColumns={["minmax(0,1fr)", null, "250px minmax(0,1fr)"]}
        spacing="12px"
        pb={["80px", null, 0]}
        w="100%"
        maxW="1600px"
        mx="auto"
      >
        <SideBar />
        <Box
          w="100%"
          maxW="1600px"
          mx="auto"
          pb={10}
          overflow="auto"
          h={["100%", null, "92vh"]}
          p={4}
        >
          {children}
        </Box>
      </SimpleGrid>
      <NavBar />
    </VStack>
  );
};

export default Layout;
