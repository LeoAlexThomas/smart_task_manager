import { VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useFirebaseApp } from "../context/firebaseApp";
import InputField from "../form/InputField";
import useCustomToast, { ToastStatusEnum } from "../hook/useCustomToast";
import PrimaryButton from "../PrimaryButton";
import { loginUser } from "../service/userAuthService";
import { SignInUserInterface } from "../types/user";

const UserSignInForm = () => {
  const router = useRouter();
  const { auth } = useFirebaseApp();
  const { showToast } = useCustomToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const hForm = useForm<SignInUserInterface>({
    mode: "onChange",
    defaultValues: {
      userEmail: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInUserInterface) => {
    if (!auth) {
      showToast({
        title: "Firebase Auth is not available",
        status: ToastStatusEnum.error,
      });
      return;
    }

    setIsLoading(true);
    const response = await loginUser(values.userEmail, values.password, auth);
    setIsLoading(false);
    if (response.isSuccess) {
      showToast({
        title: response.message,
        status: ToastStatusEnum.success,
      });
      router.replace("/");
      return;
    }
    showToast({
      title: response.message,
      status: ToastStatusEnum.error,
    });
  };

  return (
    <form
      onSubmit={hForm.handleSubmit(onSubmit)}
      style={{
        width: "100%",
      }}
    >
      <VStack
        alignItems="stretch"
        maxW="400px"
        mx="auto"
        spacing={[4, null, 6]}
      >
        <InputField
          hForm={hForm}
          name="userEmail"
          title="User Email"
          type="email"
          rules={{ required: true }}
          placeholder="Enter your email..."
        />
        <InputField
          hForm={hForm}
          name="password"
          title="Password"
          type="password"
          rules={{ required: true }}
          placeholder="Enter Password"
        />

        <PrimaryButton type="submit" isLoading={isLoading}>
          Sign In
        </PrimaryButton>
      </VStack>
    </form>
  );
};
export default UserSignInForm;
