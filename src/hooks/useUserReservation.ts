import {
  addImages,
  addUserReservation,
  getUserReservations,
} from "@/api/reservation";
import { UserReservation } from "@/types/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

// 예약 글 가져오기
export const useGetUserReservation = (name?: string, contact?: string) => {
  return useQuery({
    queryKey:
      !name && !contact
        ? ["user_reservations", "full"]
        : ["user_reservations", name, contact],
    queryFn: () => getUserReservations(name, contact),
  });
};

// 예약 글 추가하기
export const useAddUserReservation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reservation: UserReservation & { images: File[] }) => {
      const { images, ...reservationData } = reservation;
      const id = await addUserReservation(reservationData);

      if (!!id) {
        try {
          await addImages(id, images);
        } catch {
          alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
        }
      }
    },
    onSuccess: () => {
      router.push("/reservation/add/complete");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["user_reservations", "full"],
      });
    },
  });
};
