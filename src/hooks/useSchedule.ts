import { addSchedules, deleteSchedules, getSchedules } from "@/api/schedule";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

// 일정 정보 가져오기
export const useGetSchedule = (year: string, month: string) => {
  return useQuery({
    queryKey: ["schedule", year, month],
    queryFn: () => getSchedules(year, month),
    staleTime: Infinity, // 새로고침 시 새로운 데이터 가져옴
  });
};

// 일정 추가/삭제하기
export const useEditScheduleMutation = (date: string) => {
  const router = useRouter()
  const queryClient = useQueryClient();
  const [year, month] = date.split("-");

  return useMutation({
    mutationFn: async ({
      addTimes = [],
      deleteIds = [],
    }: {
      addTimes: string[];
      deleteIds: string[];
    }) => {
      await addSchedules(date, addTimes);
      await deleteSchedules(deleteIds);
    },
    onSuccess: () => {
      router.push("/schedule/add");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule", year, month] });
    },
  });
};
