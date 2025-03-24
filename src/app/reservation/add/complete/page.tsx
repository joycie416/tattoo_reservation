import CompletePage from "@/components/reservation/CompletePage";
import PageHeader from "@/components/shared/PageHeader";
import React from "react";

const ReservationAddCompletePage = () => {
  return (
    <>
      <PageHeader title="예약 완료" backTo="/reservation/add" />

      <div className="container">
        <CompletePage />
      </div>
    </>
  );
};

export default ReservationAddCompletePage;
