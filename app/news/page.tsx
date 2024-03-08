import { getClient } from "@/apolloConfig";
import { GET_ARTICLES } from "@/lib/graphQL/query";
import classes from "./page.module.css";
import { Roboto } from "next/font/google";
import { ArticleEntity } from "@/lib/gql/graphql";
import NewsItem from "@/components/newsItem/NewsItem";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Новини | Англійський футбол",
};
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default async function News() {
  const { data } = await getClient().query({
    query: GET_ARTICLES,
  });
  return (
    <>
      <header className={classes.header}>
        <h1 className={roboto.className}>Новини</h1>
      </header>
      <section className={classes.newsList}>
        {data.articles.data.map((el: ArticleEntity, index: number) => (
          <NewsItem key={index} article={el} />
        ))}
      </section>
    </>
  );
}
