import { SimpleGrid, VStack, Box } from "@chakra-ui/react";
import Header from "./Header";
import SideBar from "./SideBar";
import NavBar from "./NavBar";

const Layout = ({
  searchText,
  onSearchTextChange,
  children,
}: {
  searchText: string;
  onSearchTextChange: (val: string) => void;
  children: React.ReactElement;
}) => {
  return (
    <VStack alignItems="stretch" spacing={0}>
      <Header searchText={searchText} onSearchChange={onSearchTextChange} />
      <SimpleGrid
        templateColumns={["minmax(0,1fr)", null, "250px minmax(0,1fr)"]}
        spacing="12px"
        pb={["80px", null, 0]}
        maxW="1600px"
        mx="auto"
      >
        <SideBar />
        <Box w="100%" maxW="1600px" mx="auto" pb={10} overflow="auto" h="92vh">
          {children}
        </Box>
      </SimpleGrid>
      <NavBar />
    </VStack>
  );
};

export default Layout;
