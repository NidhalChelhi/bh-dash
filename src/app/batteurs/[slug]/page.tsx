"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, PlusCircle, Trash2 } from "lucide-react";
import axios from "axios";
import Batteur from "@/models/Batteur";
import { toast } from "react-toastify";
import Link from "next/link";
import CustomFormInput from "@/components/CustomFormInput";

const BatteurPage: React.FC = () => {
  const [batteur, setBatteur] = useState<Batteur | null>(null);
  const [editedBatteur, setEditedBatteur] = useState<Batteur | null>(null);
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const slug = window.location.pathname.split("/").pop();
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL + `/api/batteurs/${slug}`
        );
        setBatteur(response.data);
        setEditedBatteur(response.data);
      } catch (error) {
        console.error("Error fetching batteur:", error);
      }
    };

    fetchData();
  }, []);

  // Function to handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedBatteur((prevState: Batteur | null) => ({
      ...prevState!,
      [name]: value,
    }));
    setHasChanges(true); // Set hasChanges to true when input changes
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setEditedBatteur((prevState: Batteur | null) => ({
      ...prevState!,
      [name]: checked ? "available" : "out_of_stock",
    }));
    setHasChanges(true); // Set hasChanges to true when checkbox changes
  };

  // Function to handle image deletion
  const handleDeleteImage = (index: number) => {
    setEditedBatteur((prevState: Batteur | null) => ({
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
          "/api/batteurs/add-picture/" +
          batteur?.slug,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        setEditedBatteur((prevState: Batteur | null) => ({
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
      !editedBatteur?.name ||
      !editedBatteur?.description ||
      !editedBatteur?.model ||
      !editedBatteur?.cuveCapacity ||
      !editedBatteur?.alimentation ||
      !editedBatteur?.puissance ||
      !editedBatteur?.poids ||
      !editedBatteur?.dimensions ||
      !editedBatteur?.images ||
      editedBatteur?.images.length === 0
    ) {
      toast.error("Please fill in all the fields");
      return;
    }

    try {
      await axios.put(
        process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          `/api/batteurs/edit/${batteur?.slug}`,
        editedBatteur
      );
      setHasChanges(false); // Reset hasChanges after successful submission
      toast.success("Batteur updated successfully!");
    } catch (error) {
      console.error("Error updating batteur:", error);
      toast.error("Failed to update batteur. Please try again.");
    }
  };

  // Disable button when no changes have been made
  const isDisabled = !hasChanges;

  if (!batteur) {
    return <p>Loading...</p>;
  }
  return (
    <main className="flex p-4 lg:p-14 w-full min-h-screen text-grey">
      <div className="w-full  bg-white rounded-3xl shadow-2xl shadow-gray-200 px-4 md:px-8 p-8 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Link href="/batteurs">
            <ChevronLeft className="text-primary" size={28} />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">
            Modifier le Batteur
          </h1>
        </div>
        <div className="flex flex-col  w-full items-start justify-start gap-4">
          <CustomFormInput
            label="Nom du Batteur"
            name="name"
            value={editedBatteur?.name || ""}
            onChange={handleInputChange}
          />

          <div className="flex flex-col gap-1 w-full">
            <label className="font-semibold">Description</label>
            <textarea
              className="w-full p-2 outline-none border-[1px] border-[#D4D2E3] rounded-xl"
              name="description"
              value={editedBatteur?.description || ""}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <CustomFormInput
              label="Modèle"
              name="model"
              value={editedBatteur?.model || ""}
              onChange={handleInputChange}
            />
            <CustomFormInput
              label="Capacité de la cuve (L)"
              name="cuveCapacity"
              value={editedBatteur?.cuveCapacity || ""}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <CustomFormInput
              label="Puissance (W)"
              name="puissance"
              value={editedBatteur?.puissance || ""}
              onChange={handleInputChange}
            />
            <CustomFormInput
              label="Poids (kg)"
              name="poids"
              value={editedBatteur?.poids || ""}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <CustomFormInput
              label="Alimentation (V)"
              name="alimentation"
              value={editedBatteur?.alimentation || ""}
              onChange={handleInputChange}
            />
            <CustomFormInput
              label="Vitesse du Fouet"
              name="vitesse"
              value={editedBatteur?.vitesse || ""}
              onChange={handleInputChange}
            />
          </div>
          <CustomFormInput
            label="Dimensions (mm)"
            name="dimensions"
            value={editedBatteur?.dimensions || ""}
            onChange={handleInputChange}
          />

          <div className="flex items-center gap-4 w-full">
            <label className="font-semibold">En Stock</label>
            <input
              type="checkbox"
              name="stock"
              checked={editedBatteur?.stock === "available"}
              onChange={handleCheckboxChange}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Images du Batteur</label>
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
            {editedBatteur?.images.map((img, index) => (
              <div
                key={index}
                className="relative border-[1px] border-[#D4D2E3] rounded-2xl p-4 h-full max-h-44 flex items-center justify-center"
              >
                <img
                  key={index}
                  src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "/api/" + img}
                  alt={batteur?.name}
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

export default BatteurPage;
