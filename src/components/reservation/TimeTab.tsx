'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCurrentTime } from "@/utils/schedule";
import { useState } from "react";

const TimeTab = () => {
  const [currentMonth, setCurrentMonth] = useState<[number, number]>(() => {
    // 게으른 초기화 : 첫 렌더링 시에만 실행
    const today = getCurrentTime()[1];
    const curMonth = today.split("-").map(Number);
    return [curMonth[0], curMonth[1]];
  });
  const nextMonth = () => {
    if (currentMonth[1] === 12) {
      setCurrentMonth((prev) => {
        return [prev[0] + 1, 1];
      });
      return;
    }
    setCurrentMonth((prev) => {
      return [prev[0], prev[1] + 1];
    });
  };

  const prevMonth = () => {
    if (currentMonth[1] === 1) {
      setCurrentMonth((prev) => {
        // setDate({ date: `${prev[0] - 1}-12-01` });

        return [prev[0] - 1, 12];
      });
      return;
    }
    setCurrentMonth((prev) => {
      // setDate({ date: `${prev[0]}-${("0" + (prev[1] - 1)).slice(-2)}-01` });

      return [prev[0], prev[1] - 1];
    });
  };

  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
};

export default TimeTab;
