import { GithubRepo } from "@/features/github/api";

export interface RepoImpact {
    name: string;
    score: number;
    stars: number;
    forks: number;
    language: string;
}

export const calculateRepoImpact = (repos: GithubRepo[]): RepoImpact[] => {
    if (!repos || repos.length === 0) return [];

    return repos
        .map(repo => {
            const starWeight = 3;
            const forkWeight = 5;
            const activityFactor = Math.min((repo.size || 0) / 1000, 10);

            const score = ((repo.stargazers_count || 0) * starWeight) + ((repo.forks_count || 0) * forkWeight) + activityFactor;

            return {
                name: repo.name,
                score: Math.round(score),
                stars: repo.stargazers_count || 0,
                forks: repo.forks_count || 0,
                language: repo.language || "Unknown",
            };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
};
