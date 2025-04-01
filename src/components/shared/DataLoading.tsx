import React from "react";
import Portal from "./Portal";

const DataLoading = () => {
  if (typeof document === "undefined") return null;

  return (
    <Portal domNode={document.body}>
      <div className="fixed top-0 w-full h-full flex bg-gray-100/50 z-50"></div>
    </Portal>
  );
};

export default DataLoading;
