import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state() {
    return {
      id: null as null | string,
    };
  },
  getters: {
    isAuthenticated: (state) => !!state.id,
  },
});
