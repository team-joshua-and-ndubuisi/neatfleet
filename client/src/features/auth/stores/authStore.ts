import { create } from "zustand";
// import { CounterState } from '@/features/counter';
import { AuthResponseT } from "@/features/auth/";

interface AuthStore extends AuthResponseT {
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
  };
  setUserToken: (token: string) => void;
  initAuth: (auth: AuthResponseT) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: "",
  user: {
    firstName: "",
    lastName: "",
    isAdmin: false,
    id: "",
    email: "",
  },
  setUserToken: (token: string) => set(() => ({ token })),
  setUser: (user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
  }) => set(() => ({ user })),

  initAuth: (auth: AuthResponseT) => {
    set(() => ({
      token: auth.token,
      user: {
        id: auth.user.id,
        firstName: auth.user.firstName,
        lastName: auth.user.lastName,
        email: auth.user.email,
        isAdmin: auth.user.isAdmin,
      },
    }));
  },
}));
