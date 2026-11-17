/**
 * Shared page content. The same source feeds the visible page, the JSON-LD
 * structured data and /llms.txt, so answer engines and people see identical
 * answers.
 */
import { describeHanukkah, formatLongDate, type HanukkahDates } from "./hanukkah";

export type Blessing = {
  id: string;
  title: string;
  when: string;
  hebrew: string;
  transliteration: string;
  translation: string;
};

export const blessings: Blessing[] = [
  {
    id: "lehadlik",
    title: "Blessing over the candles",
    when: "Every night, before lighting",
    hebrew:
      "ברוך אתה ה׳ אלוהינו מלך העולם, אשר קידשנו במצוותיו וציוונו להדליק נר של חנוכה",
    transliteration:
      "Baruch atah Adonai Eloheinu Melech ha'olam, asher kid'shanu b'mitzvotav v'tzivanu l'hadlik ner shel Hanukkah.",
    translation:
      "Blessed are You, Lord our God, King of the universe, who has made us holy with His commandments and commanded us to light the Hanukkah candles.",
  },
  {
    id: "sheasah-nisim",
    title: "Blessing for the miracles",
    when: "Every night, before lighting",
    hebrew:
      "ברוך אתה ה׳ אלוהינו מלך העולם, שעשה ניסים לאבותינו בימים ההם בזמן הזה",
    transliteration:
      "Baruch atah Adonai Eloheinu Melech ha'olam, she'asah nisim la'avoteinu bayamim haheim bazman hazeh.",
    translation:
      "Blessed are You, Lord our God, King of the universe, who performed miracles for our ancestors in those days at this season.",
  },
  {
    id: "shehecheyanu",
    title: "Shehecheyanu",
    when: "First night only",
    hebrew:
      "ברוך אתה ה׳ אלוהינו מלך העולם, שהחיינו וקיימנו והגיענו לזמן הזה",
    transliteration:
      "Baruch atah Adonai Eloheinu Melech ha'olam, shehecheyanu v'kiy'manu v'higiyanu lazman hazeh.",
    translation:
      "Blessed are You, Lord our God, King of the universe, who has kept us alive, sustained us and brought us to this season.",
  },
];

export type HowToStep = { name: string; text: string };

export const howToSteps: HowToStep[] = [
  {
    name: "Place the candles",
    text: "Put one candle in the menorah for each night of Hanukkah so far, filling the holders from right to left. The shamash (helper candle) goes in its own raised holder.",
  },
  {
    name: "Light the shamash",
    text: "After sundown, light the shamash first. In Mobile Menorah, tap the shamash to light it.",
  },
  {
    name: "Say the blessings",
    text: "Say the blessings over the candles and for the miracles. On the first night, add the Shehecheyanu.",
  },
  {
    name: "Light the candles from left to right",
    text: "Use the shamash to light the candles, starting with the newest candle on the left and moving right. In Mobile Menorah, drag the shamash's flame over each wick or tap each candle.",
  },
  {
    name: "Return the shamash and enjoy the lights",
    text: "Put the shamash back in its holder. Let the candles burn for at least 30 minutes after nightfall and place the menorah where it can be seen, such as a window.",
  },
];

export type Faq = { question: string; answer: string };

export function getFaqs(current: HanukkahDates): Faq[] {
  return [
    {
      question: "What is Hanukkah?",
      answer:
        "Hanukkah (also spelled Chanukah) is the eight-night Jewish Festival of Lights. It remembers the rededication of the Second Temple in Jerusalem in the 2nd century BCE after the Maccabees' revolt, and the miracle of a single day's supply of oil that burned for eight days. Each night, families light a menorah (hanukkiah), say blessings, and often eat fried foods such as latkes and sufganiyot and play dreidel.",
    },
    {
      question: `When is Hanukkah ${current.year}?`,
      answer: `${describeHanukkah(current)} The first candle is lit on the evening of ${formatLongDate(
        current.firstCandle
      )} and the eighth candle on the evening of ${formatLongDate(current.lastCandle)}.`,
    },
    {
      question: "How many candles do you light on each night of Hanukkah?",
      answer:
        "Light one candle on the first night and add one more each night, up to eight candles on the eighth night. The shamash is lit every night as well, so a full Hanukkah uses 44 candles: 36 for the nights plus 8 for the shamash.",
    },
    {
      question: "What is the shamash?",
      answer:
        "The shamash is the helper candle. It sits apart from the other eight, usually higher or in the middle, and is lit first and used to light the other candles.",
    },
    {
      question: "Which direction do you light the menorah?",
      answer:
        "Candles are placed in the menorah from right to left, and lit from left to right. That means you always light the newest candle first.",
    },
    {
      question: "What blessings are said when lighting the menorah?",
      answer:
        "Two blessings are said every night before lighting: one over the candles (l'hadlik ner shel Hanukkah) and one for the miracles (she'asah nisim). On the first night a third blessing, the Shehecheyanu, is added.",
    },
    {
      question: "How long should Hanukkah candles burn?",
      answer:
        "The candles should burn for at least 30 minutes after nightfall. On Friday, light before the Shabbat candles and use longer candles so they last; on Saturday night, light after Shabbat ends.",
    },
    {
      question: "Can a virtual menorah replace real candles?",
      answer:
        "Most rabbinic authorities hold that the mitzvah of lighting requires a real flame, so a virtual or electric menorah does not fulfil it. Mobile Menorah is for learning, sharing, practising the blessings, and celebrating when you can't light real candles, for example while travelling, in hospital or in student halls. If you can, light real candles too.",
    },
    {
      question: "Is Mobile Menorah free?",
      answer:
        "Yes. Mobile Menorah is free and works in any modern web browser on a phone, tablet or computer, with nothing to download or install.",
    },
  ];
}
