"use client";

import { useAdmin } from "@/hooks/useQueryData";
import { Pen } from "lucide-react";
import Link from "next/link";
import React from "react";

const AddPortfolioButton = () => {
  const admin = useAdmin();
  return (
    <>
      {!!admin && (
        <Link href="/portfolio/add" className="p-2 absolute right-4">
          <Pen />
        </Link>
      )}
    </>
  );
};

export default AddPortfolioButton;
