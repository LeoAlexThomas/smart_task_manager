export enum PriorityLevelEnum {
    low = "low",
    medium = "medium",
    high = "high",
}

export interface TaskInterface {
    id: number;
    title: string;
    description: string;
    endDate: string;
    priorityLevel: PriorityLevelEnum;
    location: string;
    isCompleted: boolean;
}