import { redirect } from "next/navigation";

const NoticeListPage = () => {
  redirect("/admin/notice/add");
};

export default NoticeListPage;
