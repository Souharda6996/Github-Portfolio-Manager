import axios from "axios";

const GITHUB_API_BASE = "https://api.github.com";

export interface GithubUser {
    login: string;
    name: string;
    avatar_url: string;
    bio: string;
    public_repos: number;
    followers: number;
    following: number;
    created_at: string;
    location: string;
    blog: string;
    company: string;
}

export interface GithubRepo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
    languages_url: string;
    updated_at: string;
    created_at: string;
    size: number;
}

export const fetchGithubUser = async (username: string): Promise<GithubUser> => {
    const { data } = await axios.get(`${GITHUB_API_BASE}/users/${username}`);
    return data;
};

export const fetchGithubRepos = async (username: string): Promise<GithubRepo[]> => {
    const { data } = await axios.get(`${GITHUB_API_BASE}/users/${username}/repos?per_page=100&sort=updated`);
    return data;
};

export const fetchRepoLanguages = async (languagesUrl: string): Promise<Record<string, number>> => {
    const { data } = await axios.get(languagesUrl);
    return data;
};
