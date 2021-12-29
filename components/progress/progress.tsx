import { useEffect, useState } from "react";

interface Props {
  prgress: number;
}

const Progress = ({ prgress }: Props) => {
  const [progressClassName, setProgressClassName] = useState("w-0");

  useEffect(() => {
    if (prgress >= 100) {
      setProgressClassName("w-full");
    } else if (prgress > 80) {
      setProgressClassName("w-5/6");
    } else if (prgress > 60) {
      setProgressClassName("w-4/6");
    } else if (prgress > 50) {
      setProgressClassName("w-3/6");
    } else if (prgress > 30) {
      setProgressClassName("w-2/6");
    } else if (prgress > 10) {
      setProgressClassName("w-1/6");
    } else {
      setProgressClassName("w-1");
    }
  }, [prgress]);

  return (
    <>
      <div className="bg-gray-400 relative rounded-lg overflow-hidden h-1 w-full flex">
        <span className="absolute left-1/2 -translate-x-1/2 text-xs text-center">
          20%
        </span>
        <div className={`bg-green-400 ${progressClassName} h-full`}></div>
      </div>
    </>
  );
};

export default Progress;
