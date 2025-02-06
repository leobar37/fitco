import { useToast } from "@/hooks/use-toast";
import { mainApi } from "@/lib/api";
import { IProduct } from "@/schema/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const getProducts = async (): Promise<IProduct[]> => {
  return mainApi.get("products").then((result) => result.data);
};

export const deleteProduct = async (id: string) => {
  return mainApi.delete(`/products/${id}`);
};
export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: async (id: string) => {
      try {
        await deleteProduct(id);
        await queryClient.invalidateQueries({
          exact: false,
          queryKey: ["products"],
        });
        toast({
          title: "Success!"
        })
      } catch (error) {
        toast({
          title: "Permissions Error",
          variant: "destructive"
        });
      }
    },
  });
};
