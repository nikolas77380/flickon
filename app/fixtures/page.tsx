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
  const dates = fixtures.map((el: any) => Object.keys(el)[0]);
  return (
    <>
      <header className={classes.header}>
        <h1 className={roboto.className}>Матчі</h1>
      </header>
      <section>
        {dates.map((date: string) => {
          const matches = Object.values(
            fixtures.find((el: any) => Object.keys(el)[0] === date)
          )[0]?.["Datetime"];

          const times = Object.keys(matches);
          return (
            <div className="w-auto max-w-[1373px] m-auto px-5" key={date}>
              <h2 className="my-5 text-[24px] font-bold">{date}</h2>
              {times.map((time: string) => {
                return matches[time].map((match: any) => {
                  const preparedMatch = {
                    teamA: match.ClubA,
                    teamALogo: match.LogoClubA,
                    teamB: match.ClubB,
                    teamBLogo: match.LogoClubB,
                    stadium: match.Stadium,
                    time: time.split(" ")[0],
                  };
                  return (
                    <ResultsItem
                      key={`${match.ClubA}-${match.ClubB}`}
                      item={preparedMatch as IResultsItem}
                    />
                  );
                });
              })}
            </div>
          );
        })}
      </section>
    </>
  );
}
