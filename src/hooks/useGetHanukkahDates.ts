export const useGetHanukkahDates = () => {
  const today = new Date();
  const hanukkahDatesThisYear = hanukkahDates.filter(
    (hanukkahDate) => hanukkahDate.year === today.getFullYear()
  );

  return {
    hanukkahDatesThisYear,
  };
};

const hanukkahDates = [
  {
    year: 2024,
    startDate: new Date("2024-12-25"),
    endDate: new Date("2025-01-02"),
    hebrewYear: 5785,
    hebrewStartDate: "כ״ה כסלו ה׳תשפ״ו",
    hebrewEndDate: "ב׳ טבת ה׳תשפ״ו",
  },
  {
    year: 2025,
    // startDate: new Date("2025-12-14"),
    // endDate: new Date("2025-12-22"),
    startDate: new Date("2025-01-10"),
    endDate: new Date("2025-01-18"),
    hebrewYear: 5786,
    hebrewStartDate: "ה׳ כסלו ה׳תשפ״ו",
    hebrewEndDate: "ט׳ כסלו ה׳תשפ״ו",
  },
  {
    year: 2026,
    startDate: new Date("2026-12-4"),
    endDate: new Date("2026-12-12"),
    hebrewYear: 5787,
    hebrewStartDate: "כ׳׳ד כסלו ה׳תשפ״ז",
    hebrewEndDate: "ב׳׳ג כסלו ה׳תשפ״ז",
  },
  {
    year: 2027,
    startDate: new Date("2027-12-24"),
    endDate: new Date("2027-1-1"),
    hebrewYear: 5788,
    hebrewStartDate: "כ״ד כסלו ה׳תשפ״ח",
    hebrewEndDate: "ב׳ טבת ה׳תשפ״ח",
  },
  {
    year: 2028,
    startDate: new Date("2028-12-12"),
    endDate: new Date("2028-12-20"),
    hebrewYear: 5789,
    hebrewStartDate: "י״ב כסלו ה׳תשפ״ט",
    hebrewEndDate: "ט׳ כסלו ה׳תשפ״ט",
  },
  {
    year: 2029,
    startDate: new Date("2029-12-1"),
    endDate: new Date("2029-12-9"),
    hebrewYear: 5790,
    hebrewStartDate: "א׳ כסלו ה׳תש״פ",
    hebrewEndDate: "ט׳ כסלו ה׳תש״פ",
  },
  {
    year: 2030,
    startDate: new Date("2030-12-21"),
    endDate: new Date("2030-12-29"),
    hebrewYear: 5791,
    hebrewStartDate: "כ״א כסלו ה׳תש״פא",
    hebrewEndDate: "כ״ט כסלו ה׳תש״פא",
  },
  {
    year: 2031,
    startDate: new Date("2031-12-10"),
    endDate: new Date("2031-12-18"),
    hebrewYear: 5792,
    hebrewStartDate: "י׳ כסלו ה׳תש״פב",
    hebrewEndDate: "י״ח כסלו ה׳תש״פב",
  },
];
