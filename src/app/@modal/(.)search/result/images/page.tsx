import { Reservation } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { QueryClient } from "@tanstack/react-query";

const ResultImagePage = async ({
  searchParams: { id, index },
}: {
  searchParams: { id: string; index: string };
}) => {
  const supabaseClient = createClient();
  const { data } = await supabaseClient
    .from("user_reservations")
    .select("image_num")
    .eq("id", id)
    .single();
  const imageUrls = [];
  console.log(data);

  return (
    <div className="w-full h-[100vh] fixed top-0 bg-gray-70/60 text-white z-20">
      예약 id, index: {id}, {index}
    </div>
  );
};

export default ResultImagePage;
