export interface CreateUserInterface {
  userName: string;
  userEmail: string;
  password: string;
  confirmPassword: string;
}

export interface UserInterface {
  id: string;
  name: string;
  email: string;
}

export interface SignInUserInterface {
  userEmail: string;
  password: string;
}
