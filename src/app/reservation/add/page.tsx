import ReservationFirstStep from "@/components/reservation/ReservationFirstStep";

const ReservationAddPage = () => {
  return (
    <div className="container flex flex-col">
      <h2 className="mx-auto">예약 신청하기</h2>
      <ReservationFirstStep />
    </div>
  );
};

export default ReservationAddPage;
