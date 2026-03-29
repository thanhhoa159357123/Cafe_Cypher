import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AuthState } from "../types/auth";
import { login, register } from "@/app/services/authService";
import { useCartStore } from "./useCartStore";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      access_token: null,
      token_type: null,
      isAuthenticated: false,

      login: async (email, password) => {
        try {
          const response = await login({ email, password });
          set({
            user: {
              last_name: response.user.last_name,
              first_name: response.user.first_name,
              email: response.user.email,
            },
            access_token: response.access_token,
            token_type: response.token_type,
            isAuthenticated: true,
          });

          useCartStore.getState().fetchCart();
        } catch (error) {
          console.error("Login failed:", error);
          throw error;
        }
      },

      register: async (last_name, first_name, email, password) => {
        try {
          const response = await register({
            last_name,
            first_name,
            email,
            password,
          });
          return response;
        } catch (error) {
          console.error("Registration failed:", error);
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          access_token: "",
          token_type: "",
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
