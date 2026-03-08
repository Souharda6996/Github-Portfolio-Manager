"use client";

export interface UserAccount {
    username: string;
    email: string;
    password?: string; // In a real app, this would be hashed
    createdAt: number;
}

export interface UserSession extends UserAccount {
    loginTime: number;
}

const SESSION_KEY = "dna_vault_session";
const REGISTRY_KEY = "dna_user_registry";

// --- Registry Management ---

const getRegistry = (): UserAccount[] => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(REGISTRY_KEY);
    if (!data) return [];
    try {
        return JSON.parse(data);
    } catch {
        return [];
    }
};

const saveRegistry = (registry: UserAccount[]) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(REGISTRY_KEY, JSON.stringify(registry));
};

export const registerUser = (userData: UserAccount): { success: boolean; message: string } => {
    const registry = getRegistry();

    if (registry.some(u => u.username.toLowerCase() === userData.username.toLowerCase())) {
        return { success: false, message: "Username already exists in the neural database." };
    }

    if (registry.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
        return { success: false, message: "Email already linked to another sequence." };
    }

    const newAccount: UserAccount = {
        ...userData,
        createdAt: Date.now()
    };

    registry.push(newAccount);
    saveRegistry(registry);
    return { success: true, message: "Sequence initialized successfully." };
};

export const validateCredentials = (identifier: string, password?: string): UserAccount | null => {
    const registry = getRegistry();
    // We search by username or email
    const user = registry.find(u =>
        u.username.toLowerCase() === identifier.toLowerCase() ||
        u.email.toLowerCase() === identifier.toLowerCase()
    );

    if (!user) return null;

    // Professional logic: if password was provided during signup, it should match
    if (user.password && user.password !== password) return null;

    return user;
};

// --- Session Management ---

export const loginUser = (user: UserAccount) => {
    if (typeof window === "undefined") return;

    const session: UserSession = {
        ...user,
        loginTime: Date.now(),
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    window.dispatchEvent(new Event("auth-change"));
};

export const logoutUser = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(SESSION_KEY);
    window.dispatchEvent(new Event("auth-change"));
};

export const getCurrentSession = (): UserSession | null => {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem(SESSION_KEY);
    if (!data) return null;

    try {
        return JSON.parse(data) as UserSession;
    } catch (e) {
        return null;
    }
};
