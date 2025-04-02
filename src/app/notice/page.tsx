import AddNoticeButton from "@/components/notice/AddNoticeButton";
import NoticeList from "@/components/notice/NoticeList";
import PageHeaderWithButton from "@/components/shared/PageHeaderWithButton";

const NoticeListPage = () => {
  return (
    <>
      <PageHeaderWithButton title="소식 · 이벤트" backTo="/">
        <AddNoticeButton />
      </PageHeaderWithButton>
      <NoticeList />
    </>
  );
};

export default NoticeListPage;
