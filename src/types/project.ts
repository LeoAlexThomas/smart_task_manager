import { UserInterface } from "./user";

export interface ProjectInterface {
  title: string;
  description: string;
  members: UserInterface[];
}

export interface CreateProjectInterface {
  title: string;
  description: string;
  members: String[];
}
