import AsyncSelect from "react-select/async";
import { CustomSelectOptions } from "@/types/common";
import {
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";
import { FormErrorMessage } from "@chakra-ui/react";
import get from "lodash/get";

function CustomReactAsyncSelectField<T extends FieldValues>({
  hForm,
  name,
  rules,
  isMultiChoice,
  getOptions,
}: {
  hForm: UseFormReturn<T>;
  name: Path<T>;
  rules: RegisterOptions<T>;
  isMultiChoice: boolean;
  getOptions: (val: string) => Promise<CustomSelectOptions[]>;
}) {
  const { control } = hForm;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ formState: { errors }, field: { onChange, value } }) => {
        const error = get(errors, name);
        return (
          <>
            <AsyncSelect
              cacheOptions
              defaultOptions
              isMulti={isMultiChoice}
              onChange={(val: any) => {
                console.log("Selected Value: ", val);
              }}
              value={value}
              loadOptions={getOptions}
            />
            <FormErrorMessage>
              {error?.message ?? error?.type === "required"
                ? "This field is required"
                : "Something went wrong"}
            </FormErrorMessage>
          </>
        );
      }}
    />
  );
}

export default CustomReactAsyncSelectField;
