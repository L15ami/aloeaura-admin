import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import Spinner from "./spinner";

import { ReactSortable } from "react-sortablejs";
import Image from "next/image";

export default function Product() {
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [Images, setImage] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const uploadImagesQueue = [];

  async function createProduct(ev) {
    ev.preventDefault();

    if (isUploading) {
      await Promise.all(uploadImagesQueue);
    }

    const data = { title, description, price, Images };
    await axios.post("/api/products", data);

    setRedirect(true);
  }

  async function uploadImages(ev) {
    const files = ev.target.files;
    if (files.length > 0) {
      setIsUploading(true);
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        try {
          const res = await axios.post("/api/upload", formData); // Use await to wait for the upload to finish
          // Update state with the new image links
          setImage((oldImages) => [...oldImages, ...res.data.links]);
        } catch (error) {
          console.error("Error uploading file:", error);
          // Handle error here, maybe display a message to the user
        }
      }
      setIsUploading(false);
    } else {
      console.error("No files selected for upload.");
      // Handle case where no files are selected
    }
  } // <-- Add this closing curly brace

  if (redirect) {
    router.push("/products");
    return null;
  }

  function updatImagesOrder(Images) {
    setImage(Images);
  }
    function handleDeleteImage(index) {
      const updatedImages = [...Images];
      updatedImages.splice(index, 1);
      setImage(updatedImages);
    }
  
  return (
    <>
      <form onSubmit={createProduct} className="mx-auto max-w-screen-sm">
        <div class="mx-auto my-4">
          <div>
            <label
              for="example1"
              class="mb-1 block text-lg font-medium text-gray-700 py-2"
            >
              Title
            </label>
            <input
              type="text"
              id="example1"
              class="block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-3"
              placeholder="Product Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <div class="mx-auto my-4">
          <div>
            <label
              for="example1"
              class="mb-1 block text-lg font-medium text-gray-700 py-2"
            >
              Select Category
            </label>
            <select class="block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-3">
              <option value="">No Category selected</option>
              <option value="">Option02</option>
              <option value="">Option03</option>
            </select>
          </div>
        </div>

        <div class="mx-auto my-4 ">
          <div class="mx-auto">
            <label
              for="example1"
              class="mb-1 block text-lg font-medium text-gray-700 py-2"
            >
              Images
            </label>

            <div class="mx-auto">
              <label
                for="example5"
                class="mb-1 block text-sm font-medium text-green-700"
              ></label>
              <label class="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300">
                <div class="space-y-1 text-center">
                  <div class="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-6 w-6 text-gray-500"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                      />
                    </svg>
                  </div>
                  <div class="text-green-600">
                    <a
                      href="#"
                      class="font-medium text-primary-500 hover:text-primary-700"
                    >
                      Click to upload
                    </a>{" "}
                    or drag and drop
                  </div>
                  <p class="text-sm text-green-500">
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
          </div>
        </div>

        <div className="grid grid-cols-2 items-center rounded">
          {isUploading && (
            <Spinner className="mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></Spinner>
          )}
        </div>

        {!isUploading && (
          <div className="grid grid-cols-2 gap-4">
            <ReactSortable
              list={Array.isArray(Images) ? Images : []}
              setList={updatImagesOrder}
              animation={200}
              className="grid grid-cols-2 gap-4"
            >
              {Array.isArray(Images) &&
                Images.map((link, index) => (
                  <div key={link} className="relative group">
                    <img
                      src={link}
                      alt="image"
                      className="object-cover h-32 w-44 rounded-md p-2"
                    />
                    <div className="absolute top-2 right-2 cursor-pointer group-hover:opacity-100 opacity-0 transition-opacity">
                      <button onClick={() => handleDeleteImage(index)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
            </ReactSortable>
          </div>
        )}

        <div class="mx-auto my-4">
          <div>
            <label
              for="example1"
              class="mb-1 block text-lg font-medium text-gray-700 py-2"
            >
              Description
            </label>
            <textarea
              rows={5}
              type="text"
              id="example1"
              class="block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-3"
              placeholder="Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div class="mx-auto my-4">
          <div>
            <label
              for="example1"
              class="mb-1 block text-lg font-medium text-gray-700 py-2"
            >
              Price
            </label>
            <input
              type="number"
              id="example1"
              class="block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-3"
              placeholder="Product Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <div class="mx-auto my-4">
          <button
            className="inline-block rounded border border-green-600 px-12 py-3 text-sm font-medium text-green-600 hover:bg-green-600 hover:text-white focus:outline-none focus:ring active:bg-green-500 w-full"
            type="submit"
          >
            Save product
          </button>
        </div>
      </form>
    </>
  );
}
