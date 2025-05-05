import { Product } from "@/types/product";
import { useMutation, useQuery, UseMutationOptions } from "@tanstack/react-query";

export function useProduct() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      return res.json();
    },
    // enabled: fetchData,
    enabled: false,
  });
}

export function useDetailProduct(id: string | null | undefined) {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      return res.json();
    },
    enabled: id !== null,
  });
}

export function useAddProduct(options?: UseMutationOptions<Product, unknown, FormData>) {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        body: formData,
      });
      return res.json();
    },
    ...options,
  });
}
