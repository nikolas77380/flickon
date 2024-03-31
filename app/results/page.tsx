import classes from "./page.module.css";
import { Roboto } from "next/font/google";
import { Metadata } from "next";
import { getResultsData } from "@/lib/api/requests";
import { IResultsItem } from "@/lib/models/apiModels";
import ResultsItem from "@/components/resultsItem/ResultsItem";

export const metadata: Metadata = {
  title: "Результати | Англійський футбол",
};
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default async function Results() {
  const results = await getResultsData();

  return (
    <>
      <header className={classes.header}>
        <h1 className={roboto.className}>Результати</h1>
      </header>
      <section>
        {results &&
          Object.keys(results).map((date) => {
            return (
              <div className="w-auto max-w-[1373px] m-auto px-5" key={date}>
                <h2 className="my-5 text-[24px] font-bold">{date}</h2>
                {results[date].map((game) => {
                  const homeTeam = game.participants.find(
                    (el) => el.meta.location === "home"
                  );
                  const awayTeam = game.participants.find(
                    (el) => el.meta.location === "away"
                  );
                  const homeGoals = game.scores.find(
                    (el) => el.score.participant === "home"
                  ).score.goals;
                  const awayGoals = game.scores.find(
                    (el) => el.score.participant === "away"
                  ).score.goals;

                  const preparedMatch = {
                    teamA: homeTeam.name,
                    teamALogo: homeTeam.image_path,
                    goalsTeamA: homeGoals,
                    teamB: awayTeam.name,
                    teamBLogo: awayTeam.image_path,
                    goalsTeamB: awayGoals,
                    stadium: "",
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
