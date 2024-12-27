import AsyncSelect from "react-select/async";
import { CustomSelectOptions } from "@/types/common";

const CustomReactAsyncSelect = ({
  isMultiChoice,
  getOptions,
}: {
  isMultiChoice: boolean;
  getOptions: (val: string) => Promise<CustomSelectOptions[]>;
}) => {
  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      isMulti={isMultiChoice}
      onChange={(val: any) => {
        console.log("Selected Value: ", val);
      }}
      loadOptions={getOptions}
    />
  );
};

export default CustomReactAsyncSelect;
