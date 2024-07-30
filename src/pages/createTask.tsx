import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/SelectField";
import TextareaField from "@/components/form/TextareaField";
import Layout from "@/components/Layout";
import PrimaryButton from "@/components/PrimaryButton";
import {
  CreateTaskInterface,
  PriorityLevelEnum,
} from "@/components/types/task";
import { getTaskPriorityLabel, statesOfIndia } from "@/components/utils";
import { SimpleGrid, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import { isArray, isNil } from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Save } from "@emotion-icons/fa-regular/Save";

const defaultTaskValues: CreateTaskInterface = {
  title: "",
  description: "",
  endDate: "",
  location: "",
  priorityLevel: "",
};

const CreateTask = () => {
  const router = useRouter();
  const hForm = useForm<CreateTaskInterface>({
    mode: "onChange",
    defaultValues: defaultTaskValues,
  });

  const { reset } = hForm;

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const queryTitle = router.query.title;
    if (isNil(queryTitle)) {
      return;
    }
    reset({
      ...defaultTaskValues,
      title: isArray(queryTitle) ? queryTitle[0] : queryTitle,
    });
  }, [router.isReady]);

  const onSubmit = (values: CreateTaskInterface) => {
    console.log("onSubmit: ", values);
  };

  return (
    <>
      <Head>
        <title>Create Task</title>
      </Head>
      <Layout pageTitle="Add Task">
        <form onSubmit={hForm.handleSubmit(onSubmit)}>
          <VStack alignItems="stretch" spacing={["12px", null, "16px"]} p={4}>
            <InputField
              hForm={hForm}
              name="title"
              rules={{
                required: true,
              }}
              title="Title"
              placeholder="Enter task title..."
            />
            <TextareaField
              hForm={hForm}
              name="description"
              rules={{
                required: true,
              }}
              title="Description"
              placeholder="Enter task details..."
              resize="none"
            />
            <SimpleGrid columns={[1, 2]} spacing="12px">
              <InputField
                hForm={hForm}
                name="endDate"
                rules={{
                  required: true,
                }}
                title="Due Date"
                placeholder="Select due date..."
                type="date"
                min={dayjs().add(1, "day").toISOString().split("T")[0]}
              />
              <SelectField
                hForm={hForm}
                name="priorityLevel"
                rules={{
                  required: true,
                }}
                title="Priority"
                placeholder="Select priority..."
                options={Object.values(PriorityLevelEnum).map((priority) => ({
                  label: getTaskPriorityLabel(priority),
                  value: priority,
                }))}
              />
            </SimpleGrid>
            <SelectField
              hForm={hForm}
              name="location"
              rules={{
                required: true,
              }}
              title="Location"
              placeholder="Select location..."
              options={statesOfIndia.map((state) => ({
                label: state,
                value: state,
              }))}
            />
            <PrimaryButton
              leftIcon={<Save width="25px" height="25px" color="white" />}
              maxW={["auto", null, "200px"]}
              alignSelf={["stretch", null, "flex-end"]}
              _hover={{
                bgColor: "blue.600",
              }}
              pos={["fixed", null, "relative"]}
              bottom={["85px", null, 0]}
              left={[4, null, 0]}
              right={[4, null, 0]}
              px={4}
              type="submit"
            >
              Save
            </PrimaryButton>
          </VStack>
        </form>
      </Layout>
    </>
  );
};

export default CreateTask;
