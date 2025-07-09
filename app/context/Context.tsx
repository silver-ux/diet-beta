"use client";
import { User } from "@supabase/supabase-js";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Spinner from "../components/Spinner";
import { useRouter } from "next/navigation";

type UserProviderProps = {
  children: ReactNode;
};

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const MyContext = createContext<UserContextType | undefined>(undefined);

const Context = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/account/userdata");
        const json = await response.json();
        if (json.error) {
          setUser(null);
          return;
        }
        setUser(json);
      } catch (error) {
        console.error("ユーザー取得エラー:", error);
        setUser(null);
      } finally {
        setIsLoading(false); // ← データ取得完了後に表示開始
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/account/signin");
    }
  }, [user, router, isLoading]);

  if (isLoading) return <Spinner />;

  return (
    <MyContext.Provider value={{ user, setUser }}>
      {children}
    </MyContext.Provider>
  );
};

export default Context;

export const SetContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
