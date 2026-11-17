import JsonLd from "@/components/JsonLd";
import Prose from "@/components/Prose";
import { pageMetadata } from "@/lib/metadata";
import { pageSchema } from "@/lib/schema";
import { appConfig } from "../../../app.config";

const title = "About";
const description = `Why ${appConfig.appName} was created: a free virtual Hanukkah menorah for anyone who can't light real candles, built by ${appConfig.author.name}.`;

export const metadata = pageMetadata({ title, description, path: "/about" });

export default function AboutPage() {
  return (
    <Prose title={`About ${appConfig.appName}`}>
      <JsonLd data={pageSchema({ path: "/about", name: title, description, type: "AboutPage" })} />
      <p>
        {appConfig.appName} lets anybody, wherever they are in the world, light a menorah at
        Hanukkah. You can light the candles from your phone, tablet or computer, learn the
        blessings and see when Hanukkah falls each year.
      </p>

      <h2>Why I created it</h2>
      <p>
        I&apos;m a software engineer who loves solving problems. One year I was abroad during
        Hanukkah without a menorah, so my family couldn&apos;t light candles together. I wanted a
        digital menorah we could light from our phones, so I built one, and I hope it helps others
        in the same situation.
      </p>
      <p>
        A virtual menorah isn&apos;t a substitute for lighting real candles when you can, but it&apos;s
        a way to share the lights, practise the blessings and teach children about the festival.
      </p>

      <h2>Get in touch</h2>
      <p>
        Questions, feedback or ideas? <a href={`mailto:${appConfig.publicEmailAddress}`}>Email me</a>{" "}
        or visit <a href={appConfig.author.url}>{appConfig.author.url.replace("https://", "")}</a>.
      </p>
    </Prose>
  );
}
