import { useNavigate } from "react-router-dom";
import { isDev } from "../utils";
const TOKEN_KEY = "token";

export const useAuth = () => {
  const navigate = useNavigate();
  const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
  };

  const isAuthed = () => {
    const token = getToken();
    if (isDev) {
      return token === "fake-jwt-token";
    }
    throw new Error("Not implemented yet");
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    navigate("/login");
  };

  return {
    isAuthed,
    logout,
  };
};
