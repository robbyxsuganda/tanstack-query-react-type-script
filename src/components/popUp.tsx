import { useAddProduct, useDetailProduct } from "@/hooks/useProduct";
import Image from "next/image";
import { FormEvent } from "react";

interface PopUpProps {
  showProduct: string | null;
  setShowProduct: (id: string | null) => void;
  showAddProduct: boolean;
  setShowAddProduct: (boolean: boolean) => void;
  setShowToast: (message: string | null) => void;
}

export default function PopUp({ showProduct, setShowProduct, showAddProduct, setShowAddProduct, setShowToast }: PopUpProps) {
  const { data, isLoading, isError } = useDetailProduct(showProduct);
  const createProduct = useAddProduct({
    onSuccess: () => {
      setShowAddProduct(false);
      setShowToast("Product created successfully!");
      setTimeout(() => {
        setShowToast(null);
      }, 2000); // Hide the toast after 2 seconds
    },
    onError: (error: unknown) => {
      console.error("Error creating product:", error);
    },
  });

  const { isPending } = createProduct;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createProduct.mutate(new FormData(e.target as HTMLFormElement));
  };

  return (
    <div className={`fixed h-screen w-screen top-0 bg-black/50 left-0 ${showProduct || showAddProduct ? "flex justify-center items-center" : "hidden"}`}>
      <div className="relative w-1/2 h-1/2 bg-white p-5 rounded shadow-lg overflow-auto">
        <span
          className="absolute text-red-500 text-3xl cursor-pointer top-0.5 right-1.5"
          onClick={() => {
            setShowProduct(null);
            setShowAddProduct(false);
          }}
        >
          X
        </span>
        {showProduct && (
          <div>
            <h1 className="text-center text-2xl font-bold mb-10">Product Detail (ID : {showProduct})</h1>
            {isLoading && <h1 className="text-center text-2xl font-bold">Loading...</h1>}
            {isError && <h1 className="text-center text-2xl font-bold">Data not found!</h1>}
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
        )}

        {showAddProduct && (
          <div className="px-10">
            <h1 className="text-center text-2xl font-bold mb-10">Add Product</h1>
            <form onSubmit={(e) => handleSubmit(e)} action="">
              <div className="flex flex-col gap-1 mb-5">
                <label htmlFor="id" className="font-bold">
                  Id Product
                </label>
                <input type="text" id="id" name="id" className="border rounded px-2 py-1 border-gray-300" />
              </div>
              <div className="flex flex-col gap-1 mb-5">
                <label htmlFor="title" className="font-bold">
                  Title Product
                </label>
                <input type="text" id="title" name="title" className="border rounded px-2 py-1 border-gray-300" />
              </div>
              <div className="flex flex-col gap-1 mb-5">
                <label htmlFor="price" className="font-bold">
                  Price Product
                </label>
                <input type="number" id="price" name="price" className="border rounded px-2 py-1 border-gray-300" />
              </div>

              <div className="flex flex-col gap-1 mb-5">
                <label htmlFor="image" className="font-bold">
                  Image Product
                </label>
                <input type="text" id="image" name="image" className="border rounded px-2 py-1 border-gray-300" />
              </div>
              <div className="flex flex-col gap-1 mb-5">
                <label htmlFor="category" className="font-bold">
                  Category Product
                </label>
                <select id="category" name="category" className="border rounded px-2 py-1 border-gray-300">
                  <option selected disabled>
                    --Select Category--
                  </option>
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={`Category ${i + 1}`}>
                      Category {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1 mb-5">
                <label htmlFor="description" className="font-bold">
                  Description Product
                </label>
                <textarea id="description" name="description" className="border rounded px-2 py-1 border-gray-300" />
              </div>
              <button type="submit" className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded mt-5">
                {isPending ? "Creating..." : "Create Product"}
              </button>
              <button type="button" className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded mt-5 ml-5">
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
