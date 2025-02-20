import random from "lodash/random";
import { PriorityLevelEnum, TaskStatusEnum } from "@/types/task";
import { SideBarMenu } from "@/types/common";
import Cookies from "js-cookie";
import { mutate } from "swr";

export const colors = {
  primaryColor: [
    "#f5f5f5",
    "#dcdcdc",
    "#d3d3d3",
    "#c0c0c0",
    "#b0b0b0",
    "#a9a9a9",
    "#696969",
    "#505050",
    "#383838",
  ],
  secondaryColor: [
    "#85a5c2",
    "#7196b8",
    "#5d87ae",
    "#4978a4",
    "#356a9a",
    "#2f5f8a",
    "#2a547b",
    "#254a6b",
    "#1f3f5c",
  ],
};

export const createTaskFormId = "createTaskFormId";
export const editTaskFormId = "editTaskFormId";
export const createProjectFormId = "createProjectFormId";

export const userTokenCookieName = "userToken";

export const unAutherizedPath = ["/signIn/"];

export const statesOfIndia: string[] = [
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
  "Puducherry",
];

export const menus: SideBarMenu[] = [
  {
    name: "Home",
    url: "/",
    imageUrl: "/images/home.svg",
    activeImageUrl: "/images/activeHome.svg",
  },
  // {
  //   name: "Dashboard",
  //   url: "/dashboard",
  //   imageUrl: "/images/dashboard.svg",
  //   activeImageUrl: "/images/activeDashboard.svg",
  // },
];

export const setUserToken = (userToken?: string) => {
  if (!userToken) {
    return;
  }
  Cookies.set(userTokenCookieName, userToken, { expires: 30 });
};

export const getRandomPriorityEnum = (): PriorityLevelEnum => {
  const currentIndex = random(1, 3);
  switch (currentIndex) {
    case 1:
      return PriorityLevelEnum.low;
    case 2:
      return PriorityLevelEnum.medium;
    default:
      return PriorityLevelEnum.high;
  }
};

export const getTaskPriorityLabel = (priority: PriorityLevelEnum): string => {
  switch (priority) {
    case PriorityLevelEnum.low:
      return "Low";
    case PriorityLevelEnum.medium:
      return "Medium";
    default:
      return "High";
  }
};

export const getTaskStatusLabel = (priority: TaskStatusEnum): string => {
  switch (priority) {
    case TaskStatusEnum.initial:
      return "Initial";
    case TaskStatusEnum.inProcess:
      return "In Progress";
    case TaskStatusEnum.completed:
      return "Completed";
    default:
      return "Blocked";
  }
};

export const getPriorityColor = (priority: PriorityLevelEnum): string => {
  switch (priority) {
    case PriorityLevelEnum.low:
      return "#44bb44";
    case PriorityLevelEnum.medium:
      return "#4e4ebb";
    default:
      return "#ff5b5b";
  }
};

export const getStatusColor = (status: TaskStatusEnum): string => {
  switch (status) {
    case TaskStatusEnum.initial:
      return "#44bb44BB";
    case TaskStatusEnum.blocked:
      return "#ff5b5bBB";
    case TaskStatusEnum.completed:
      return "#4e4ebbBB";
    default:
      return "#ff5baaBB";
  }
};

export const logout = () => {
  Cookies.remove(userTokenCookieName);
};

export const mutateAllTaskStatusApiCall = ({
  projectId,
}: {
  projectId: string;
}) => {
  Object.values(TaskStatusEnum).map((status) =>
    mutate(`/task/status/${status}/?projectId=${projectId}`)
  );
};
