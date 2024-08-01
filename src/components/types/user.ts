export interface CreateUserInterface {
  userEmail: string;
  password: string;
  confirmPassword: string;
}

export interface SignInUserInterface {
  userEmail: string;
  password: string;
}
