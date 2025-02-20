import {
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useUserInfo } from "@/context/userInfo";
import { colors, logout } from "@/components/utils";
import useCustomToast, { ToastStatusEnum } from "@/hook/useCustomToast";
import { useRouter } from "next/router";
import random from "lodash/random";

const UserProfile = () => {
  const router = useRouter();
  const { userEmail, userName } = useUserInfo();
  const { showToast } = useCustomToast();
  const handleLogOut = async () => {
    logout();
    showToast({
      title: "Logged out",
      status: ToastStatusEnum.success,
    });
    router.reload();
  };

  return (
    <Menu>
      <MenuButton>
        <Avatar
          name={userName}
          // w={["28px", "40px"]}
          // h={["28px", "40px"]}
          size={["sm", null, "md"]}
          backgroundColor={colors.secondaryColor[random(0, 7)]}
          border={`2px solid ${colors.primaryColor[0]}`}
          color={colors.primaryColor[0]}
        />
      </MenuButton>
      <MenuList>
        <MenuItem>
          <VStack alignItems="stretch" spacing={"4px"}>
            <Text
              fontSize={["16px", null, "20px"]}
              lineHeight="1.21"
              fontWeight={500}
            >
              {userName}
            </Text>
            <Text
              fontSize={["12px", null, "14px"]}
              lineHeight="1.15"
              fontWeight={400}
            >
              {userEmail}
            </Text>
          </VStack>
        </MenuItem>
        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserProfile;
