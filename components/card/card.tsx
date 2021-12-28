import Image from "next/image";
import Link from "next/link";
import { formatRupiah } from "../../libs/helpers";
import { Idea } from "../../types/Idea";
import Progress from "../progress/progress";

interface Props {
  idea: Idea;
}

const Card = ({ idea }: Props) => {
  return (
    <>
      <div className="max-w-sm w-full flex flex-col shadow-md border border-gray-100 rounded-md p-2">
        <div className="rounded-md overflow-hidden">
          {idea.images?.length ? (
            <Image
              src={idea.images[0]?.url}
              className="object-cover object-center"
              layout="responsive"
              width={100}
              height={60}
              alt={idea.name}
            />
          ) : (
            <Image
              src={
                "https://live.staticflickr.com/1914/30477687977_a7e714e3fa.jpg"
              }
              className="object-cover object-center"
              layout="responsive"
              width={100}
              height={60}
              alt={idea.name}
            />
          )}
        </div>

        <div className="mt-2 flex-grow flex flex-col text-slate-800">
          <div className="mb-1">
            <Link href={`/detail/${idea.id}`} passHref>
              <a className="prose prose-xl font-semibold line-clamp-1 pointer hover:underline">
                {idea.name}
              </a>
            </Link>
            <p className="prose prose-sm line-clamp-4">{idea.description}</p>
          </div>

          <div className="mt-auto flex justify-between border-t pt-1">
            <div className="text-sm text-left h-min w-44">
              <span className="line-clamp-1">Oleh: {idea.owner?.name}</span>
            </div>
            <span className="text-right text-sm">
              Dibuat: {(idea.created_at + "").split("T")[0]}
            </span>
          </div>

          <div className="">
            <span className="text-sm">Target: </span>{" "}
            <span className="text-sm">
              {formatRupiah(idea.donation_target)}
            </span>
            {/* <Progress /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
