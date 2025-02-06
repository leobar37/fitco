import { mainApi } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { ILogin } from "../schema/auth";

const login = (input: ILogin) => {
  return mainApi.post("auth", input);
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (input : ILogin) => {
      return login(input)
    },
  });
};
