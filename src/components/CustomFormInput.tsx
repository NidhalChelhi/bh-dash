import React from "react";

interface CustomFormInputProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomFormInput = (props: CustomFormInputProps) => {
  const { label, type = "text", name, value, onChange } = props;

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold">{label}</label>
      <input
        className="w-full p-2 outline-none border-[1px] border-[#D4D2E3] rounded-xl"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomFormInput;
