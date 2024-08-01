import { Center, VStack, Box, Tabs, TabList, Tab } from "@chakra-ui/react";
import { useState } from "react";
import UserSignUpForm from "./UserSignUpForm";
import UserSignInForm from "./UserSignInForm";

const UserAuthenticationTabs = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  return (
    <Center w="100%" p={5}>
      <VStack w="100%" alignItems="stretch" spacing={[5, null, 10]}>
        <Box
          w="fit-content"
          border="1px solid #00000050"
          alignSelf="center"
          borderRadius="full"
        >
          <Tabs
            variant="soft-rounded"
            index={selectedTab}
            onChange={setSelectedTab}
            _selected={{
              bgColor: "blue.500",
              color: "white",
            }}
          >
            <TabList>
              <Tab>Sign Up</Tab>
              <Tab>Sign In</Tab>
            </TabList>
          </Tabs>
        </Box>
        {selectedTab === 0 ? <UserSignUpForm /> : <UserSignInForm />}
      </VStack>
    </Center>
  );
};

export default UserAuthenticationTabs;
