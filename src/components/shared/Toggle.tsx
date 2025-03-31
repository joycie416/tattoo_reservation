import { cn } from "@/lib/utils";
import React from "react";

type ToggleProps = {
  bool: boolean;
};
const Toggle = ({ bool }: ToggleProps) => {
  return (
    <div
      className={cn(
        "w-8 h-[16px] p-[1.1px] flex items-center bg-gray-50 rounded-[8px] transition",
        {
          "bg-blue-50": bool,
        }
      )}
    >
      <div
        className={cn(
          "h-[13.7px] aspect-square flex items-center bg-white rounded-full trasition",
          {
            "ml-auto": bool,
            "mr-auto": !bool,
          }
        )}
      />
    </div>
  );
};

export default Toggle;
