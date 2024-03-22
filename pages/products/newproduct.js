import Product from "@/components/Product"; // Import the Product component

export default function NewProduct() {
  return (
    <>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-3xl py-5">Let us create a new product. 🎉</h1>
        </div>
        <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
          {/* Any additional content for the header */}
        </div>
      </div>  

      <hr className="h-px border-0 bg-gray-300" />

      <div className="my-10">
        <Product />
      </div>
    </>
  );
}
