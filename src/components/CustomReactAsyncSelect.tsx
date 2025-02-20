import AsyncSelect from "react-select/async";
import { CustomSelectOptions } from "@/types/common";
import { chakra, Text, TextProps } from "@chakra-ui/react";

const CustomReactAsyncSelect = ({
  isMultiChoice,
  getOptions,
  title,
  titleProps,
  placeholder,
  value,
  onChange,
  showStar,
  isDisabled = false,
}: {
  isMultiChoice: boolean;
  getOptions: (val: string) => Promise<CustomSelectOptions[]>;
  title?: string;
  titleProps?: TextProps;
  placeholder?: string;
  value?: CustomSelectOptions;
  onChange?: (val: any) => void;
  showStar?: boolean;
  isDisabled?: boolean;
}) => {
  return (
    <>
      {title && (
        <Text
          fontSize={["12px", null, "16px"]}
          fontWeight={500}
          lineHeight="1.2"
          {...titleProps}
        >
          {title} {showStar && <chakra.span color="red">*</chakra.span>}
        </Text>
      )}
      <AsyncSelect
        cacheOptions
        defaultOptions
        isMulti={isMultiChoice}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        loadOptions={getOptions}
        isDisabled={isDisabled}
      />
    </>
  );
};

export default CustomReactAsyncSelect;
