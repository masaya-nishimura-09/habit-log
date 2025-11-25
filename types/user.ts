export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: string;
}

export interface RegisterState {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmedPassword?: string[];
  };
  message?: string | null;
}

export type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};
