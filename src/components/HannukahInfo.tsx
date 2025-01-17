import { CandleData } from '@/pages';

const HannukahInfo = ({
  year,
  startDate,
  endDate,
  hebrewYear,
  hebrewStartDate,
  hebrewEndDate,
}: CandleData) => {
  const calculateDayOfHannukah = (startDate: Date) => {
    const today = new Date();
    const timeDiff = today.getTime() - startDate.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    if (dayDiff >= 0 && dayDiff < 8) {
      return `We're on day ${dayDiff + 1} of Hanukkah!`;
    } else if (dayDiff < 0) {
      return `Hanukkah begins in ${Math.abs(dayDiff)} days`;
    }
  };

  return (
    <div className="p-4 text-center max-w-full">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Happy Hanukkah!</h1>
      <h2 className="text-2xl text-gray-600 m-2">
        {year} | {hebrewYear}
      </h2>
      <p className="text-lg text-gray-600">
        This year hannukah starts on {startDate.toLocaleDateString()} and ends
        on {endDate.toLocaleDateString()}
      </p>
      <p className="text-lg text-gray-600">
        {calculateDayOfHannukah(startDate)}
      </p>
      <p className="text-lg text-gray-600 mt-4">
        Baruch atah Adonai Eloheinu Melech ha&apos;olam, asher kid&apos;shanu
        b&apos;mitzvotav v&apos;tzivanu l&apos;hadlik ner shel Hanukkah
      </p>
      <hr className="my-4" />
      <p className="text-lg text-gray-600">
        In the Hebrew calendar, it starts on {hebrewStartDate} and ends on{' '}
        {hebrewEndDate}
      </p>
      <p className="text-lg text-gray-600 mt-4">
        ברוך אתה ה&apos; אלוהינו מלך העולם, אשר קידשנו במצוותיו וציוונו להדליק
        נר של חנוכה
      </p>
    </div>
  );
};

export default HannukahInfo;
