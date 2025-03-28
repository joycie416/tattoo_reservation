import ReservationSearchForm from "@/components/search/ReservationSearchForm";
import PageHeader from "@/components/shared/PageHeader";
import React from "react";

const ReservationSearchPage = () => {
  return (
    <>
      <PageHeader title="내 예약 확인" backTo="/" />{" "}
      <div className="container min-h-[calc(100vh-59px)] flex items-center">
        <ReservationSearchForm />
      </div>
    </>
  );
};

export default ReservationSearchPage;
