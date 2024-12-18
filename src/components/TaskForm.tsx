import { VStack, SimpleGrid } from "@chakra-ui/react";
import dayjs from "dayjs";
import InputField from "@/components/form/InputField";
import TextareaField from "@/components/form/TextareaField";
import { CreateTaskInterface, PriorityLevelEnum } from "@/types/task";
import { getTaskPriorityLabel, statesOfIndia } from "@/components/utils";
import SelectField from "@/components/form/SelectField";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const TaskForm = ({
  formId,
  defaultValues,
  onSubmit,
}: {
  formId: string;
  defaultValues?: CreateTaskInterface;
  onSubmit: (value: CreateTaskInterface) => void;
}) => {
  const hForm = useForm<CreateTaskInterface>({
    mode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    hForm.reset(defaultValues);
  }, [defaultValues]);

  return (
    <form id={formId} onSubmit={hForm.handleSubmit(onSubmit)}>
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
          maxLength={500}
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
      </VStack>
    </form>
  );
};

export default TaskForm;
