import React, { createContext, ReactNode } from "react";

const MyContext = createContext();

type UserProviderProps = {
  children: ReactNode;
};

const Context = ({ children }: UserProviderProps) => {
  return <MyContext.Provider>{children}</MyContext.Provider>;
};

export default Context;
