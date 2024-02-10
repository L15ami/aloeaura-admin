import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "./spinner";
import { ReactSortable } from "react-sortablejs";
import toast from "react-hot-toast";

export default function Product({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  // category: selectedCategory,
  details: existingDetails, // Added details
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [details, setDetails] = useState(existingDetails || ""); // Added details

  const router = useRouter();
  const [redirect, setRedirect] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const uploadImagesQueue = [];
  // const [categories, setCategories] = useState([]);
  // const [category, setCategory] = useState(selectedCategory || '');

  // useEffect(() => {
  //   axios.get('/api/categories').then(result => {
  //     setCategories(result.data)
  //   })
  // }, [])

  async function createProduct(ev) {
    ev.preventDefault();

    // Check if there are new images to upload
    if (isUploading) {
      // Wait for the images to finish uploading
      await Promise.all(uploadImagesQueue);
    }

    // Now you can make the API request to save the product
    const data = { title, description, price, details, images };
    if (_id) {
      await axios.put("/api/products", { ...data, _id });
      toast.success("Product updated!!");
    } else {
      await axios.post("/api/products", data);
      toast.success("Product created!!");
    }

    // Redirect after saving
    setRedirect(true);
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);

      for (const file of files) {
        const data = new FormData();
        data.append("file", file);

        // Use the axios.post method and push the promise to the queue
        uploadImagesQueue.push(
          axios.post("/api/upload", data).then((res) => {
            setImages((oldImages) => [...oldImages, ...res.data.links]);
          })
        );
      }

      // Wait for all images to finish uploading
      await Promise.all(uploadImagesQueue);

      setIsUploading(false);
      toast.success("Image uploaded");
    } else {
      toast.error("An error occurred!");
    }
  }

  if (redirect) {
    router.push("/products");
    return null;
  }

  function updateImagesOrder(images) {
    setImages(images);
  }

  function handleDeleteImage(index) {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    toast.success("image deleted successfully!!");
  }

  return (
    <div className="mx-auto max-w-2xl">
      <form onSubmit={createProduct} className="space-y-5">
        {/* Title input */}
        <div className="grid grid-cols-2 items-center my-4">
          <label className="col-span-1 block text-lg font-medium text-gray-700 mb-3">
            Title
          </label>
          <div className="col-span-2">
            <input
              type="text"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 border p-3"
              placeholder="Title of product"
              required
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
            />
          </div>
        </div>

        {/* Category select */}
        {/* <div>
          <label htmlFor="category" className="block text-lg font-medium text-gray-900">
            Select Category
          </label>
          <select
            id="category"
            className="mt-1.5 p-3 w-full rounded-md border border-gray-300 text-gray-700"
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
          >
            <option value="0">No category selected</option>
            {categories.length > 0 &&
              categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div> */}

        {/* Description input */}
        <div className="grid grid-cols-2 items-center my-4">
          <label className="col-span-1 block text-lg font-medium text-gray-700 mb-3">
            Description
          </label>
          <div className="col-span-2">
            <textarea
              type="text"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 border p-3"
              placeholder="Description about the product"
              rows={6}
              required
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />
          </div>
        </div>

        {/* Product Details input */}
        <div className="grid grid-cols-2 items-center my-4">
          <label className="col-span-1 block text-lg font-medium text-gray-700 mb-3">
            Product Details
          </label>
          <div className="col-span-2">
            <textarea
              type="text"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 border p-3"
              placeholder="Product details"
              rows={6}
              required
              value={details}
              onChange={(ev) => setDetails(ev.target.value)}
            />
          </div>
        </div>

        {/* Price input */}
        <div className="grid grid-cols-2 items-center my-4">
          <label className="col-span-1 block text-lg font-medium text-gray-700 mb-3">
            Price
          </label>
          <div className="col-span-2">
            <input
              type="number"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 border p-3"
              placeholder="Price"
              required
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="mx-auto my-4">
          <label
            htmlFor="fileInput"
            className="mb-1 block text-lg font-medium text-gray-700 py-2"
          >
            Images
          </label>
          <div className="mx-auto">
            <label className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-green-500 p-6 transition-all hover:border-primary-300">
              <div className="space-y-1 text-center">
                <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6 text-green-500"
                  >
                    <path d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                  </svg>
                </div>
                <div className="text-green-600">
                  <span className="font-medium text-primary-500 hover:text-primary-700">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </div>
                <p className="text-sm text-green-500">
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </p>
              </div>
              <input
                id="fileInput"
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={uploadImages}
              />
            </label>
          </div>
          {/* Spinner during upload */}
          <div className="grid grid-cols-2 items-center rounded">
            {isUploading && (
              <Spinner className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            )}
          </div>

          {/* Display uploaded images */}
          {!isUploading && (
            <div className=" grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-2">
              <ReactSortable
                list={images}
                setList={updateImagesOrder}
                className="w-[350px] h-auto  gap-2 flex  justify-between align-items-center"
              >
                {images?.map((link, index) => (
                  <div key={link} className="relative group">
                    <img
                      src={link}
                      alt="image"
                      className="object-cover h-32 w-44 rounded-md border p-2 cursor-pointer transition-transform transform-gpu group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 cursor-pointer opacity-0 group-hover:opacity-100">
                      <button onClick={() => handleDeleteImage(index)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 text-orange-600 bg-white rounded-full"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </ReactSortable>
            </div>
          )}
        </div>
        {/* </div> */}

        {/* Save Button */}
        <div className="mx-auto my-4">
          <button
            className="inline-block rounded border border-green-600 px-12 py-3 text-sm font-medium text-green-600 hover:bg-green-600 hover:text-white focus:outline-none focus:ring active:bg-green-500 w-full"
            type="submit"
          >
            Save product
          </button>
        </div>
      </form>
    </div>
  );
}
