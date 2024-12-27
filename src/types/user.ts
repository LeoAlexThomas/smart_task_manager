export interface CreateUserInterface {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserInterface {
  _id: string;
  name: string;
  email: string;
}

export interface SignInUserInterface {
  userEmail: string;
  password: string;
}
