import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Head from "next/head";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "next-share";
import { useRouter } from "next/router";
import Comment from "../../components/comment";
import Gallery from "../../components/gallery";
import Progress from "../../components/progress/progress";
import Layout from "../../layout";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getComments, getIdeaById } from "../../libs/api/idea";
import { FormEvent, useEffect, useState } from "react";
import { Idea } from "../../types/Idea";
import { formatRupiah } from "../../libs/helpers";
import { createComment } from "../../libs/api/comment";
import { useSession } from "next-auth/react";
import { makeDonation } from "../../libs/api/donation";
import Link from "next/link";

const Detail = ({ id }: { id: any }) => {
  const { data: session } = useSession();
  console.log("file: [id].tsx ~ line 26 ~ Detail ~ session", session);
  const queryClient = useQueryClient();
  const {
    data: idea,
    isError,
    isSuccess,
  } = useQuery<any, unknown, Idea>("idea", () => getIdeaById(id));

  const { data: comments } = useQuery<any, unknown, any>("comments", () =>
    getComments(id)
  );

  const postCommentToApi = useMutation(
    (body: object) =>
      createComment(body, {
        Authorization: `Bearer ${session?.access_token}`,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("comments");
      },
    }
  );

  const donateToApi = useMutation(
    (body: object) =>
      makeDonation(body, {
        Authorization: `Bearer ${session?.access_token}`,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("idea");
        alert("berhasil donasi");
      },
    }
  );

  const postComment = (comment: string) => {
    postCommentToApi.mutate({
      idea_id: id,
      comment,
    });
  };

  const donate = (e: FormEvent) => {
    e.preventDefault();

    donateToApi.mutate({
      idea_id: id,
      amount: (e.target as any).amount.value,
    });
    (e.target as any).amount.value = 0;
  };

  if (isSuccess) {
    return (
      <>
        <Head>
          <title>Detail | Ideagram</title>
        </Head>

        <Layout withSidebar={false}>
          {idea?.images?.length ? (
            <Gallery images={idea.images} />
          ) : (
            "Tidak ada gambar"
          )}

          <div className="flex  mt-5 ">
            <div className="w-9/12 mr-5">
              <div className="px-4 bg-white rounded-md p-2 mb-4 text-slate-800">
                <span className="text-3xl font-semibold mb-2 inline-block">
                  {idea?.name}
                </span>
                {idea?.owner && (
                  <Link href={"/profile/" + idea?.owner?.id}>
                    <a className="line-clamp-1 text-sm mb-4 hover:underline">
                      Oleh: {idea?.owner?.name}
                    </a>
                  </Link>
                )}

                <div className="flex gap-x-4 mb-4">
                  <div className="flex gap-x-1 items-center text-center bg-teal-600 p-1.5 px-2  pr-3 rounded-full text-white">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm">{idea?.category?.name}</span>
                  </div>
                  <div className="flex gap-x-1 items-center text-center bg-orange-500 p-1.5 px-2 pr-3 rounded-full text-white">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-sm">{idea?.location?.name}</span>
                  </div>
                </div>

                <div>
                  <p className="break-words">{idea?.description}</p>
                </div>
              </div>
              <div className="px-4 bg-white rounded-md p-2 mb-4">
                <h2 className="text-lg font-semibold mb-2">komentar</h2>
                <Comment comments={comments} onComment={postComment} />
              </div>
            </div>

            <div className="w-3/12">
              <div className="px-4 bg-white rounded-md p-2 mb-4">
                <h2 className="text-lg font-semibold mb-2">Donasi</h2>

                <div className="mb-4">
                  <span className="text-center block">Terkumpul: </span>
                  <span className="block mx-auto text-center">
                    {formatRupiah(idea?.donation_total || 0)}/
                    {formatRupiah(idea?.donation_target || 0)}
                  </span>
                  <Progress
                    prgress={
                      (idea?.donation_total || 0 / idea?.donation_target || 0) *
                      100
                    }
                  />
                </div>

                <form onSubmit={donate}>
                  <span className="text-center block text-xl">
                    Beri donasi:{" "}
                  </span>
                  <label className="flex border-2 border-slate-400 focus-within:border-slate-700 mb-3 rounded-md overflow-hidden">
                    <svg
                      className="w-11 h-11 px-1 text-slate-800 bg-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <input
                      type="number"
                      name="amount"
                      min={
                        idea?.feedbacks?.length
                          ? idea.feedbacks[0]?.donation_min
                          : 10000
                      }
                      className="block border-l-2 border-slate-400 focus-within:border-slate-700 w-full p-2 focus:outline-0"
                      placeholder="Nominal Donasi"
                    />
                  </label>
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 duration-300 p-2 w-full text-white rounded-sm"
                  >
                    Donasi
                  </button>
                </form>

                <div className="mt-5 flex items-center">
                  <span>Bagikan ke</span>
                  <div className="ml-auto flex gap-x-2">
                    <FacebookShareButton url={window.location.href}>
                      <FacebookIcon size={24} round />
                    </FacebookShareButton>
                    <WhatsappShareButton url={window.location.href}>
                      <WhatsappIcon size={24} round />
                    </WhatsappShareButton>

                    <button>
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="px-4 bg-white rounded-md p-2 pb-4 mb-4">
                <h2 className="text-lg font-semibold mb-2 text-center">
                  Tonggak Pencapaian Donasi
                </h2>

                <div className="grid grid-cols-1 grid-flow-row gap-y-3">
                  {idea?.feedbacks?.map((f) => {
                    return (
                      <div
                        className="border border-slate-600 p-2 rounded-sm"
                        key={f.id}
                      >
                        <span className="text-lg font-semibold line-clamp-2 mb-2">
                          {f.name}
                        </span>

                        <p className="prose prose-sm mb-4">{f.description}</p>

                        <span className="text-center block">
                          Rp. {f.donation_min}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Head>
          <title>Detail | Ideagram</title>
        </Head>

        <Layout withSidebar={false}>
          <h1>Id tidak ditemukan</h1>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Detail | Ideagram</title>
      </Head>

      <Layout withSidebar={false}>
        <h1>Tunggu</h1>
      </Layout>
    </>
  );
};

export default Detail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      id: context.params?.id,
    }, // will be passed to the page component as props
  };
};
