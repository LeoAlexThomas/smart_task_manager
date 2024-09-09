import {
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useUserInfo } from "./context/userInfo";
import { logout } from "./utils";
import { useFirebaseApp } from "./context/firebaseApp";
import useCustomToast, { ToastStatusEnum } from "./hook/useCustomToast";

const UserProfile = () => {
  const { userEmail, userName } = useUserInfo();
  const { auth } = useFirebaseApp();
  const { showToast } = useCustomToast();
  const handleLogOut = async () => {
    if (!auth) {
      showToast({
        title: "Firebase Auth is not available",
        status: ToastStatusEnum.error,
      });
      return;
    }
    logout();
    showToast({
      title: "Logged out",
      status: ToastStatusEnum.success,
    });
  };

  return (
    <Menu>
      <MenuButton>
        <Avatar name={userName} w="28px" h="28px" />
      </MenuButton>
      <MenuList>
        <MenuItem>
          <VStack alignItems="stretch" spacing={"4px"}>
            <Text
              fontSize={["16px", null, "16px"]}
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
