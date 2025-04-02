import { cn } from "@/lib/utils";
import React from "react";

type ToggleProps = {
  bool: boolean;
};
const Toggle = ({ bool }: ToggleProps) => {
  return (
    <div
      className={cn(
        "w-[42px] h-[22px] p-[2px] bg-gray-50 rounded-[21px] relative transition",
        {
          "bg-blue-50": bool,
        }
      )}
    >
      <div
        className={cn(
          "w-[18px] h-[18px] absolute bg-white rounded-full transition-all",
          {
            "translate-x-[20px]": bool,
          }
        )}
      />
    </div>
  );
};

export default Toggle;
