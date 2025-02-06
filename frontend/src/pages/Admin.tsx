import ProductList from "@/components/ProductLIst";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserProfile from "@/components/UserProfile";
import { useDeleteProduct, useProducts } from "@/controllers/products";
import { useAuth } from "@/hooks/use-auth";
import { mainApi } from "@/lib/api";
import { useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const Dashboard = () => {
  const productsQuery = useProducts();
  const deleteProduct = useDeleteProduct();
  
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="products">Productos</TabsTrigger>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <ProductList
            products={productsQuery.data ?? []}
            actions={(pr) => {
              return (
                <div>
                  <Button
                    size={"icon"}
                    disabled={deleteProduct.isPending}
                    onClick={() => {
                      deleteProduct.mutateAsync(pr.id);
                    }}
                  >
                    <FaRegTrashAlt />
                  </Button>
                </div>
              );
            }}
          />
        </TabsContent>
        <TabsContent value="profile">
          <UserProfile />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default function AdminPage() {
  const { authInfo } = useAuth();

  // setup interceptor

  useEffect(() => {
    const interceptor = mainApi.interceptors.request.use((config) => {
      if (authInfo?.token) {
        config.headers.Authorization = `Bearer ${authInfo.token}`;
      }
      return config;
    });
    return () => {
      mainApi.interceptors.request.eject(interceptor);
    };
  }, [authInfo]);

  return <Dashboard />;
}
