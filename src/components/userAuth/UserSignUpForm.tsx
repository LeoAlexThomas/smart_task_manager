import { Box, chakra, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import InputField from "@/components/form/InputField";
import useCustomToast, { ToastStatusEnum } from "@/hook/useCustomToast";
import { PrimaryButton } from "@/components/Buttons";
import { CreateUserInterface } from "@/types/user";
import api from "@/components/api";
import { useApi } from "@/hook/useApi";
import { ApiSuccessResponse, RegisterInfoResponse } from "@/types/common";
import { setUserToken } from "@/components/utils";

const UserSignUpForm = () => {
  const router = useRouter();
  const { showToast } = useCustomToast();
  const { makeApiCall } = useApi();
  const hForm = useForm<CreateUserInterface>({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
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

    makeApiCall<ApiSuccessResponse<RegisterInfoResponse>>({
      apiFn: () =>
        api("/user/register", {
          method: "POST",
          data: {
            name: values.name,
            email: values.email,
            password: values.password,
          },
        }),
      onSuccess: (res) => {
        setUserToken(res.data.accessToken);
        showToast({
          title: res.message,
          status: res.isSuccess
            ? ToastStatusEnum.success
            : ToastStatusEnum.error,
        });
        router.replace("/");
      },
      onFailure: (err: any) => {
        showToast({
          title: err?.response?.data?.message,
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
          name="name"
          title="User Name"
          rules={{ required: true }}
          placeholder="Enter your name..."
        />
        <InputField
          hForm={hForm}
          name="email"
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

        <PrimaryButton type="submit">Sign Up</PrimaryButton>
      </VStack>
    </form>
  );
};
export default UserSignUpForm;
