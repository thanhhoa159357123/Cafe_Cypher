import { getUserById, getUsers } from "@/app/services/admin/userService";
import { IAdminUserState } from "@/app/types/admin/user";
import { create } from "zustand";

export const useUserStore = create<IAdminUserState>((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async (role) => {
    set({ loading: true, error: null });
    try {
      const response = await getUsers(role);
      set({ users: response, loading: false });
    } catch (error: any) {
      set({ error: error.message || "Failed to fetch users", loading: false });
    }
  },

  fetchUserById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await getUserById(id);
      set({ loading: false });
      return response;
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch user details",
        loading: false,
      });
      return null;
    }
  },
}));
