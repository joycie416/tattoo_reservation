"use client";

import { useAdmin } from "@/hooks/useAdmin";
import { Pen } from "lucide-react";
import Link from "next/link";
import React from "react";

const AddNoticeButton = () => {
  const admin = useAdmin();
  return (
    <>
      {!!admin && (
        <Link href="/admin/notice/add" className="p-2 absolute right-4">
          <Pen />
        </Link>
      )}
    </>
  );
};

export default AddNoticeButton;
