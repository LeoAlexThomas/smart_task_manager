import UserSignIn from "@/components/userAuth/UserSignIn";
import UserSignUp from "@/components/userAuth/UserSignUp";
import {
  Center,
  Image,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

const SignIn = () => {
  return (
    <SimpleGrid columns={[1, null, 2]}>
      <Image src="/images/intro.webp" alt="intro" w="100%" h="100%" />
      <UserAuthentication />
    </SimpleGrid>
  );
};

const UserAuthentication = () => {
  return (
    <Center>
      <Tabs>
        <TabList>
          <Tab>Sign In</Tab>
          <Tab>Sign Up</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserSignIn />
          </TabPanel>
          <TabPanel>
            <UserSignUp />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Center>
  );
};

export default SignIn;
