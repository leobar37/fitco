import { mainApi } from "@/lib/api";
import { User } from "@/schema/user";
import { useMutation } from "@tanstack/react-query";
import { ILogin } from "../schema/auth";

const login = async(input: ILogin) => {
  return mainApi.post("auth/login", input).then(
    (d) =>
      d.data as {
        token: string;
        user: User;
      }
  );
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (input: ILogin) => {
      return login(input);
    },
  });
};
