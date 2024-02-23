"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, PlusCircle, Trash2 } from "lucide-react";
import axios from "axios";
import Product from "@/models/Product";
import { toast } from "react-toastify";
import Link from "next/link";

const ProductPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);
  const [hasChanges, setHasChanges] = useState<boolean>(false); // Track changes

  useEffect(() => {
    const fetchData = async () => {
      try {
        const slug = window.location.pathname.split("/").pop();
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL + `/api/products/${slug}`
        );
        setProduct(response.data);
        setEditedProduct(response.data);
        setSelectedCategory(response.data?.category || "");
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, []);

  // Function to handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedProduct((prevState: Product | null) => ({
      ...prevState!,
      [name]: value,
    }));
    setHasChanges(true); // Set hasChanges to true when input changes
  };

  // Function to handle category change
  const handleCategoryChange = (category: string) => {
    if (category === "Mixeurs" || category === "Mélangeurs") {
      setSelectedCategory(category);
      setEditedProduct((prevState: Product | null) => ({
        ...prevState!,
        category: category,
      }));
      setHasChanges(true); // Set hasChanges to true when category changes
    } else {
      console.error("Invalid category");
    }
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setEditedProduct((prevState: Product | null) => ({
      ...prevState!,
      [name]: checked ? "available" : "out_of_stock",
    }));
    setHasChanges(true); // Set hasChanges to true when checkbox changes
  };

  // Function to handle image deletion
  const handleDeleteImage = (index: number) => {
    setEditedProduct((prevState: Product | null) => ({
      ...prevState!,
      images: prevState?.images?.filter((_, i) => i !== index) || [],
    }));
    setHasChanges(true); // Set hasChanges to true when image is deleted
  };

  // Function to handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const images = Array.from(files);
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });

    axios
      .post(
        process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          "/api/products/add-picture/" +
          product?.slug,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        setEditedProduct((prevState: Product | null) => ({
          ...prevState!,
          images: [...(prevState?.images || []), ...response?.data.newImages],
        }));
        setHasChanges(true); // Set hasChanges to true when new image is added
        toast.success("Images uploaded successfully!");
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
        toast.error("Failed to upload images. Please try again." + error);
      });
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    if (
      !editedProduct?.name ||
      !editedProduct?.description ||
      !editedProduct?.images ||
      editedProduct?.images.length === 0
    ) {
      toast.error("Name, description, and at least one image are required.");
      return;
    }

    try {
      await axios.put(
        process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          `/api/products/edit/${product?.slug}`,
        editedProduct
      );
      setHasChanges(false); // Reset hasChanges after successful submission
      toast.success("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product. Please try again.");
    }
  };

  // Disable button when no changes have been made
  const isDisabled = !hasChanges;

  if (!product) {
    return <p>Loading...</p>;
  }
  return (
    <main className="flex p-4 lg:p-14 w-full min-h-screen text-grey">
      <div className="w-full  bg-white rounded-3xl shadow-2xl shadow-gray-200 px-4 md:px-8 p-8 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Link href="/products">
            <ChevronLeft className="text-primary" size={28} />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">
            Modifier le Produit
          </h1>
        </div>
        <div className="flex flex-col  w-full items-start justify-start gap-4">
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Nom du Produit</label>
            <input
              className="w-full p-2 outline-none border-[1px] border-[#D4D2E3] rounded-xl"
              type="text"
              name="name"
              value={editedProduct?.name || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Description</label>
            <textarea
              className="w-full p-2 outline-none border-[1px] border-[#D4D2E3] rounded-xl"
              name="description"
              value={editedProduct?.description || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="block text-sm font-semibold leading-6">
              Catégorie
            </label>
            <div className="flex gap-2">
              <div
                onClick={() => handleCategoryChange("Mélangeurs")}
                className={`text-center cursor-pointer w-full rounded-2xl px-4 py-3 ${
                  selectedCategory === "Mélangeurs"
                    ? "bg-primary text-white "
                    : "border-[1px] border-[#D4D2E3] "
                }`}
              >
                Mélangeurs
              </div>
              <div
                onClick={() => handleCategoryChange("Mixeurs")}
                className={`text-center cursor-pointer w-full rounded-2xl px-4 py-3 ${
                  selectedCategory === "Mixeurs"
                    ? "bg-primary text-white "
                    : "border-[1px] border-[#D4D2E3] "
                }`}
              >
                Mixeurs
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 w-full">
            <label className="font-semibold">En Stock</label>
            <input
              type="checkbox"
              name="stock"
              checked={editedProduct?.stock === "available"}
              onChange={handleCheckboxChange}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Images du Produit</label>
            <div className="hover:scale-[102%] cursor-pointer">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
                id="imageInput"
              />
              <label htmlFor="imageInput">
                <PlusCircle color="#23272e" />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-center gap-y-2 gap-x-2 w-full  ">
            {editedProduct?.images.map((img, index) => (
              <div
                key={index}
                className="relative border-[1px] border-[#D4D2E3] rounded-2xl p-4 h-full max-h-44 flex items-center justify-center"
              >
                <img
                  key={index}
                  src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "/api/" + img}
                  alt={product?.name}
                  className="object-cover h-full"
                />
                <div
                  className="absolute top-2 right-2 cursor-pointer text-red-500 hover:scale-[102%] app_transition "
                  onClick={() => handleDeleteImage(index)}
                >
                  <Trash2 size={24} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center w-full">
            <button
              className={`bg-primary text-white rounded-lg p-2 w-1/2 ${
                isDisabled ? "opacity-50" : "hover:scale-[102%] app_transition "
              }`}
              onClick={handleSubmit}
              disabled={isDisabled}
            >
              Confirmer les modifications
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
