import { AuthContextProvider } from "../../../context/AuthContext";

export const contextWrapper = ({ children }) => (
  <AuthContextProvider value={{ user: {} }}>{children}</AuthContextProvider>
);
