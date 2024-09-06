import { Box, chakra, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../form/InputField";
import useCustomToast, { ToastStatusEnum } from "../hook/useCustomToast";
import PrimaryButton from "../PrimaryButton";
import { CreateUserInterface } from "../types/user";
import api from "../api";
import { useApi } from "@/components/hook/useApi";

const UserSignUpForm = () => {
  const router = useRouter();
  const { showToast } = useCustomToast();
  const { makeApiCall } = useApi();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const hForm = useForm<CreateUserInterface>({
    mode: "onChange",
    defaultValues: {
      userName: "",
      userEmail: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: CreateUserInterface) => {
    if (values.password.length < 8) {
      showToast({
        title: "Password length must be greater than 8",
        status: ToastStatusEnum.error,
      });
      return;
    }
    if (values.password !== values.confirmPassword) {
      showToast({
        title: "Password and Confirm password must be same",
        status: ToastStatusEnum.error,
      });
      return;
    }

    setIsLoading(true);
    makeApiCall({
      apiFn: () =>
        api("/user/register", {
          method: "POST",
          data: {
            userName: values.userName,
            email: values.userEmail,
            password: values.password,
          },
        }),
      onSuccess: (res) => {
        setIsLoading(false);
        showToast({
          title: res.message,
          status: res.isSuccess
            ? ToastStatusEnum.success
            : ToastStatusEnum.error,
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
          name="userName"
          title="User Name"
          rules={{ required: true }}
          placeholder="Enter your name..."
        />
        <InputField
          hForm={hForm}
          name="userEmail"
          title="User Email"
          type="email"
          rules={{ required: true }}
          placeholder="Enter your email..."
        />
        <Box w="100%">
          <InputField
            hForm={hForm}
            name="password"
            title="Password"
            type="password"
            rules={{ required: true }}
            placeholder="Enter Password"
          />
          <Text fontSize="11px" lineHeight="1.25" pt={1}>
            <chakra.span color="red">*</chakra.span> Password length must be
            greater than 8
          </Text>
        </Box>

        <InputField
          hForm={hForm}
          name="confirmPassword"
          title="Confirm Password"
          rules={{ required: true }}
          placeholder="Enter Confirm Password"
        />

        <PrimaryButton type="submit" isLoading={isLoading}>
          Sign Up
        </PrimaryButton>
      </VStack>
    </form>
  );
};
export default UserSignUpForm;
