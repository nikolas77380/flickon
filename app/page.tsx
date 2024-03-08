import { getClient } from "@/apolloConfig";
import { GET_ARTICLES } from "@/lib/graphQL/query";
import { notFound } from "next/navigation";
import {
  getFixturesData,
  getResultsData,
  getTableData,
} from "@/lib/api/requests";
import HomePageContent from "@/components/HomePageContent/HomePageContent";
import { Metadata } from "next";
import Sidebar from "@/components/sidebar/Sidebar";
import { Suspense } from "react";
import Loading from "./loading";
export const metadata: Metadata = {
  title: "Домашня сторінка | Англійський футбол",
};
export default async function Home() {
  const { data } = await getClient().query({
    query: GET_ARTICLES,
  });
  const tableData = await getTableData();
  const results = await getResultsData();
  const fixtures = await getFixturesData();

  const date = Object.keys(fixtures?.[1])[0];

  const dashboardFixtures = Object.keys(fixtures?.[1][date].Datetime).map(
    (time: any) => {
      return fixtures?.[1][date].Datetime[time].map((item: any) => ({
        teamA: item.ClubA,
        teamALogo: item.LogoClubA,
        teamB: item.ClubB,
        teamBLogo: item.LogoClubB,
        stadium: item.Stadium,
        date,
        time: time.split(" ")[0],
      }));
    }
  );
  const slicedResults = results?.slice(0, 4);
  if (!data) {
    notFound();
  }
  return (
    <main className="flex items-start gap-8 min-h-screen justify-center py-24 px-10 max-w-[1376px] m-auto">
      <Suspense fallback={<Loading />}>
        <Sidebar />
        <HomePageContent
          data={data}
          tableData={tableData}
          results={slicedResults}
          fixtures={dashboardFixtures.flat(1)}
        />
      </Suspense>
    </main>
  );
}
