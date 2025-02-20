import {
  PopoverProps,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@chakra-ui/react";
import { Search } from "@emotion-icons/boxicons-regular/Search";
import SearchTextInput from "@/components/SearchTextInput";

const SearchMenuPopup = ({
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

export default SearchMenuPopup;
