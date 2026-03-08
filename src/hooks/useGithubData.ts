import { useQuery } from "@tanstack/react-query";
import { fetchGithubUser, fetchGithubRepos } from "@/features/github/api";

export const useGithubUser = (username: string) => {
    return useQuery({
        queryKey: ["github-user", username],
        queryFn: () => fetchGithubUser(username),
        enabled: !!username,
        staleTime: 5 * 60 * 1000,
    });
};

export const useGithubRepos = (username: string) => {
    return useQuery({
        queryKey: ["github-repos", username],
        queryFn: () => fetchGithubRepos(username),
        enabled: !!username,
        staleTime: 5 * 60 * 1000,
    });
};
