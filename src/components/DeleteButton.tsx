import { Button, ButtonProps } from "@chakra-ui/react";

const DeleteButton = (props: ButtonProps) => {
  return (
    <Button
      variant="outline"
      color="#ff5b5b"
      border="1px solid"
      borderColor="#ff5b5b"
      size={["md", null, "lg"]}
      _hover={{
        bgColor: "#ff5b5b20",
        borderColor: "#ff5b5b",
      }}
      {...props}
    />
  );
};

export default DeleteButton;
