import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { create, StoreApi, UseBoundStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

//to handle combining class names with tailwind and clsx
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//to create a local store with zustand and persist it to localStorage by passing store instance and store name
export function createLocalStore<T>(
  store: UseBoundStore<StoreApi<T>>,
  storeName: string
) {
  return create(
    persist(store, {
      name: storeName,
      storage: createJSONStorage(() => localStorage),
    })
  );
}
