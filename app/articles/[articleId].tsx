import { notFound } from "next/navigation";
interface IParams {
  articleId: string;
}
export async function generateMetadata({
  params,
}: {
  params: Record<string, string>;
}) {
  const res = await fetch(
    `http://localhost:1337/api/posts/${params.articleId}?populate=categories`
  );
  console.log(res);
  const article = await res.json();
  if (!article) {
    notFound();
  }
  return {
    title: article.data?.title,
  };
}

export default async function Post({ params }: { params: IParams }) {
  const res = await fetch(
    `http://localhost:1337/api/posts/${params.articleId}?populate=categories`
  );
  const article = await res.json();
  if (!article) {
    notFound();
  }
  const content = article.data.attributes.content;
  return (
    <>
      <header>
        <p>{article.attributes.title}</p>
      </header>
      <main>
        <p
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        ></p>
      </main>
    </>
  );
}
