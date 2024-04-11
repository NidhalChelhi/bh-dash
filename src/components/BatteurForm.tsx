"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import CustomFormInput from "./CustomFormInput";

const BatteurForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    model: "",
    cuveCapacity: "",
    puissance: "",
    poids: "",
    alimentation: "",
    vitesse: "",
    dimensions: "",
    stock: "available",
    images: [] as File[],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStockChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      stock: prevData.stock === "available" ? "out_of_stock" : "available",
    }));
  };

  const handleImageUpload = (files: FileList | null) => {
    if (files) {
      const fileList = Array.from(files);
      setFormData((prevData) => ({
        ...prevData,
        images: fileList,
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the name, description, and at least one image are provided
    if (
      !formData.name ||
      !formData.description ||
      !formData.model ||
      !formData.cuveCapacity ||
      !formData.puissance ||
      !formData.poids ||
      !formData.alimentation ||
      !formData.vitesse ||
      !formData.dimensions ||
      formData.images.length === 0
    ) {
      toast.error(
        "Please provide a name, description, specifications, and at least one image to add a batteur."
      );
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("model", formData.model);
      formDataToSend.append("cuveCapacity", formData.cuveCapacity);
      formDataToSend.append("puissance", formData.puissance);
      formDataToSend.append("poids", formData.poids);
      formDataToSend.append("alimentation", formData.alimentation);
      formDataToSend.append("vitesse", formData.vitesse);
      formDataToSend.append("dimensions", formData.dimensions);
      formDataToSend.append("stock", formData.stock);
      formData.images.forEach((image) => {
        formDataToSend.append("images", image);
      });

      await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "/api/batteurs/add",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Batteur added successfully:");
      toast.success("Batteur added successfully");

      // Clear form data after successful submission
      setFormData({
        name: "",
        description: "",
        model: "",
        cuveCapacity: "",
        puissance: "",
        poids: "",
        alimentation: "",
        vitesse: "",
        dimensions: "",
        stock: "available",
        images: [],
      });

      // Clear image previews
      setImagePreviews([]);
    } catch (error) {
      console.error("Error adding batteur:", error);
      toast.error("Failed to add batteur" + error);
    }
  };

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    handleImageUpload(files); // Pass selected files to parent component

    // Read selected files as data URLs and store them in state for preview
    if (files) {
      const previews: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target) {
            previews.push(event.target.result as string);
            setImagePreviews([...previews]);
          }
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  const handleDeleteImage = (index: number) => {
    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
  };

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
      <CustomFormInput
        label="Nom du Batteur"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
      />
      <div className="flex flex-col gap-1">
        <label className="font-semibold">Description</label>
        <textarea
          className="w-full p-2 outline-none border-[1px] border-[#D4D2E3] rounded-xl"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <CustomFormInput
          label="Modèle"
          name="model"
          value={formData.model}
          onChange={handleInputChange}
        />
        <CustomFormInput
          label="Capacité de la cuve (L)"
          name="cuveCapacity"
          value={formData.cuveCapacity}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <CustomFormInput
          label="Puissance (KW)"
          name="puissance"
          value={formData.puissance}
          onChange={handleInputChange}
        />
        <CustomFormInput
          label="Poids (kg)"
          name="poids"
          value={formData.poids}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <CustomFormInput
          label="Alimentation"
          name="alimentation"
          value={formData.alimentation}
          onChange={handleInputChange}
        />
        <CustomFormInput
          label="Vitesse du Fouet"
          name="vitesse"
          value={formData.vitesse}
          onChange={handleInputChange}
        />
      </div>
      <CustomFormInput
        label="Dimensions"
        name="dimensions"
        value={formData.dimensions}
        onChange={handleInputChange}
      />

      <div className="flex items-center gap-4">
        <label className="font-semibold">En Stock</label>
        <input
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          type="checkbox"
          name="stock"
          checked={formData.stock === "available"}
          onChange={handleStockChange}
        />
      </div>

      <div className="w-full">
        <label className="font-semibold">Images du Batteur</label>

        <div className="mt-2 flex flex-col items-center justify-center rounded-2xl border border-[#D4D2E3] px-6 py-10 text-center">
          <div className="flex text-sm leading-6 text-gray-600">
            <label
              htmlFor="imageInput"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Upload a file</span>
              <input
                id="imageInput"
                name="images"
                type="file"
                className="sr-only"
                accept="image/*"
                multiple // Allow multiple file selection
                onChange={handleFileChange} // Handle file selection event
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">
            PNG, JPG, GIF up to 10MB
          </p>
          {/* Render image previews */}
          <div className="mt-4 flex justify-center h-full flex-wrap gap-4 items-center">
            {imagePreviews.map((preview, index) => (
              <div
                key={index}
                className="h-full border border-[#D4D2E3] rounded-xl overflow-hidden p-4 relative"
              >
                <img
                  src={preview}
                  alt={`Preview ${index}`}
                  className="h-full min-h-[120px] max-h-[120px] "
                />
                <button
                  className="absolute top-2 right-2 bg-white rounded-full p-1 text-gray-600 hover:bg-gray-200"
                  onClick={() => handleDeleteImage(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="bg-primary text-white rounded-lg p-2 w-1/2  hover:scale-[102%] app_transition "
      >
        Ajouter le Batteur
      </button>
    </form>
  );
};

export default BatteurForm;
