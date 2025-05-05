import { useQuery } from "@tanstack/react-query";

export function useProduct() {
  return useQuery({
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
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      return res.json();
    },
    enabled: id !== null && id !== undefined,
  });
}
