import { getClient } from "@/apolloConfig";
import { GET_ARTICLE } from "@/lib/graphQL/query";
import classes from "./page.module.css";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Roboto } from "next/font/google";

import { Label, Textarea, Button } from "flowbite-react";
import Image from "next/image";
interface IParams {
  articleId: string;
}

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Record<string, string>;
}) {
  const { data } = await getClient().query({
    query: GET_ARTICLE,
    variables: { articleId: params.articleId },
  });

  if (!data) {
    notFound();
  }
  return {
    title: data.article.data.attributes.title,
  };
}

export default async function Post({ params }: { params: IParams }) {
  const { data } = await getClient().query({
    query: GET_ARTICLE,
    variables: { articleId: params.articleId },
  });
  if (!data) {
    notFound();
  }
  const title = data.article.data.attributes.title;
  const content = data.article.data.attributes.content.replace(/\n/g, "<br>");
  const date = new Date(data.article.data.attributes.date).toDateString();
  const articleImage = data.article.data.attributes.image.data.attributes.url;
  const category =
    data.article.data.attributes.categories.data[0].attributes.title;
  return (
    <>
      <header className={`${classes.header} flex justify-center xs:gap-6`}>
        <Link href={`/news`} className="sm:text-base ">
          {category}
        </Link>
        <h1 className={`${roboto.className} xs:text-4xl xs:py-10 xs:p-0`}>
          {title}
        </h1>
        <span>{date}</span>
      </header>
      <main className={classes.main}>
        <Image
          src={`${process.env.API_BASE_URL}${articleImage}`}
          alt={title}
          width={1400}
          height={100}
        />
        <div
          className={classes.content}
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
        <hr />
        <form className="width-full my-10 flex flex-col items-center justify-start">
          <div className="mb-2 block">
            <Label htmlFor="comment" value="Ваш комментар" />
          </div>
          <Textarea
            id="comment"
            placeholder="залиште комментар..."
            required
            rows={4}
          />
          <Button type="submit" className="bg-header mt-5">
            Відправити
          </Button>
        </form>
      </main>
    </>
  );
}
