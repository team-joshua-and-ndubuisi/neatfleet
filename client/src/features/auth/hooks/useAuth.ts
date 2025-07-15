import { useMutation } from "@tanstack/react-query";
import { login, signup } from "../api";
import { LoginBodyT, SignupBodyT, AuthResponseT } from "../authTypes";

export const useAuth = () => {
  return {
    login: useMutation({
      mutationKey: ["login"],
      mutationFn: (body: LoginBodyT): Promise<AuthResponseT> => login(body),
    }),
    signup: useMutation({
      mutationKey: ["signup"],
      mutationFn: (body: SignupBodyT): Promise<AuthResponseT> => signup(body),
    }),
  };
};
