import AdminSigninForm from "@/components/admin/AdminLoginForm"
import { createClient } from "@/utils/supabase/server"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "관리자 로그인",
  description: "관리자 페이지",
}

const AdminPage = async () => {
  const supabase = createClient();
  const {data: {user}} = await supabase.auth.getUser();
  console.log('admin login page: user:', user)

  return (
    <div>
      <h1>관리자 로그인</h1>
      <AdminSigninForm />
    </div>
  )
}

export default AdminPage