import { useEffect, useState } from "react";

const Progress = () => {
  const [progressClassName, setProgressClassName] = useState("w-0");

  useEffect(() => {
    const r = Math.random();
    if (r > 0.8) {
      setProgressClassName("w-5/6");
    } else if (r > 0.6) {
      setProgressClassName("w-4/6");
    } else if (r > 0.5) {
      setProgressClassName("w-3/6");
    } else if (r > 0.3) {
      setProgressClassName("w-2/6");
    } else if (r > 0.1) {
      setProgressClassName("w-1/6");
    } else {
      setProgressClassName("w-1");
    }
  }, []);

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
