import  random from "lodash/random";
import  range from "lodash/range";
import { PriorityLevelEnum, TaskInterface } from "./types/TaskInterface";
import dayjs from "dayjs";

export const statesOfIndia: string[] =  [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry"
];


export const getRandomPriorityEnum = (): PriorityLevelEnum => {
    const currentIndex = random(1, 3);
    switch (currentIndex) {
        case 1:
            return  PriorityLevelEnum.low;
        case 2:
            return PriorityLevelEnum.medium;
        default:
            return PriorityLevelEnum.high;
    }
}

export const getTaskPriorityLabel = (priority: PriorityLevelEnum): string => {
    switch (priority) {
        case PriorityLevelEnum.low:
            return "Low"; 
        case PriorityLevelEnum.medium:
            return "Medium";           
        default:
            return "High";
    }
}

export const getPriorityColor = (priority: PriorityLevelEnum): string => {
    switch (priority) {
        case PriorityLevelEnum.low:
            return "green"; 
        case PriorityLevelEnum.medium:
            return "blue";           
        default:
            return "red";
    }
}

export const dummyTaskList: TaskInterface[] = [
    {
        id: 1,
        title: `Task 1`,
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        endDate: dayjs()
          .add(1, "days")
          .toISOString(),
        location: statesOfIndia[0],
        priorityLevel: PriorityLevelEnum.low,
        isCompleted: false,
      },
      {
        id: 2,
        title: `Task 2`,
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        endDate: dayjs()
          .add(2, "days")
          .toISOString(),
        location: statesOfIndia[1],
        priorityLevel: PriorityLevelEnum.medium,
        isCompleted: true,
      },
      {
        id: 3,
        title: `Task 3`,
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        endDate: dayjs()
          .add(3, "days")
          .toISOString(),
        location: statesOfIndia[2],
        priorityLevel: PriorityLevelEnum.high,
        isCompleted: false,
      },
      {
        id: 4,
        title: `Task 4`,
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        endDate: dayjs()
          .add(4, "days")
          .toISOString(),
        location: statesOfIndia[3],
        priorityLevel: PriorityLevelEnum.medium,
        isCompleted: false,
      },
      {
        id: 5,
        title: `Task 5`,
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        endDate: dayjs()
          .add(5, "days")
          .toISOString(),
        location: statesOfIndia[4],
        priorityLevel: PriorityLevelEnum.high,
        isCompleted: true,
      },
      {
        id: 6,
        title: `Task 6`,
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        endDate: dayjs()
          .add(6, "days")
          .toISOString(),
        location: statesOfIndia[5],
        priorityLevel: PriorityLevelEnum.low,
        isCompleted: false,
      },
      {
        id: 7,
        title: `Task 7`,
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        endDate: dayjs()
          .add(7, "days")
          .toISOString(),
        location: statesOfIndia[6],
        priorityLevel: PriorityLevelEnum.medium,
        isCompleted: false,
      },
      {
        id: 8,
        title: `Task 8`,
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        endDate: dayjs()
          .add(8, "days")
          .toISOString(),
        location: statesOfIndia[7],
        priorityLevel: PriorityLevelEnum.low,
        isCompleted: false,
      },
      {
        id: 9,
        title: `Task 9`,
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        endDate: dayjs()
          .add(2, "days")
          .toISOString(),
        location: statesOfIndia[5],
        priorityLevel: PriorityLevelEnum.high,
        isCompleted: false,
      },
      {
        id: 10,
        title: `Task 10`,
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        endDate: dayjs()
          .add(12, "days")
          .toISOString(),
        location: statesOfIndia[10],
        priorityLevel: PriorityLevelEnum.high,
        isCompleted: true,
      },
];
  