import UserAuthenticationTabs from "@/components/userAuth/UserAuthenticationTabs";
import { Box, Center, Image, SimpleGrid } from "@chakra-ui/react";

const SignIn = () => {
  return (
    <SimpleGrid h="100vh" templateColumns={["1fr", null, "1fr 1px 1fr"]}>
      <Center display={["none", null, "flex"]}>
        <Image
          src="/images/intro.webp"
          alt="intro"
          w="100%"
          h="100%"
          maxW="700px"
          style={{
            aspectRatio: 1,
            objectFit: "contain",
          }}
        />
      </Center>
      <Box
        bgGradient="linear(to-b,  #e1e1e1,#00000050, #e1e1e1)"
        display={["none", null, "block"]}
      />
      <UserAuthenticationTabs />
    </SimpleGrid>
  );
};

export default SignIn;
