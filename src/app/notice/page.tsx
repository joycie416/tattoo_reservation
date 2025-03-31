import NoticeList from "@/components/notice/NoticeList";
import PageHeader from "@/components/shared/PageHeader";

const NoticeListPage = () => {
  return (
    <>
      <PageHeader title="소식 · 이벤트" backTo="/" />
      <NoticeList />
    </>
  );
};

export default NoticeListPage;
