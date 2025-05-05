import { useDetailProduct } from "@/hooks/useProduct";
import Image from "next/image";

export default function PopUp({ showProduct, setShowProduct }: { showProduct: string | null | undefined; setShowProduct: (showProduct: string | null) => void }) {
  const { data, isLoading, isError } = useDetailProduct(showProduct);

  return (
    <div className={`fixed h-screen w-screen top-0 bg-black/50 left-0 ${showProduct ? "flex justify-center items-center" : "hidden"}`}>
      <div className="relative w-1/2 h-1/2 bg-white p-5 rounded shadow-lg overflow-auto">
        <span className="absolute text-red-500 text-3xl cursor-pointer top-0.5 right-1.5" onClick={() => setShowProduct(null)}>
          X
        </span>
        <h1 className="text-center text-2xl font-bold mb-10">Product Detail (ID : {showProduct})</h1>
        {isLoading && <h1 className="text-center text-2xl font-bold">Loading...</h1>}
        {isError && <h1 className="text-center text-2xl font-bold">Error fetching product</h1>}
        {data && (
          <div className="flex flex-col items-center gap-2 px-5 justify-center text-center ">
            <Image width={100} height={100} src={data.image} alt={data.title} />
            <h4 className="font-bold text-lg text-center mb-2">{data.title}</h4>
            <p className="text-sm">{data.description}</p>
            <p className="text-sm font-bold">Category: {data.category}</p>
            <p className="text-sm font-bold">Price: ${data.price}</p>
            <button className="bg-green-500 cursor-pointer text-white px-4 py-2 rounded mt-5" onClick={() => setShowProduct(null)}>
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
