import { CustomSelectOptions } from "./common";
import { TaskInterface } from "./task";
import { UserInterface } from "./user";

export interface ProjectInterface {
  _id: string;
  title: string;
  description: string;
  members: UserInterface[];
  tasks: TaskInterface[];
}

export interface CreateProjectInterface {
  title: string;
  description: string;
  memberIds: CustomSelectOptions[];
}
