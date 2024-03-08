"use client";

import { useRouter } from "next/navigation";

import { ArticleEntity } from "@/lib/gql/graphql";
import { motion } from "framer-motion";
import { Card } from "flowbite-react";
export default function NewsItem({ article }: { article: ArticleEntity }) {
  const router = useRouter();
  const articleImage = article?.attributes?.image?.data?.attributes
    ?.url as string;
  const title = article?.attributes?.title;
  const category = article?.attributes?.categories?.data[0]?.attributes?.title;
  const date = new Date(article?.attributes?.date).toDateString();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{ minWidth: "21.25rem" }}
      className="cursor-pointer"
      onClick={() => router.push(`/articles/${article.id}`)}
    >
      <Card
        style={{ maxWidth: "40.5rem" }}
        className="w-full"
        imgSrc={`${process.env.API_KEY}${articleImage}`}
        onClick={() => router.push(`/articles/${article?.id}`)}
      >
        <p className="italic font-medium text-[12px]">{category}</p>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <div className="text-sm">
          <p className="font-bold text-header">{date}</p>
        </div>
      </Card>
    </motion.div>
  );
}
