import { nanoid } from "nanoid";
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
import Layout from "../../layout";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getComments, getIdeaById } from "../../libs/api/idea";
import { FormEvent, MouseEvent, useEffect, useState } from "react";
import { Idea } from "../../types/Idea";
import { formatRupiah } from "../../libs/helpers";
import { createComment } from "../../libs/api/comment";
import { useSession } from "next-auth/react";
import { makeDonation } from "../../libs/api/donation";
import Label from "../../components/form/label";
import Image from "next/image";
import { CustomNextPage } from "../../types/CustomNextPage";

interface Feedback {
  id: string;
  name: string;
  description: string;
  min_donation: number;
}

const Create: CustomNextPage = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const [feedbacks, setfeedbacks] = useState<Feedback[]>([]);

  const addFeedbackInput = (e: MouseEvent) => {
    e.preventDefault();
    setfeedbacks((s) => {
      return [
        ...s,
        {
          id: nanoid(8),
          name: `feedback ke-${s.length + 1}`,
          description: "deskripsi",
          min_donation: 0,
        },
      ];
    });
  };

  const removeFeedbackInput = (e: MouseEvent, id: string) => {
    e.preventDefault();
    setfeedbacks((s) => {
      return [...s.filter((v) => v.id !== id)];
    });
  };

  // const {
  //   data: idea,
  //   isError,
  //   isSuccess,
  // } = useQuery<any, unknown, Idea>("idea", () => getIdeaById(id));

  // const { data: comments } = useQuery<any, unknown, any>("comments", () =>
  //   getComments(id)
  // );

  // const postCommentToApi = useMutation(
  //   (body: object) =>
  //     createComment(body, {
  //       Authorization: `Bearer ${session?.access_token}`,
  //     }),
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries("comments");
  //     },
  //   }
  // );

  // const donateToApi = useMutation(
  //   (body: object) =>
  //     makeDonation(body, {
  //       Authorization: `Bearer ${session?.access_token}`,
  //     }),
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries("idea");
  //       alert("berhasil donasi");
  //     },
  //   }
  // );

  // const postComment = (comment: string) => {
  //   postCommentToApi.mutate({
  //     idea_id: id,
  //     comment,
  //   });
  // };

  // const donate = (e: FormEvent) => {
  //   e.preventDefault();

  //   donateToApi.mutate({
  //     idea_id: id,
  //     amount: (e.target as any).amount.value,
  //   });
  //   (e.target as any).amount.value = 0;
  // };

  return (
    <>
      <Head>
        <title>Bagikan Ide | Ideagram</title>
      </Head>

      <Layout withSidebar={false}>
        {/* {idea.images?.length ? (
          <Gallery images={idea.images} />
        ) : (
          "Tidak ada gambar"
        )} */}

        <form>
          <div className="flex  mt-5 ">
            <div className="w-9/12 mr-5">
              <div className="px-4 bg-white rounded-md p-2 mb-4 text-slate-800">
                <span className="text-3xl font-semibold mb-2 inline-block">
                  Bagikan Ide
                </span>

                <div>
                  <Label>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                    <input
                      name="idea_name"
                      type="text"
                      placeholder="Nama Ide"
                      className="w-full bg-transparent focus:outline-0 px-2 py-3"
                    />
                  </Label>

                  <div className="grid grid-cols-2 grid-rows-1 gap-x-6">
                    <Label>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <select className="w-full bg-transparent focus:outline-0 px-2 py-3">
                        <option value="">Kategori</option>
                      </select>
                    </Label>

                    <Label>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
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
                      <select className="w-full bg-transparent focus:outline-0 px-2 py-3">
                        <option value="">Lokasi</option>
                      </select>
                    </Label>
                  </div>

                  <Label>
                    <textarea
                      name="description"
                      placeholder="Deskripsi"
                      className="w-full bg-transparent focus:outline-0 px-2 py-3"
                    ></textarea>
                  </Label>

                  <div className="grid grid-cols-2 grid-rows-1 gap-x-6">
                    <Label>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <input
                        name="idea_max_date"
                        type="date"
                        placeholder="Nama Ide"
                        className="w-full bg-transparent focus:outline-0 px-2 py-3"
                      />
                    </Label>
                    <Label>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <input
                        name="idea_max_donation"
                        type="number"
                        placeholder="Target Donasi"
                        className="w-full bg-transparent focus:outline-0 px-2 py-3"
                      />
                    </Label>
                  </div>

                  <div
                    className="flex flex-col items-center px-2 pt-3 mb-3 rounded-md overflow-hidden border border-slate-300 
      focus-within:border-slate-500 text-slate-300 focus-within:text-slate-500 duration-200"
                  >
                    <div className="w-full overflow-x-auto">
                      <div className={`h-full w-max flex`}>
                        {[1, 2, 3, 4, 5, 6].map((img) => (
                          <div
                            className="rounded-md overflow-hidden w-96 h-96"
                            key={img}
                          >
                            <Image
                              draggable="false"
                              src="http://127.0.0.1:8000/file/serve/1640807533_vYet_ideag.png"
                              className="object-cover object-center"
                              layout="responsive"
                              width={50}
                              height={50}
                              alt="owl"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <input
                      multiple
                      name="idea_max_donation"
                      type="file"
                      placeholder="Target Donasi"
                      className="w-full bg-transparent focus:outline-0 px-2 py-3"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-4 ml-auto block py-3 bg-green-500 hover:bg-green-700 duration-300 rounded-md text-white"
                  >
                    Bagikan
                  </button>
                </div>
              </div>
            </div>

            <div className="w-3/12">
              <div className="px-4 bg-white rounded-md p-2 pb-4 mb-4">
                <h2 className="text-lg font-semibold mb-2 text-center">
                  Tonggak Pencapaian Donasi
                </h2>

                <div className="flex mb-5">
                  <button type="button" onClick={addFeedbackInput}>
                    Tambah
                  </button>
                </div>

                <div className="grid grid-cols-1 grid-flow-row gap-y-3">
                  {feedbacks.map((f, i) => {
                    return (
                      <div
                        key={f.name}
                        className="border border-slate-600 p-2 rounded-sm"
                      >
                        <label className="block mb-2">
                          <input
                            name="idea_max_donation"
                            type="text"
                            defaultValue={f.name}
                            placeholder="Nama"
                            className="w-full text-lg bg-transparent placeholder:text-center text-center focus:outline-0 px-2"
                          />
                        </label>

                        <label className="block">
                          <textarea
                            name="description"
                            placeholder="Deskripsi"
                            className="w-full text-sm bg-transparent focus:outline-0"
                            defaultValue={f.description}
                          ></textarea>
                        </label>

                        <label className="block">
                          <input
                            name="idea_max_donation"
                            type="number"
                            defaultValue={f.min_donation}
                            placeholder="Minimal Donasi"
                            className="w-full text-sm bg-transparent placeholder:text-center text-center focus:outline-0 px-2"
                          />
                        </label>

                        <button
                          className="text-xs block ml-auto mt-2 text-red-600"
                          type="button"
                          onClick={(e) => removeFeedbackInput(e, f.id)}
                        >
                          Hapus
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </form>
      </Layout>
    </>
  );
};

Create.auth = true;

export default Create;
