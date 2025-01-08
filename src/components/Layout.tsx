import { SimpleGrid, VStack, Box } from "@chakra-ui/react";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import NavBar from "@/components/NavBar";
import { colors } from "@/components/utils";

const Layout = ({ children }: { children: React.ReactElement }) => {
  return (
    <VStack
      alignItems="stretch"
      height="inherit"
      spacing={0}
      bg={colors.primaryColor[0]}
    >
      <Header title="Smart Task Manager" />
      <SimpleGrid
        templateColumns={["minmax(0,1fr)", null, "250px minmax(0,1fr)"]}
        spacing="12px"
        pb={["80px", null, 0]}
        w="100%"
        maxW="1600px"
        mx="auto"
        h="inherit"
      >
        <SideBar />
        <Box w="100%" maxW="1600px" mx="auto" pb={10} overflow="auto" p={4}>
          {children}
        </Box>
      </SimpleGrid>
      <NavBar />
    </VStack>
  );
};

export default Layout;
