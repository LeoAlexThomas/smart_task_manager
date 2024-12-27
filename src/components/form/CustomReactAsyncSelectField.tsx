import { CustomSelectOptions } from "@/types/common";
import {
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";
import { FormErrorMessage, TextProps } from "@chakra-ui/react";
import get from "lodash/get";
import CustomReactAsyncSelect from "../CustomReactAsyncSelect";

function CustomReactAsyncSelectField<T extends FieldValues>({
  hForm,
  name,
  rules,
  isMultiChoice,
  getOptions,
  title,
  titleProps,
  placeholder,
}: {
  hForm: UseFormReturn<T>;
  name: Path<T>;
  rules: RegisterOptions<T>;
  isMultiChoice: boolean;
  getOptions: (val: string) => Promise<CustomSelectOptions[]>;
  title?: string;
  titleProps?: TextProps;
  placeholder?: string;
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
            <CustomReactAsyncSelect
              isMultiChoice={isMultiChoice}
              onChange={onChange}
              value={value}
              getOptions={getOptions}
              title={title}
              titleProps={titleProps}
              placeholder={placeholder}
              showStar={rules?.required === true}
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
