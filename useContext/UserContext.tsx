"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  policies: string[];
};

type UserContextType = {
  user: User | null;
  updateUser: (userData: User) => void;
  hasPolicy: (policy: string) => boolean;
  updatePolicy: (policy: string) => void;
  refreshUser: () => void;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const loadUser = () => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  };

  useEffect(() => {
    loadUser();

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === "user") {
      loadUser();
    }
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const hasPolicy = (policy: string) => {
    if (!user || !user.policies) {
      return false;
    }
    return user.policies.includes(policy);
  };

  const updatePolicy = (policy: string) => {
    if (!user || !user.policies) {
      return;
    }
    if (user.policies.includes(policy)) {
      return;
    }
    const updatedUser = {
      ...user,
      policies: [...user.policies, policy],
    };
    updateUser(updatedUser);
  };

  const refreshUser = () => {
    loadUser();
  };

  return (
    <UserContext.Provider
      value={{ user, updateUser, hasPolicy, updatePolicy, refreshUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
