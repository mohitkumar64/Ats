"use client";

import React, { createContext, useContext, useEffect } from "react";

const userContext = createContext<{
  user: null | { email: string; id: string };
  setUser: React.Dispatch<React.SetStateAction<any>>;
} | null>(null);

const UserProvider = ({
  user: initialUser,
  children,
}: {
  user: null | { email: string; id: string };
  children: React.ReactNode;
}) => {
  const [user, setUser] = React.useState(initialUser);

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => {
  const ctx = useContext(userContext);
  if (!ctx) throw new Error("useUser must be used inside UserProvider");
  return ctx;
};