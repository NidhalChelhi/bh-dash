const SubmitButton: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <button className="bg-primary text-white rounded-lg p-2 w-1/2 hover:scale-[102%] app_transition ">
        Ajouter le produit
      </button>
    </div>
  );
};

export default SubmitButton;
