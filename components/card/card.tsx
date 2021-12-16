import Image from "next/image";
import Link from "next/link";
import Progress from "../progress/progress";

const Card = () => {
  return (
    <>
      <div className="max-w-sm w-full flex flex-col shadow-md border border-gray-100 rounded-md p-2">
        <div className="rounded-md overflow-hidden">
          <Image
            src={
              "https://live.staticflickr.com/1914/30477687977_a7e714e3fa.jpg"
            }
            className="object-cover object-center"
            layout="responsive"
            width={100}
            height={60}
            alt="owl"
          />
        </div>

        <div className="mt-2 flex-grow flex flex-col text-slate-800">
          <div className="mb-1">
            <Link href="#" passHref>
              <a className="prose prose-xl font-semibold line-clamp-1 pointer hover:underline">
                White faced Scops owl: Autillo Cariblanco (Ptilopsis leucotis)
              </a>
            </Link>
            <p className="prose prose-sm line-clamp-4">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta
              pariatur libero eos vel? Incidunt itaque facere pariatur molestias
              aliquid aut ducimus sint, adipisci iste nihil cum ut. Nesciunt,
              aliquid aut ducimus sint, adipisci iste nihil cum ut. Nesciunt,
              laborum ex?
            </p>
          </div>

          <span className="ml-auto text-right text-sm">Dibuat: 20-9-2023</span>

          <div className="mt-auto">
            <span className="text-sm">Progress target pengalangan dana:</span>
            <Progress />
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
