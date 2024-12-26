export interface CreateUserInterface {
  userName: string;
  userEmail: string;
  password: string;
  confirmPassword: string;
}

export interface UserInterface {
  userId: string;
  userName: string;
  userEmail: string;
}

export interface SignInUserInterface {
  userEmail: string;
  password: string;
}
