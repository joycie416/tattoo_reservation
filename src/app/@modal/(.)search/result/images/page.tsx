import ImageCarousel from "@/components/search/ImageCarousel";
import { getPublicUrl } from "@/utils/common";
import { createClient } from "@/utils/supabase/server";

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
  for (let i = 0; i < (data?.image_num ?? 0); i++) {
    imageUrls.push(getPublicUrl("user_reservations", id, i));
  }

  return (
    <div className="fixed top-0 z-20">
      <ImageCarousel startIndex={index} imageUrls={imageUrls} />;
    </div>
  );
};

export default ResultImagePage;
