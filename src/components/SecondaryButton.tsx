import { Button, ButtonProps } from "@chakra-ui/react";

const SecondaryButton = (props: ButtonProps) => {
  return (
    <Button
      variant="outline"
      color="blue.500"
      border="1px solid"
      borderColor="blue.500"
      size={["md", null, "lg"]}
      _hover={{
        bgColor: "blue.200",
        borderColor: "blue.500",
      }}
      {...props}
    />
  );
};

export default SecondaryButton;
