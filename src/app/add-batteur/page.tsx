import React from "react";
import BatteurForm from "@/components/BatteurForm";

const AddBatteurPage: React.FC = () => {
  return (
    <main className="flex p-4 lg:p-14 w-full min-h-screen text-grey">
      <div className="w-full bg-white rounded-3xl shadow-2xl shadow-gray-200 px-4 md:px-8 p-8 flex flex-col gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary">
          Ajouter un Batteur Mélangeur
        </h1>
        <BatteurForm />
      </div>
    </main>
  );
};

export default AddBatteurPage;
