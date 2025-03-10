import { VStack, Text, Image, StackProps } from "@chakra-ui/react";

const EmptyTask = ({
  message,
  showAddLink,
  ...props
}: {
  message?: React.ReactNode;
  showAddLink?: boolean;
} & StackProps) => {
  return (
    <VStack h="100%" justifyContent="center" {...props}>
      <Image
        src="https://img.icons8.com/pastel-glyph/64/website-error.png"
        w={["30px", null, "70px"]}
        h={["30px", null, "70px"]}
        alt=""
      />
      {message ?? (
        <Text
          fontSize={["12px", null, "16px"]}
          lineHeight="1.17"
          color="#00000070"
          textAlign="center"
        >
          No Task Found...
        </Text>
      )}
    </VStack>
  );
};

export default EmptyTask;
