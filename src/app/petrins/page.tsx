"use client";

import Petrin from "@/models/Petrin";
import axios from "axios";
import { SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PetrinsPage = () => {
  const [petrins, setPetrins] = useState<Petrin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "/api/petrins/all"
        );
        setPetrins(response.data);
      } catch (error) {
        console.error("Error fetching petrins:", error);
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
            Vos Pétrins Spirale
          </h1>
        </div>
        <div className="flex flex-col gap-4 mt-8">
          <div className="w-full grid grid-cols-2 lg:grid-cols-5 items-center justify-center border-b text-grey px-4 pb-2">
            <span className="lg:col-span-2 sm:text-lg font-bold">
              Nom du Pétrin
            </span>

            <span className="hidden lg:block sm:text-lg font-bold">
              Disponibilité
            </span>
            <span className="sm:text-lg font-bold place-self-end px-4">
              Actions
            </span>
          </div>
          {loading && <p>Loading...</p>}

          {petrins.map((petrin, index) => (
            <div
              key={`${petrin._id}-${index}`}
              className="w-full grid grid-cols-2 lg:grid-cols-5 items-center  border-b text-grey px-4 "
            >
              <div className="lg:col-span-2 flex items-center gap-4">
                <div className="hidden sm:block w-10 h-10  overflow-hidden rounded-full">
                  <img
                    src={
                      process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                      "/api/" +
                      petrin.images[0]
                    }
                    className="object-contain w-full h-full"
                  />
                </div>
                <span className="font-semibold">
                  {petrin.name} {petrin.model}
                </span>
              </div>

              <div className="hidden lg:block font-bold truncate">
                {petrin.stock === "available" ? (
                  <span className="text-green-500">En Stock</span>
                ) : (
                  <span className="text-red-500">Indisponible</span>
                )}
              </div>

              <div className="flex rounded-full place-self-end gap-0">
                <Link
                  href={`/petrins/${petrin.slug}`}
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
                          "/api/petrins/delete/" +
                          petrin.slug
                      );
                      toast.success("Pétrin supprimé avec succès");
                      setPetrins((prev) =>
                        prev.filter((p) => p._id !== petrin._id)
                      );
                    } catch (error) {
                      console.error("Error deleting petrin:", error);
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

export default PetrinsPage;
