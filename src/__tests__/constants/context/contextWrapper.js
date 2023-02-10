import { AuthContextProvider } from "../../../context/AuthContext";
import React from "react";
export const contextWrapper = ({ children }) => (
  <AuthContextProvider>{children}</AuthContextProvider>
);
