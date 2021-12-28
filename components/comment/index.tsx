import Image from "next/image";
import Link from "next/link";
import React, { MouseEvent } from "react";
import { Comment } from "../../types/comment";

type Props = {
  comments: Comment[];
};

const Comment = ({ comments }: Props) => {
  const onCreateComment = (e: MouseEvent) => {
    e.preventDefault();
    alert("masih todo, udah ada sih endpoint nya, tapi . . . .");
  };

  const onCreateReply = (e: MouseEvent) => {
    e.preventDefault();
    alert("ERD nya ga ada reply comment hehe :v jadi ini masih hisan aja.");
  };
  return (
    <>
      <div className="flex flex-col">
        <div className="mb-3">
          <form className="flex flex-col">
            <textarea className="border rounded-md border-slate-800 w-full h-20 mb-2 p-2"></textarea>
            <button
              onClick={onCreateComment}
              className="ml-auto rounded-md bg-blue-400 p-2 px-6 text-white hover:bg-blue-500 duration-200"
              type="button"
            >
              Kirim
            </button>
          </form>
        </div>

        <h2 className="text-lg font-semibold mb-2">Komentar terbaru</h2>
        <div className="flex flex-col gap-y-3 pt-3 border-t-2 border-slate-400">
          {comments.map((c) => (
            <div key={c.id}>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden ring-1 object-cover object-center">
                  <Image
                    src="https://live.staticflickr.com/4205/35047763926_6e8ca0e027_q.jpg"
                    alt="profile"
                    width={150}
                    height={150}
                  />
                </div>
                <Link href="#" passHref>
                  <a>
                    <div className="flex flex-col ml-2">
                      <span className="text-sm leading-none line-clamp-1">
                        {c.user?.name}
                      </span>
                      <span className="text-xs">
                        {(c.created_at + "").split("T")[0]}
                      </span>
                    </div>
                  </a>
                </Link>
              </div>

              <div className="mt-4">
                <p className="text-sm">{c.comment}</p>
              </div>

              <nav className="flex justify-end gap-x-4">
                <button onClick={onCreateReply} className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <span>Lihat balasan</span>
                </button>
                <button onClick={onCreateReply} className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  <span>Balas komentar</span>
                </button>
              </nav>
            </div>
          ))}
        </div>

        <button className="text-sm mx-auto mt-8 text-center underline">
          Lihat komentar lainnya
        </button>
      </div>
    </>
  );
};

export default Comment;
