import Card from "@/components/card";
import PopUp from "@/components/popUp";
import { useProduct } from "@/hooks/useProduct";
import { Product } from "@/types/product";
import { useState } from "react";

export default function Home() {
  const [fetchData, setFetchData] = useState(false);
  // const { data: products, isError: isProductsError, isLoading: isProductsLoading, isSuccess: isProductsSuccess, refetch: refetchProducts } = useProduct(fetchData);
  const { data: products, isError: isProductsError, isLoading: isProductsLoading, refetch: refetchProducts } = useProduct();
  const [showToast, setShowToast] = useState<string | null>(null);
  const [showProduct, setShowProduct] = useState<string | null>(null);
  const [showAddProduct, setShowAddProduct] = useState<boolean>(false);

  // useEffect(() => {
  //   if (isProductsSuccess) {
  //     setShowToast(true);
  //     const timer = setTimeout(() => {
  //       setShowToast(false);
  //     }, 2000); // Hide the toast after 2 seconds
  //     return () => clearTimeout(timer); // Cleanup the timer on component unmount
  //   }
  // }, [isProductsSuccess]);

  // useEffect(() => {
  //   if (isProductsError || isProductsSuccess) {
  //     setFetchData(false);
  //   }
  // }, [isProductsError, isProductsSuccess]);

  const handleFetchProducts = async () => {
    setFetchData(true);
    const res = await refetchProducts();
    if (res.isSuccess) {
      setShowToast("Successfully fetched products");
      setFetchData(false);
      const timer = setTimeout(() => {
        setShowToast(null);
      }, 2000); // Hide the toast after 2 seconds
      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
    if (res.isError) {
      setFetchData(false);
    }
  };

  return (
    <>
      <div className="text-center py-5">
        <h1 className="font-bold text-5xl">Products</h1>
      </div>

      <div className="flex justify-center gap-4 items-center mb-5">
        <button onClick={handleFetchProducts} className={`bg-blue-500 cursor-pointer text-white px-4 py-2 rounded ${fetchData ? "bg-gray-400" : "bg-blue-500 text-white"}`} disabled={fetchData}>
          {fetchData ? "Fetching Data...." : "Fetch Products"}
        </button>

        <button onClick={() => setShowAddProduct(true)} className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded">
          Add Product
        </button>
      </div>

      {showToast && (
        <div className="flex justify-center items-center mb-5">
          <h1 className="text-white text-center p-5 w-100 bg-green-500">{showToast}</h1>
        </div>
      )}

      <div className="container mx-auto ">
        {isProductsLoading ? (
          <div className="flex justify-center items-center">
            <h1>Loading.....</h1>
          </div>
        ) : isProductsError ? (
          <div className="flex justify-center items-center">
            <h1 className="text-red-500">Data not found!</h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {products?.map((product: Product) => (
              <Card onClick={(id) => setShowProduct(id)} key={`product-${product.id}`} product={product} />
            ))}
          </div>
        )}

        <PopUp setShowToast={setShowToast} showProduct={showProduct} setShowProduct={setShowProduct} showAddProduct={showAddProduct} setShowAddProduct={setShowAddProduct} />
      </div>
    </>
  );
}
