import Image from "next/image";
import { MouseEvent, useState } from "react";
import { Image as ImageType } from "../../types/Image";

interface Props {
  images: ImageType[];
}

const Gallery = ({ images }: Props) => {
  const [previedImg, setPreviedImg] = useState(images[0].url);

  const onThumbnailClick = (e: MouseEvent, src: string) => {
    e.preventDefault();
    setPreviedImg(src);
  };

  return (
    <>
      <div className="h-96 rounded-md flex items-start justify-start">
        <div
          className={`rounded-md h-full ring-slate-200 ring-1 ${
            images.length > 3 ? "w-4/6" : "w-5/6"
          } overflow-hidden mr-3 bg-red-300`}
        >
          <Image
            src={previedImg}
            className="object-cover object-center"
            layout="responsive"
            width={100}
            height={60}
            alt="owl"
          />
        </div>

        <div
          className={`h-full grid ${
            images.length > 3 ? "grid-cols-2  w-2/6" : "grid-cols-1  w-1/6"
          } grid-flow-row gap-3`}
        >
          {images.map((img) => (
            <div
              className="rounded-md overflow-hidden relative"
              onClick={(e) => onThumbnailClick(e, img.url)}
              key={img.id}
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
              {img.url === previedImg && (
                <div className="absolute bg-gray-700 bg-opacity-50 top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                  <span className="text-white">preview</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Gallery;
