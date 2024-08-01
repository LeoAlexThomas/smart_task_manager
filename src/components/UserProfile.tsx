import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useUserInfo } from "./context/userInfo";
import { logout } from "./service/userAuthService";
import { useFirebaseApp } from "./context/firebaseApp";
import useCustomToast, { ToastStatusEnum } from "./hook/useCustomToast";
import { useRouter } from "next/router";

const UserProfile = () => {
  const router = useRouter();
  const { userEmail } = useUserInfo();
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
    const response = await logout(auth);
    if (response.isSuccess) {
      showToast({
        title: response.message,
        status: ToastStatusEnum.success,
      });
      router.reload();
      return;
    }
    showToast({
      title: response.message,
      status: ToastStatusEnum.error,
    });
  };

  return (
    <Menu>
      <MenuButton>
        <Avatar name={userEmail ?? ""} w="28px" h="28px" />
      </MenuButton>
      <MenuList>
        {userEmail && <MenuItem>{userEmail}</MenuItem>}
        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserProfile;
