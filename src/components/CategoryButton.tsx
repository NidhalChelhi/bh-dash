// CategoryButton.tsx

const CategoryButton: React.FC<{
  category: string;
  selectedCategory: string;
  onClick: (category: string) => void;
}> = ({ category, selectedCategory, onClick }) => {
  const isSelected = category === selectedCategory;

  return (
    <div
      onClick={() => onClick(category)}
      className={`text-center cursor-pointer w-full rounded-2xl px-4 py-3 ${
        isSelected ? "bg-primary text-white" : "border-[1px] border-[#D4D2E3]"
      }`}
    >
      {category}
    </div>
  );
};

export default CategoryButton;
