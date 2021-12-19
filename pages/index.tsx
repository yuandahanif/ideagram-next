import type { NextPage } from "next";
import Head from "next/head";
import Card from "../components/card/card";
import Layout from "../layout";

const Home: NextPage = () => {
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
            {[1, 2, 3].map((v) => {
              return <Card key={v} />;
            })}
          </div>
        </div>

        <div className="px-4 rounded-md bg-white mt-5 p-2">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">
            Ide Terbaru
          </h2>

          <div className="grid grid-cols-3 grid-flow-row gap-3">
            {[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 13, 14, 15, 16, 17, 18, 19, 20,
            ].map((v) => {
              return <Card key={v} />;
            })}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
