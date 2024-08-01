export interface SideBarMenu {
    name: string;
    url: string;
    imageUrl: string;
    activeImageUrl: string;
}

export interface ApiResponse {
    isSuccess: boolean;
    message: string;
}