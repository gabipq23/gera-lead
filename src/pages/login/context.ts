import { AuthService } from "@/services/auth";
import { create } from "zustand";
import { AuthState, ILoginData} from "@/interfaces/login";

const authService = new AuthService();

export const useAuthContext = create<AuthState>((set, get, state) => ({
  user: null,
  login: async ({ email, senha }: ILoginData) => {
    const res = await authService.login({ email, senha });
    set({ user: res?.user ?? null });
  },
  logout: () => {
    authService.logout();
    set(state.getInitialState());
    console.log(get());
  },

  checkAuth: () => {
    const res = authService.getAuthToken();
    set({ user: res?.user ?? null });
  },
}));
