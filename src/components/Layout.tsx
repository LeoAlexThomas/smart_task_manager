import { SimpleGrid, VStack } from "@chakra-ui/react";
import Header from "./Header";
import SideBar from "./SideBar";

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
      <SimpleGrid templateColumns={"250px 1fr"} spacing="12px">
        <SideBar />
        {children}
      </SimpleGrid>
    </VStack>
  );
};

export default Layout;
