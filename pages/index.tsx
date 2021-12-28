import type { NextPage } from "next";
import { useQuery } from "react-query";
import Head from "next/head";
import Card from "../components/card/card";
import Layout from "../layout";
import { getAllIdea } from "../libs/api/idea";
import { Idea } from "../types/Idea";

const Home: NextPage = () => {
  const ideas = useQuery("ideas", getAllIdea);
  console.log("file: index.tsx ~ line 11 ~ ideas", ideas);
  return (
    <>
      <Head>
        <title>Beranda | Ideagram</title>
      </Head>
      <Layout>
        <div className="h-96 rounded-md bg-zinc-50 banner flex items-center justify-center">
          <h1 className="text-white text-4xl font-semibold ml-96 pl-20 drop-shadow-lg">
            Hehe, Tubes dah mepet ya
          </h1>
        </div>

        <div className="px-4 rounded-md bg-white mt-5 p-2">
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            Cari Ide
          </h2>

          <form className="flex gap-x-3 items-center">
            <label className="flex-grow">
              <input
                type="text"
                placeholder="Judul Ide"
                className="border border-slate-800 w-full p-1 px-2 rounded-md"
              />
            </label>
            <label>
              <select className="border border-slate-800 w-full p-1 px-2 rounded-md">
                <option value="kategori">kategori</option>
                <option value="Makanan">Makanan</option>
              </select>
            </label>
            <button
              type="button"
              className="border border-slate-800 p-1 px-3 rounded-md"
            >
              Cari
            </button>
          </form>
        </div>

        <div className="px-4 rounded-md bg-white mt-5 p-2">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">
            Ide Terpopuler
          </h2>

          <div className="grid grid-cols-3 grid-flow-row gap-3">
            {ideas.isSuccess &&
              [ideas.data[0], ideas.data[1], ideas.data[2]].map(
                (idea: Idea) => {
                  return <Card idea={idea} key={idea.id} />;
                }
              )}
          </div>
        </div>

        <div className="px-4 rounded-md bg-white mt-5 p-2">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">
            Ide Terbaru
          </h2>

          <div className="grid grid-cols-3 grid-flow-row gap-3">
            {ideas.isSuccess &&
              ideas.data.map((idea: Idea) => {
                return <Card idea={idea} key={idea.id} />;
              })}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
