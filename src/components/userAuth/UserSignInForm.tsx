import { VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../form/InputField";
import useCustomToast, { ToastStatusEnum } from "@/hook/useCustomToast";
import PrimaryButton from "../PrimaryButton";
import { SignInUserInterface } from "@/types/user";
import api from "../api";
import { useApi } from "@/hook/useApi";
import { setUserToken } from "../utils";

const UserSignInForm = () => {
  const router = useRouter();
  const { makeApiCall } = useApi();
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
    setIsLoading(true);
    makeApiCall<{ message: string; data: { accessToken: string } }>({
      apiFn: () =>
        api("/user/login", {
          method: "POST",
          data: {
            email: values.userEmail,
            password: values.password,
          },
        }),
      onSuccess: (res) => {
        setIsLoading(false);
        setUserToken(res.data.accessToken);
        showToast({
          title: res.message,
          status: ToastStatusEnum.success,
        });

        router.replace("/");
      },
      onFailure: (err) => {
        setIsLoading(false);
        showToast({
          title: (err as any).message,
          status: ToastStatusEnum.error,
        });
      },
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
