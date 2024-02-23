import React from "react";

interface CustomInputProps {
    type: "text" | "email" | "password" | "tel" | "textarea";
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder: string;
    label: string;
    required?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
    type,
    name,
    value,
    onChange,
    placeholder,
    label,
    required,
}) => {
    return type === "textarea" ? (
        <div className="flex flex-col gap-2">
            <label htmlFor={name} className="block text-sm font-semibold leading-6">
                {label.split("*").map((part, index) => (
                    <span key={index}>
                        {part}
                        {index < label.split("*").length - 1 && (
                            <span className="text-red-500">*</span>
                        )}
                    </span>
                ))}
            </label>{" "}
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="px-5 py-3 bg-white rounded-xl border-[#D4D2E3] focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent placeholder-[#] placeholder:text-sm "
                required={required}
            />
        </div>
    ) : (
        <div className="flex flex-col gap-2">
            <label htmlFor={name} className="block text-sm font-semibold leading-6">
                {label.split("*").map((part, index) => (
                    <span key={index}>
                        {part}
                        {index < label.split("*").length - 1 && (
                            <span className="text-red-500">*</span>
                        )}
                    </span>
                ))}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="px-5 py-3 bg-white border-[#D4D2E3] rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent placeholder-[#] placeholder:text-sm "
                required={required}
            />
        </div>
    );
};

export default CustomInput;
