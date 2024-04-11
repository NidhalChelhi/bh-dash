"use client";

import Batteur from "@/models/Batteur";
import axios from "axios";
import { SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BatteursPage = () => {
  const [batteurs, setBatteurs] = useState<Batteur[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "/api/batteurs/all"
        );
        setBatteurs(response.data);
      } catch (error) {
        console.error("Error fetching batteurs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex p-4 lg:p-14 w-full min-h-screen text-grey">
      <div className="w-full  bg-white rounded-3xl shadow-2xl shadow-gray-200 px-4 md:px-8 p-8 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">
            Vos Batteurs Mélangeurs
          </h1>
        </div>
        <div className="flex flex-col gap-4 mt-8">
          <div className="w-full grid grid-cols-2 lg:grid-cols-3 items-center justify-center border-b text-grey px-4 pb-2">
            <span className="sm:text-lg font-bold">Nom du Batteur</span>
            <span className="hidden lg:block sm:text-lg font-bold">
              Disponibilité
            </span>
            <span className="sm:text-lg font-bold place-self-end px-4">
              Actions
            </span>
          </div>
          {loading && <p>Loading...</p>}

          {batteurs.map((batteur, index) => (
            <div
              key={`${batteur._id}-${index}`}
              className="w-full grid grid-cols-2 lg:grid-cols-3 items-center  border-b text-grey px-4 "
            >
              <div className="flex items-center gap-4">
                <div className="hidden sm:block w-10 h-10  overflow-hidden rounded-full">
                  <img
                    src={
                      process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                      "/api/" +
                      batteur.images[0]
                    }
                    className="object-contain w-full h-full"
                  />
                </div>
                <span className="font-semibold">
                  {batteur.name} {batteur.model}
                </span>
              </div>

              <div className="hidden lg:block font-bold truncate">
                {batteur.stock === "available" ? (
                  <span className="text-green-500">En Stock</span>
                ) : (
                  <span className="text-red-500">Indisponible</span>
                )}
              </div>

              <div className="flex rounded-full place-self-end gap-0">
                <Link
                  href={`/batteurs/${batteur.slug}`}
                  className="group hover:bg-gray-100 rounded-full p-2 lg:p-3"
                >
                  <SquarePen
                    className="text-[#8b909a] group-hover:text-yellow-500"
                    size={26}
                  />
                </Link>
                <button
                  className="group hover:bg-gray-100 rounded-full p-2 lg:p-3"
                  onClick={async () => {
                    try {
                      await axios.delete(
                        process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                          "/api/batteurs/delete/" +
                          batteur.slug
                      );
                      toast.success("Batteur supprimé avec succès");
                      setBatteurs((prev) =>
                        prev.filter((p) => p._id !== batteur._id)
                      );
                    } catch (error) {
                      console.error("Error deleting batteur:", error);
                    }
                  }}
                >
                  <Trash2
                    size={26}
                    className="text-[#8b909a] group-hover:text-red-500"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default BatteursPage;
