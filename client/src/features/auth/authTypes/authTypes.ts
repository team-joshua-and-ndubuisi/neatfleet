export interface LoginBodyT {
  email: string;
  password: string;
}

export type AuthResponseT = {
  user: UserProfileT;
  token: string;
};

export interface SignupBodyT {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  phone: string;
}
export interface UserProfileT {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}
