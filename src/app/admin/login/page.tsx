import AdminSigninForm from "@/components/admin/AdminLoginForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "관리자 로그인",
  description: "관리자 페이지",
}

const AdminPage = async () => {

  return (
    <div className="w-full h-screen items-center">
      <AdminSigninForm />
    </div>
  )
}

export default AdminPage