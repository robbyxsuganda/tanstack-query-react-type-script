import { Product } from "@/types/product";
import Image from "next/image";

interface CardProps {
  product: Product;
  onClick?: (productId: string) => void;
}

export default function Card({ product, onClick }: CardProps) {
  return (
    <div onClick={() => onClick?.(product.id)} className="flex flex-col items-center shadow p-4 cursor-pointer">
      <Image width={100} height={100} src={product.image} alt={product.title} className="scale-50 h-40 w-fit" />
      <h4 className="font-bold text-lg text-center mb-2">{product.title}</h4>
      <p className="text-sm font-bold">Price: ${product.price}</p>
    </div>
  );
}
