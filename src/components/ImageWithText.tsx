import {
  Text,
  TextProps,
  SimpleGrid,
  Image,
  ImageProps,
} from "@chakra-ui/react";

const ImageWithText = ({
  imageSrc,
  imageProps,
  text,
  textProps,
}: {
  imageSrc: string;
  imageProps?: Omit<ImageProps, "src">;
  text: string;
  textProps?: TextProps;
}) => {
  return (
    <SimpleGrid templateColumns={"20px 1fr"} alignItems="center" spacing={3}>
      <Image src={imageSrc} alt="" w="20px" h="20px" {...imageProps} />
      <Text
        fontSize={["12px", null, "16px"]}
        fontWeight={400}
        lineHeight="1.17"
        {...textProps}
      >
        {text}
      </Text>
    </SimpleGrid>
  );
};

export default ImageWithText;
