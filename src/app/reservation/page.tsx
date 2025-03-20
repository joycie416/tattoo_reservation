import Link from "next/link";

const ReservationListPage = () => {
  return (
    <div className="container">
      <h2>예약 목록 페이지</h2>
      <Link href="/reservation/add">예약하기</Link>
    </div>
  );
};

export default ReservationListPage;
