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
  const data = await getResultsData();
  const groupedItems = data?.reduce(
    (groups, item): { [key: string]: Array<IResultsItem> } => {
      if (!groups[item.date]) {
        groups[item.date] = [];
      }
      groups[item.date].push(item);
      return groups;
    },
    {} as { [key: string]: Array<IResultsItem> }
  );
  return (
    <>
      <header className={classes.header}>
        <h1 className={roboto.className}>Результати</h1>
      </header>
      <section className={classes.resultsList}>
        {groupedItems &&
          Object.keys(groupedItems).map((key) => {
            return (
              <>
                <h2 className="my-5 text-[24px] font-bold">{key}</h2>
                {groupedItems?.[key]?.map((el: IResultsItem, index: number) => (
                  <ResultsItem key={index} item={el} />
                ))}
              </>
            );
          })}
      </section>
    </>
  );
}
