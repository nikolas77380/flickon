import classes from "./page.module.css";
import { Roboto } from "next/font/google";
import { Metadata } from "next";
import { getFixturesData } from "@/lib/api/requests";
import ResultsItem from "@/components/resultsItem/ResultsItem";
import { IResultsItem } from "@/lib/models/apiModels";

export const metadata: Metadata = {
  title: "Матчі | Англійський футбол",
};
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default async function Fixtures() {
  const fixtures = await getFixturesData();
  return (
    <>
      <header className={classes.header}>
        <h1 className={roboto.className}>Матчі</h1>
      </header>
      <section>
        {Object.keys(fixtures).map((date) => {
          return (
            <div className="w-auto max-w-[1373px] m-auto px-5" key={date}>
              <h2 className="my-5 text-[24px] font-bold">{date}</h2>
              {fixtures[date].map((game) => {
                const homeTeam = game.participants.find(
                  (el) => el.meta.location === "home"
                );
                const awayTeam = game.participants.find(
                  (el) => el.meta.location === "away"
                );
                const time = game.starting_at.split(" ")[1].split(":");
                const preparedMatch = {
                  teamA: homeTeam.name,
                  teamALogo: homeTeam.image_path,
                  teamB: awayTeam.name,
                  teamBLogo: awayTeam.image_path,
                  stadium: "",
                  time: `${time[0]}: ${time[1]}`,
                };
                return (
                  <ResultsItem
                    key={`${game.id}`}
                    item={preparedMatch as IResultsItem}
                  />
                );
              })}
            </div>
          );
        })}
      </section>
    </>
  );
}
