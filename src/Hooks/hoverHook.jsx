import React, { useRef, useState, useEffect } from "react";

export default function Practice() {
  const [hover, isHover] = useHover();

  return (
    <>
      <div ref={hover}>{isHover ? "yes" : "NO"}</div>
      <div className=" flex flex-wrap relative flex-row w-[720px]">
        {" "}
        <video
          src={require("../../video/unit1/0.mp4")}
          className="w-[620px]"
        ></video>{" "}
        <div className="w-[100px]">nk,m,m,m</div>
        <button className="absolute bottom-[50%] left-[50%] bg-slate-400 rounded-full w-9 h-9">
          {" "}
        </button>
      </div>
    </>
  );
}
const useHover = () => {
  const [value, setValue] = useState(false);

  const ref = useRef(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener("mouseover", handleMouseOver);
      node.addEventListener("mouseout", handleMouseOut);
    }
  });

  return [ref, value];
};
