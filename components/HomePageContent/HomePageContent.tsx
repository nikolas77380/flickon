"use client";

import useScreenSize from "@/hooks/useMediaQuery";
import { ArticleEntity } from "@/lib/gql/graphql";
import Table from "@/components/table/Table";
import NewsItem from "@/components/dashboardItems/NewsItem";
import { CustomFlowbiteTheme, Tabs } from "flowbite-react";
import Link from "next/link";
import { ITableItem, IResultsItem } from "@/lib/models/apiModels";
import GameItem from "@/components/dashboardItems/GameItem";
import classes from "./homePageContent.module.css";

interface IHomePageContent {
  tableData: ITableItem[] | undefined;
  data: any;
  results: IResultsItem[] | undefined;
  fixtures: IResultsItem[] | undefined;
}

const customTheme: CustomFlowbiteTheme["tabs"] = {
  tablist: {
    styles: {
      pills:
        "flex-wrap justify-center font-medium text-sm text-black  space-x-2",
      fullWidth:
        "w-full text-sm font-medium divide-x divide-gray-200 shadow grid grid-flow-col dark:divide-gray-700 dark:text-gray-400 rounded-none",
    },
    tabitem: {
      styles: {
        pills: {
          base: "hover:outline-none border-transparent focus:border-transparent focus:ring-0",
          active: {
            on: "rounded-lg bg-header text-white border-none",
            off: "rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white",
          },
        },
      },
    },
  },
};

export default function HomePageContent({
  data,
  tableData,
  results,
  fixtures,
}: IHomePageContent) {
  const { width } = useScreenSize();
  if (width < 768) {
    return (
      <Tabs aria-label="Pills" style="pills" theme={customTheme}>
        <Tabs.Item active title="Останні новини">
          <div className="flex flex-col md:flex-row gap-10">
            {data.articles.data.map((el: ArticleEntity, index: number) => (
              <NewsItem key={index} article={el} />
            ))}
          </div>
        </Tabs.Item>
        <Tabs.Item title="Матчі">
          <Table type={"simple"} data={tableData} />
          <div className="flex flex-col gap-2 mt-3">
            <h3 className="text-[24px] font-semibold color-header text-center">
              Останні результати
            </h3>
            {results?.map((el: IResultsItem, index: number) => (
              <GameItem key={index} item={el} />
            ))}
          </div>
          <Link
            className="hover:underline italic color-header flex justify-end gap-2 pt-2"
            href={"/results"}
          >
            всі результати
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </Link>
          <div className="flex flex-col gap-2 mt-3">
            <h3 className="text-[24px] font-semibold color-header text-center">
              Майбутні матчі
            </h3>
            {fixtures?.map((el: IResultsItem, index: number) => (
              <GameItem key={index} item={el} />
            ))}
          </div>
          <Link
            className="hover:underline italic color-header flex justify-end gap-2 pt-2"
            href={"/fixtures"}
          >
            всі матчі
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </Link>
        </Tabs.Item>
      </Tabs>
    );
  } else {
    return (
      <div className="flex flex-col md:flex-row justify-start gap-24">
        <section>
          <div className="border-b-2 pb-7">
            <div className="flex justify-between mb-2">
              <h3 className="text-[24px] font-semibold color-header">
                Свіжі новини
              </h3>
              <Link
                className="hover:underline italic color-header flex gap-2"
                href={"/news"}
              >
                всі новини
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              </Link>
            </div>
            <div className="flex flex-col xl:flex-row gap-10 ">
              {data.articles.data.map((el: ArticleEntity, index: number) => (
                <NewsItem key={index} article={el} />
              ))}
            </div>
          </div>
          <div className="border-b-2 pb-7">
            <div className=" pt-10 flex justify-between mb-2">
              <h3 className="text-[24px] font-semibold color-header">
                Останні результати
              </h3>
              <Link
                className="hover:underline italic color-header flex gap-2"
                href={"/results"}
              >
                всі результати
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 ">
              {results?.map((el: IResultsItem, index: number) => (
                <GameItem key={index} item={el} />
              ))}
            </div>
          </div>
          <div
            className={`bg-header w-full h-[300px] rounded ${classes.banner}`}
          />
          <div className="border-b-2 pb-7">
            <div className=" pt-10 flex justify-between mb-2">
              <h3 className="text-[24px] font-semibold color-header">
                Майбутні матчі
              </h3>
              <Link
                className="hover:underline italic color-header flex gap-2"
                href={"/fixtures"}
              >
                всі матчі
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 ">
              {fixtures?.map((el: IResultsItem, index: number) => (
                <GameItem key={index} item={el} />
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }
}
