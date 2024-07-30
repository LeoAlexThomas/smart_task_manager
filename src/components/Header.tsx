import {
  Box,
  HStack,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverContent,
  PopoverProps,
  PopoverTrigger,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { Search } from "@emotion-icons/boxicons-regular/Search";
import SearchTextInput from "./SearchTextInput";

const Header = ({
  searchText,
  onSearchChange,
}: {
  searchText: string;
  onSearchChange: (e: string) => void;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          Task Manager
        </Text>
        <SearchTextInput
          searchText={searchText}
          onSearchTextChange={onSearchChange}
          display={["none", null, "block"]}
        />
        <Box display={["block", null, "none"]}>
          <SearchMenu
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            searchText={searchText}
            onSearchChange={onSearchChange}
            placement="bottom-start"
          />
        </Box>
      </HStack>
    </Box>
  );
};

const SearchMenu = ({
  searchText,
  onSearchChange,
  ...props
}: {
  searchText: string;
  onSearchChange: (e: string) => void;
} & PopoverProps) => {
  return (
    <Popover {...props}>
      <PopoverTrigger>
        <Search size="25px" />
      </PopoverTrigger>
      <PopoverContent>
        <SearchTextInput
          searchText={searchText}
          onSearchTextChange={onSearchChange}
        />
      </PopoverContent>
    </Popover>
  );
};

export default Header;
