import { create } from "zustand";
import { GithubUser, GithubRepo } from "@/features/github/api";

interface DashboardState {
    username: string;
    user: GithubUser | null;
    repos: GithubRepo[] | null;
    setUsername: (username: string) => void;
    setUserData: (user: GithubUser, repos: GithubRepo[]) => void;
    reset: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
    username: "",
    user: null,
    repos: null,
    setUsername: (username) => set({ username }),
    setUserData: (user, repos) => set({ user, repos }),
    reset: () => set({ username: "", user: null, repos: null }),
}));
