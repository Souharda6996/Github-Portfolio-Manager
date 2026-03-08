import { GithubRepo } from "@/features/github/api";

export interface LanguageStat {
    language: string;
    count: number;
    percentage: number;
    color: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    React: "#61dafb",
    Python: "#3572A5",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Rust: "#dea584",
    Go: "#00ADD8",
    Java: "#b07219",
    CPP: "#f34b7d",
    CSharp: "#178600",
    PHP: "#4F5D95",
    Ruby: "#701516",
    Swift: "#F05138",
    Kotlin: "#A97BFF",
};

export const extractLanguageStats = (repos: GithubRepo[]): LanguageStat[] => {
    const counts: Record<string, number> = {};
    let totalRepos = 0;

    repos.forEach((repo) => {
        if (repo.language) {
            counts[repo.language] = (counts[repo.language] || 0) + 1;
            totalRepos++;
        }
    });

    if (totalRepos === 0) return [];

    return Object.entries(counts)
        .map(([language, count]) => ({
            language,
            count,
            percentage: Math.round((count / totalRepos) * 100),
            color: LANGUAGE_COLORS[language] || "#888888",
        }))
        .sort((a, b) => b.count - a.count);
};
