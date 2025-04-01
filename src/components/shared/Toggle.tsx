import { cn } from "@/lib/utils";
import React from "react";

type ToggleProps = {
  bool: boolean;
};
const Toggle = ({ bool }: ToggleProps) => {
  return (
    <div
      className={cn(
        "w-8 h-[16px] p-[2px] bg-gray-50 rounded-[8px] relative transition",
        {
          "bg-blue-50": bool,
        }
      )}
    >
      <div
        className={cn(
          "w-[12px] h-[12px] absolute bg-white rounded-full transition-all",
          {
            "translate-x-[16px]": bool,
            // "left-[1px]": !bool,
          }
        )}
      />
    </div>
  );
};

export default Toggle;
