import type { NextPage } from "next";
import Head from "next/head";
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "next-share";
import { useRouter } from "next/router";
import Comment from "../../components/comment";
import Gallery from "../../components/gallery";
import Progress from "../../components/progress/progress";
import Layout from "../../layout";

const Detail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const images = [
    "https://live.staticflickr.com/4205/35047763926_6e8ca0e027_c.jpg",
    "https://live.staticflickr.com/1914/30477687977_a7e714e3fa.jpg",
    "https://live.staticflickr.com/5490/31029358451_375a214316_c.jpg",
    "https://live.staticflickr.com/65535/51716369167_66c9811ea3_c.jpg",
    "https://live.staticflickr.com/65535/51741827882_60ac4e5512_b.jpg",
  ];

  return (
    <>
      <Head>
        <title>Detail | Ideagram</title>
      </Head>

      <Layout withSidebar={false}>
        <Gallery images={images} />

        <div className="flex  mt-5 ">
          <div className="w-9/12 mr-5">
            <div className="px-4 bg-white rounded-md p-2 mb-4 text-slate-800">
              <span className="text-3xl font-semibold mb-2 inline-block">
                Ptilopsis
              </span>

              <div className="flex gap-x-4 mb-4">
                <div className="flex gap-x-1 text-center bg-teal-600 p-1.5 px-2 rounded-full text-white">
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
                  <span>Pelestarian Satwa</span>
                </div>
                <div className="flex gap-x-1 text-center bg-orange-500 p-1.5 px-2 rounded-full text-white">
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
                  <span>Yogyakarta</span>
                </div>
              </div>

              <div>
                <p className="">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
                  qui porro atque! Nemo tenetur quo iusto laboriosam
                  voluptatibus, excepturi a deleniti! Dicta quos doloribus
                  veritatis quo eum neque sapiente magni? Lorem ipsum dolor sit
                  amet consectetur adipisicing elit. Ipsa qui porro atque! Nemo
                  tenetur quo iusto laboriosam voluptatibus, excepturi a
                  deleniti! Dicta quos doloribus veritatis quo eum neque
                  sapiente magni? Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Ipsa qui porro atque! Nemo tenetur quo iusto
                  laboriosam voluptatibus, excepturi a deleniti! Dicta quos
                  doloribus veritatis quo eum neque sapiente magni? Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Ipsa qui porro
                  atque! Nemo tenetur quo iusto laboriosam voluptatibus,
                  excepturi a deleniti! Dicta quos doloribus veritatis quo eum
                  neque sapiente magni? Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Ipsa qui porro atque! Nemo tenetur quo iusto
                  laboriosam voluptatibus, excepturi a deleniti! Dicta quos
                  doloribus veritatis quo eum neque sapiente magni? Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Ipsa qui porro
                  atque! Nemo tenetur quo iusto laboriosam voluptatibus,
                  excepturi a deleniti! Dicta quos doloribus veritatis quo eum
                  neque sapiente magni? Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Ipsa qui porro atque! Nemo tenetur quo iusto
                  laboriosam voluptatibus, excepturi a deleniti! Dicta quos
                  doloribus veritatis quo eum neque sapiente magni? Lorem ipsum
                  dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
            <div className="px-4 bg-white rounded-md p-2 mb-4">
              <h2 className="text-lg font-semibold mb-2">komentar</h2>
              <Comment />
            </div>
          </div>

          <div className="w-3/12">
            <div className="px-4 bg-white rounded-md p-2 mb-4">
              <h2 className="text-lg font-semibold mb-2">Donasi</h2>

              <div className="mb-4">
                <span className="text-center block">Terkumpul: </span>
                <span className="block mx-auto text-center">
                  Rp. 2.000.000/Rp. 5.000.000
                </span>
                <Progress />
              </div>

              <span className="text-center block text-xl">Beri donasi: </span>
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
                  min={10000}
                  className="block border-l-2 border-slate-400 focus-within:border-slate-700 w-full p-2 focus:outline-0"
                  placeholder="Nominal Donasi"
                />
              </label>
              <button className="bg-green-500 hover:bg-green-600 duration-300 p-2 w-full text-white rounded-sm">
                Donasi
              </button>

              <div className="mt-5 flex items-center">
                <span>Bagikan ke</span>
                <div className="ml-auto flex gap-x-2">
                  <FacebookShareButton url={"http://localhost:3000"}>
                    <FacebookIcon size={24} round />
                  </FacebookShareButton>
                  <WhatsappShareButton url={"http://localhost:3000"}>
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
                <div className="border border-slate-600 p-2 rounded-sm">
                  <span className="text-lg font-semibold line-clamp-2 mb-2">
                    Rumah baru untuk ptilopsos
                  </span>

                  <p className="prose prose-sm mb-4">
                    Dengan bantuan kedermawanan anda, dan tercapainga donasi ini
                    kami akan membangun rumah baru untuk ptilopsis.
                  </p>

                  <span className="text-center block">Rp.1.000.000</span>
                </div>

                <div className="border border-slate-600 p-2 rounded-sm">
                  <span className="text-lg font-semibold line-clamp-2 mb-2">
                    Habitat baru untuk ptilopsis
                  </span>

                  <p className="prose prose-sm mb-4">
                    Dengan bantuan kedermawanan anda, dan tercapainga donasi ini
                    kami akan membangun rumah baru untuk ptilopsis.
                  </p>

                  <span className="text-center block">Rp.3.000.000</span>
                </div>
                <div className="border border-slate-600 p-2 rounded-sm">
                  <span className="text-lg font-semibold line-clamp-2 mb-2">
                    Pasangan untuk ptilopsos
                  </span>

                  <p className="prose prose-sm mb-4">
                    Dengan bantuan kedermawanan anda, dan tercapainga donasi ini
                    kami akan membangun rumah baru untuk ptilopsis.
                  </p>

                  <span className="text-center block">Rp.5.000.000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Detail;
