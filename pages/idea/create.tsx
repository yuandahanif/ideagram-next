import { nanoid } from "nanoid";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../layout";
import { useMutation, useQuery } from "react-query";
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Label from "../../components/form/label";
import Image from "next/image";
import { CustomNextPage } from "../../types/CustomNextPage";
import { Location } from "../../types/location";
import { getAllLocation } from "../../libs/api/location";
import { getAllCategory } from "../../libs/api/category";
import { Category } from "../../types/category";
import { createIdea } from "../../libs/api/idea";
import { Idea } from "../../types/Idea";
import { createFeedback } from "../../libs/api/feedback";

interface Feedback {
  id: string;
  name: string;
  description: string;
  min_donation: number;
  [key: string]: any;
}

const Create: CustomNextPage = () => {
  const route = useRouter();
  const { data: session } = useSession();

  const [feedbacks, setfeedbacks] = useState<Feedback[]>([]);
  const [images, setImages] = useState<{ file: any; url: string }[]>([]);

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

  const editFeedback = (id: string, field: string, value: any) => {
    setfeedbacks((feedbacks) => {
      return [
        ...feedbacks.map((feedback) => {
          if (
            feedback.id === id &&
            Object.prototype.hasOwnProperty.call(feedback, field)
          ) {
            feedback[field] = value;
          }
          return feedback;
        }),
      ];
    });
  };

  const displayImagePreview = (e: ChangeEvent<HTMLInputElement>) => {
    setImages((s) => {
      const files = e.target.files;
      const url = [];
      if (files!.length > 0) {
        for (let i = 0; i < files!.length; i++) {
          url.push({ url: URL.createObjectURL(files![i]), file: files![i] });
        }
      }
      return url;
    });
  };

  const locationQuery = useQuery<any, unknown, Location[]>("location", () =>
    getAllLocation()
  );

  const categoryQuery = useQuery<any, unknown, Category[]>("category", () =>
    getAllCategory()
  );

  const postFeedbackIdeaToApi = useMutation((body: object) =>
    createFeedback(body, {
      Authorization: `Bearer ${session?.access_token}`,
    })
  );

  const postImageIdeaToApi = useMutation(
    async (id: number) => {
      const formData = new FormData();

      images.forEach((f) => {
        formData.append("photos[]", f.file);
      });

      const response = await fetch(
        (process.env.NEXT_PUBLIC_API_ENDPOINT as string) + `ideas/${id}/image`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const { idea } = await response.json();
      return idea;
    },
    {
      onSuccess: (idea: Idea) => {
        route.replace("/idea/" + idea.id);
      },
    }
  );

  const postIdeaToApi = useMutation(
    (body: object) =>
      createIdea(body, {
        Authorization: `Bearer ${session?.access_token}`,
      }),
    {
      onSuccess: (data: Idea) => {
        feedbacks.forEach((f) => {
          postFeedbackIdeaToApi.mutate({
            name: f.name,
            description: f.description,
            idea_id: data.id,
            donation_min: f.min_donation,
          });
        });
        postImageIdeaToApi.mutate(data.id);
      },
    }
  );

  const formSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as any;

    const dataToPost = {
      name: form.idea_name.value,
      description: form.idea_description.value,
      category_id: form.idea_category.value,
      location_id: form.idea_location.value,
      due_date: form.idea_due_date.value,
      donation_target: form.idea_donation_target.value,
      user_id: (session?.user as any).id,
    };

    postIdeaToApi.mutate(dataToPost);
  };

  return (
    <>
      <Head>
        <title>Bagikan Ide | Ideagram</title>
      </Head>

      <Layout withSidebar={false}>
        <form onSubmit={formSubmit}>
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
                      <select
                        className="w-full bg-transparent focus:outline-0 px-2 py-3"
                        name="idea_category"
                      >
                        <option value="">Kategori</option>
                        {categoryQuery.isSuccess &&
                          categoryQuery.data?.map((c: Category) => {
                            return (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            );
                          })}
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
                      <select
                        className="w-full bg-transparent focus:outline-0 px-2 py-3"
                        name="idea_location"
                      >
                        <option value="">Lokasi</option>
                        {locationQuery.isSuccess &&
                          locationQuery.data?.map((l: Location) => {
                            return (
                              <option key={l.id} value={l.id}>
                                {l.name}
                              </option>
                            );
                          })}
                      </select>
                    </Label>
                  </div>

                  <Label>
                    <textarea
                      name="idea_description"
                      placeholder="Deskripsi"
                      className="w-full h-40 bg-transparent focus:outline-0 px-2 py-3"
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
                        name="idea_due_date"
                        type="date"
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
                        name="idea_donation_target"
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
                    <div className="w-full  overflow-x-auto">
                      <div
                        className={`h-full w-max overflow-y-hidden flex gap-x-4`}
                      >
                        {images.map((img) => (
                          <div
                            className="rounded-md overflow-hidden w-96 h-96"
                            key={img.url}
                          >
                            <Image
                              draggable="false"
                              src={img.url}
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
                      name="idea_images"
                      onChange={displayImagePreview}
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
                            onBlur={(e) => {
                              e.preventDefault();
                              editFeedback(f.id, "name", e.target.value);
                            }}
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
                            onBlur={(e) => {
                              e.preventDefault();
                              editFeedback(f.id, "description", e.target.value);
                            }}
                          ></textarea>
                        </label>

                        <label className="block">
                          <input
                            name="min_donation"
                            type="number"
                            defaultValue={f.min_donation}
                            onBlur={(e) => {
                              e.preventDefault();
                              editFeedback(
                                f.id,
                                "min_donation",
                                e.target.value
                              );
                            }}
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
