import { redirect } from "next/navigation";

const layout = () => {
  return redirect("/search/result");
};

export default layout;
