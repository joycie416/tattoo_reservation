import ReservationStep from "@/components/reservation/ReservationStepForm";
import PageHeader from "@/components/shared/PageHeader";
import React from "react";

type ReservationStepPageParams = { params: { step: string } };

const ReservationStepPage = ({
  params: { step },
}: ReservationStepPageParams) => {
  return (
    <>
      <PageHeader
        title="예약 문의"
        backTo={step === "1" ? "/" : `/reservation/add/${Number(step) - 1}`}
      />
      <div className="container">
        <ReservationStep step={step} />
      </div>
    </>
  );
};

export default ReservationStepPage;
