import { Button, ButtonProps } from "@chakra-ui/react";

const PrimaryButton = (props: ButtonProps) => {
  return (
    <Button
      bgColor="blue.500"
      color="white"
      size={["md", null, "lg"]}
      {...props}
    />
  );
};

export default PrimaryButton;
