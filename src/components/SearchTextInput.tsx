import { Input, InputProps } from "@chakra-ui/react";

const SearchTextInput = ({
  searchText,
  onSearchTextChange,
  ...props
}: {
  searchText: string;
  onSearchTextChange: (val: string) => void;
} & InputProps) => {
  return (
    <Input
      value={searchText}
      onChange={(e) => onSearchTextChange(e.target.value)}
      maxW={["auto", null, "350px"]}
      placeholder="Search Task"
      fontSize={["12px", null, "16px"]}
      {...props}
    />
  );
};

export default SearchTextInput;
