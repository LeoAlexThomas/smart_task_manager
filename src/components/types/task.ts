export enum PriorityLevelEnum {
    low = "low",
    medium = "medium",
    high = "high",
}



export interface CompletedTaskInterface {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    endDate: string;
    priorityLevel: PriorityLevelEnum;
    location: string;
    isCompleted: true;
    completedDate: string;
}

export interface PendingsTaskInterface {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    endDate: string;
    priorityLevel: PriorityLevelEnum;
    location: string;
    isCompleted: false;
}

export type TaskInterface = CompletedTaskInterface | PendingsTaskInterface;

export interface CreateTaskInterface {
    title: string;
    description: string;
    endDate: string; // ISO string
    priorityLevel: PriorityLevelEnum| ""; // "" is for default value in form value
    location: string;
}