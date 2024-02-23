import { FC } from "react";
import { LockKeyhole, Mail } from "lucide-react"; // Assuming this is where LucideIcon is defined

interface CustomLoginInputProps {
    icon?: string;
    placeholder?: string;
}

const CustomLoginInput: FC<CustomLoginInputProps> = ({ icon, placeholder }) => {
    return (
        <div className="flex items-center justify-center gap-4 w-full">
            <div className="">
                {icon === "mail" ? (
                    <Mail color="white" size={28} />
                ) : (
                    <LockKeyhole color="white" size={28} />
                )}
            </div>
            <input
                type="text"
                className="w-full  p-4 bg-white rounded-lg outline-none focus:ring-2"
                placeholder={placeholder}
            />
        </div>
    );
};

export default CustomLoginInput;
