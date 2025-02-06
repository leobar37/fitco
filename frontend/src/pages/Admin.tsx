import { useAuth } from "@/hooks/use-auth";
import { mainApi } from "@/lib/api";
import { useEffect } from "react";
import { useProducts } from "../controllers/products";
const Products = () => {
  const products = useProducts();

  return <pre>{JSON.stringify(products.data, null, 3)}</pre>;
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

  return (
    <div>
      <h1>Hello admin {authInfo?.user.name}</h1>
      <Products />
    </div>
  );
}
