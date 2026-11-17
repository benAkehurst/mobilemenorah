type AppConfig = {
  appName: string;
  /** Used for <title> on the home page and in social cards. */
  appTitle: string;
  appDescription: string;
  /** Canonical origin, no trailing slash. */
  appDomainName: string;
  domainName: string;
  companyName: string;
  publicEmailAddress: string;
  author: {
    name: string;
    url: string;
  };
  ads: {
    /**
     * Feature flag for adverts. Keep false until an ad network is approved
     * and its script/consent requirements are wired into <AdSlot />.
     */
    enabled: boolean;
  };
};

export const appConfig: AppConfig = {
  appName: "Mobile Menorah",
  appTitle: "Mobile Menorah – Light a Virtual Hanukkah Menorah Online",
  appDescription:
    "Light a virtual Hanukkah menorah on your phone, tablet or computer. See tonight's candle count, the Hanukkah blessings in Hebrew and English, this year's Hanukkah dates and how to light the menorah. Free, with nothing to install.",
  appDomainName: "https://www.mobilemenorah.com",
  domainName: "mobilemenorah.com",
  companyName: "Mobile Menorah",
  publicEmailAddress: "benakehurstyt@gmail.com",
  author: {
    name: "Ben Akehurst",
    url: "https://www.benakehurst.com",
  },
  ads: {
    enabled: false,
  },
};
