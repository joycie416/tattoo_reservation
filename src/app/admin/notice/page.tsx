import { redirect } from "next/navigation";

const NoticeListPage = () => {
  return redirect("/admin/notice/add");
};

export default NoticeListPage;
