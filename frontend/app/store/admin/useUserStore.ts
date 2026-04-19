import {
  getUserById,
  getUsers,
  deleteUser,
  restoreUser,
  toggleUserStatus,
} from "@/app/services/admin/userService";
import { IAdminUserState } from "@/app/types/admin/user";
import { create } from "zustand";

export const useUserStore = create<IAdminUserState>((set, get) => ({
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

  toggleUserStatus: async (id) => {
    set({ loading: true, error: null });
    try {
      await toggleUserStatus(id);
      set((state) => ({
        loading: false,
        users: state.users.map((item) =>
          item.id === id
            ? {
                ...item,
                status: item.status === "active" ? "banned" : "active",
              }
            : item,
        ),
      }));
    } catch (error: any) {
      set({
        error: error.message || "Failed to toggle user status",
        loading: false,
      });
      throw error;
    }
  },

  deleteUser: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteUser(id);
      set((state) => ({
        loading: false,
        users: state.users.map((item) =>
          item.id === id
            ? { ...item, deleted_at: new Date().toISOString() }
            : item,
        ),
      }));
    } catch (error: any) {
      set({ error: error.message || "Failed to delete user", loading: false });
      throw error;
    }
  },

  restoreUser: async (id) => {
    try {
      await restoreUser(id);
      set((state) => ({
        users: state.users.map((item) =>
          item.id === id ? { ...item, deleted_at: null } : item,
        ),
      }));
    } catch (error: any) {
      throw error;
    }
  },
}));
