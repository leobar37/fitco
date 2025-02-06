import { User } from "@/schema/user";
import { useAtom } from "jotai/react";
import { atomWithStorage } from "jotai/utils";
import { useNavigate } from "react-router-dom";
const TOKEN_KEY = "auth";

const authInfo$ = atomWithStorage<{
  token: string;
  user: User;
} | null>(TOKEN_KEY, null);

export const useAuth = () => {
  const navigate = useNavigate();
  const [authInfo, setAuthInfo] = useAtom(authInfo$);

  const logout = () => {
    setAuthInfo(null);
    navigate("/login");
  };

  return {
    authInfo,
    logout,
    setAuthInfo
  };
};
