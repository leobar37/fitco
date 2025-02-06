import { mainApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
export const getProducts = () => {
  return mainApi.get("products");
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => {
      return getProducts();
    },
  });
};
