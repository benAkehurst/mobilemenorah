import ColourPicker from "@/components/ColourPicker";
import CookieBanner from "@/components/CookieBanner";
import HannukahInfo from "@/components/HannukahInfo";
import Menorah from "@/components/Menorah";
import { useGetHanukkahDates } from "@/hooks/useGetHanukkahDates";
import { useEffect, useState } from "react";

export type CandleData = {
  year: number;
  startDate: Date;
  endDate: Date;
  hebrewYear: number;
  hebrewStartDate: string;
  hebrewEndDate: string;
};

export default function Home() {
  const { hanukkahDatesThisYear } = useGetHanukkahDates();
  const [candleData, setCandleData] = useState<CandleData>({
    year: 0,
    startDate: new Date(),
    endDate: new Date(),
    hebrewYear: 0,
    hebrewStartDate: "",
    hebrewEndDate: "",
  });
  console.log("🚀 ~ Home ~ candleData:", candleData);

  const [dayOfHanukkah, setDayOfHanukkah] = useState<number>(0);
  const [candleColour, setCandleColour] = useState<string>("");

  useEffect(() => {
    setCandleData(hanukkahDatesThisYear[0]);
    if (hanukkahDatesThisYear[0]) {
      const today = new Date();
      const startDate = new Date(hanukkahDatesThisYear[0].startDate);
      const endDate = new Date(hanukkahDatesThisYear[0].endDate);
      if (today >= startDate && today <= endDate) {
        const diff = Math.abs(today.getTime() - startDate.getTime());
        const day = Math.ceil(diff / (1000 * 60 * 60 * 24));
        setDayOfHanukkah(day);
      }
    }
  }, [hanukkahDatesThisYear]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start" p-4 bg-slate-100`}
    >
      <HannukahInfo
        year={candleData.year}
        startDate={candleData.startDate}
        endDate={candleData.endDate}
        hebrewYear={candleData.hebrewYear}
        hebrewStartDate={candleData.hebrewStartDate}
        hebrewEndDate={candleData.hebrewEndDate}
      />
      <Menorah hanukkahDay={dayOfHanukkah} candleColour={candleColour} />
      <ColourPicker handleCandleColour={setCandleColour} />
      <CookieBanner />
    </main>
  );
}
