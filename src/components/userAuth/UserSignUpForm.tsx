import { Box, chakra, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useFirebaseApp } from "../context/firebaseApp";
import InputField from "../form/InputField";
import useCustomToast, { ToastStatusEnum } from "../hook/useCustomToast";
import PrimaryButton from "../PrimaryButton";
import { createUser } from "../service/userAuthService";
import { CreateUserInterface } from "../types/user";

const UserSignUpForm = () => {
  const router = useRouter();
  const { auth } = useFirebaseApp();
  const { showToast } = useCustomToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const hForm = useForm<CreateUserInterface>({
    mode: "onChange",
    defaultValues: {
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

    if (!auth) {
      showToast({
        title: "Firebase Auth is not available",
        status: ToastStatusEnum.error,
      });
      return;
    }

    setIsLoading(true);
    const response = await createUser(values.userEmail, values.password, auth);
    setIsLoading(false);
    showToast({
      title: response.message,
      status: response.isSuccess
        ? ToastStatusEnum.success
        : ToastStatusEnum.error,
    });
    if (response.isSuccess) {
      router.replace("/");
    }
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
