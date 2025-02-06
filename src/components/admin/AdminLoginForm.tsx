"use client";

const AdminLoginForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data)
    console.log(e.target);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>이메일</label>
        <input type="email" name="email" />
      </div>
      <div>
        <label>비밀번호</label>
        <input type="password" name="password" />
      </div>
      <button>로그인</button>
    </form>
  );
};

export default AdminLoginForm;
