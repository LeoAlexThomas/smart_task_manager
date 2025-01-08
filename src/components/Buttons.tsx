import { Button, ButtonProps } from "@chakra-ui/react";

const PrimaryButton = (props: ButtonProps) => {
  return (
    <Button
      backgroundColor="blue.500"
      color="white"
      borderRadius="12px"
      _hover={{
        bgColor: "blue.600",
      }}
      {...props}
    />
  );
};

const SecondaryButton = (props: ButtonProps) => {
  return (
    <Button
      variant="outline"
      color="blue.500"
      borderRadius="12px"
      border="1px solid"
      borderColor="blue.500"
      _hover={{
        bgColor: "blue.50",
        borderColor: "blue.500",
      }}
      {...props}
    />
  );
};

export { PrimaryButton, SecondaryButton };
