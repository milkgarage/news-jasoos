import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { NextSeo } from "next-seo";
import SideNavbar from "../../components/SideNavbar";
import Image from "next/image";
import Home from "..";
import moment from "moment";
import { Button, Tag } from "antd";
import Head from "next/head";
import Link from "next/link";
const qdata = gql`
  query article($id: ID!) {
    article(query: { id: $id }) {
      data {
        id
        title
        featureImage
        shortArticle
        longArticle
        secondaryImage
        createdAt
      }
    }
  }
`;
const Post = () => {
  const router = useRouter();
  let { pid } = router.query;
  if (pid) {
    pid = pid?.split("---")[1];
  }

  const { data } = useQuery(qdata, {
    variables: {
      id: pid,
    },
  });
  let detail = data?.article.data[0];
  return (
    <>
      <NextSeo
        title={detail?.title}
        description={detail?.shortArticle}
        openGraph={{
          url: `https://newsjasoos.in/read/${pid}`,
          title: detail?.title,
          description: detail?.shortArticle,
          images: [
            {
              url: detail?.featureImage,
              alt: detail?.title,
            },
          ],
          siteName: `News Jasoos - ${e?.title}`,
        }}
      />
      {/* <Head>
        <title>News Jasoos - {detail?.title}</title>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1621029292135466"
          crossOrigin="anonymous"
        ></script>
        <link rel="manifest" href="/manifest.json" />
        <meta name="description" content={detail?.title} />
        <meta property="og:image" content={detail?.featureImage} />
        {detail?.id && (
          <meta
            property="og:url"
            content={"https://newsjasoos.in/" + detail?.id}
          />
        )}
        <meta property="og:title" content={detail?.title?.substring(0, 35)} />
        <meta property="og:description" content={detail?.title} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="hi" />
      </Head> */}

      <div className="bg-white dark:bg-slate-800 flex flex-col">
        <div className="flex  sticky top-0 z-50">
          <div className="basis-1/2 p-5">
            <Link href={"/"} des passHref>
              <Button
                style={{ borderRadius: 10 }}
                type="primary"
                title="Back"
                href="/"
              >
                Back
              </Button>
            </Link>
          </div>
          <div>
            <SideNavbar />
          </div>
        </div>
        <div className="place-items-center">
          <div className="content-center text-black dark:text-slate-100">
            <h1 className="text-black dark:text-slate-100">{detail?.title}</h1>
          </div>

          <div>
            {data?.article.data[0]?.featureImage && (
              <Image
                className="rounded-t-lg"
                style={{ height: 200, width: "100%" }}
                height={80}
                width={"100%"}
                layout="responsive"
                src={data?.article.data[0]?.featureImage}
                alt={detail?.title}
              />
            )}
          </div>
          <div>
            <div>
              <div className="flex p-2">
                <Tag color="gold">अवनीश चौधरी</Tag>
                <Tag color="black">
                  {moment(
                    new Date(parseInt(detail?.createdAt)).toString()
                  ).format("DD/MM/YY hh:mm A")}
                </Tag>
              </div>
            </div>
            <div
              className="desktop:m-100 laptop:m-100 article-text text-black dark:text-slate-100"
              dangerouslySetInnerHTML={{ __html: detail?.longArticle }}
            />
          </div>
          <div>
            {data?.article.data[0]?.secondaryImage && (
              <Image
                className="rounded-t-lg"
                style={{ height: 200, width: "100%" }}
                height={80}
                width={"100%"}
                layout="responsive"
                priority
                src={data?.article.data[0]?.secondaryImage}
                alt={detail?.title}
              />
            )}
          </div>
        </div>
      </div>
      <div className="p-10 text-center bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-100">
        <p className="bigger-text">और पड़े</p>
      </div>
      <Home />
    </>
  );
};

export default Post;
