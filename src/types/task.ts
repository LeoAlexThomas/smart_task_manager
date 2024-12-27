export enum PriorityLevelEnum {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface TaskInterface {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  endDate: string;
  priorityLevel: PriorityLevelEnum;
  location: string;
  isCompleted: boolean;
  projectId: string;
  completedDate: string | null;
}

export interface CustomSelectModel {
  label: string;
  value: string;
}

export interface CreateTaskInterface {
  title: string;
  description: string;
  endDate: string; // ISO string
  priorityLevel: PriorityLevelEnum | ""; // "" is for default value in form value
  location: string;
  projectId: string;
}
