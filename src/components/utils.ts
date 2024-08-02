import random from "lodash/random";
import { PriorityLevelEnum } from "./types/task";
import { SideBarMenu } from "./types/common";
import Cookies from "js-cookie";

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
  {
    name: "Dashboard",
    url: "/dashboard",
    imageUrl: "/images/dashboard.svg",
    activeImageUrl: "/images/activeDashboard.svg",
  },
];

export const setUserToken = (userToken?: string) => {
  if (!userToken) {
    return;
  }
  Cookies.set(userTokenCookieName, userToken);
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
