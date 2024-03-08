"use client";
import { ArticleEntity } from "@/lib/gql/graphql";
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function NewsItem({ article }: { article: ArticleEntity }) {
  const router = useRouter();
  const id = article?.id;
  const articleImage = article?.attributes?.image?.data?.attributes
    ?.url as string;
  const title = article?.attributes?.title;
  const content = article?.attributes?.content?.substring(0, 200) + "...";
  const date = new Date(article?.attributes?.date).toDateString();
  return (
    <div
      className="grid grid-cols-[15.5rem_40rem] max-w-[55.5rem] gap-5 mb-10 cursor-pointer"
      onClick={() => router.push(`/articles/${id}`)}
    >
      <Image
        src={`${process.env.API_KEY}${articleImage}`}
        className="rounded"
        alt={title || ""}
        width={250}
        height={250}
      />
      <div className="flex flex-col justify-around items-start gap-2">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <div
          className="font-normal text-gray-700 dark:text-gray-400 overflow-hidden max-h-[70px]"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
        <div className="text-sm">
          <p className="font-bold text-header">{date}</p>
        </div>
      </div>
    </div>
  );
}
