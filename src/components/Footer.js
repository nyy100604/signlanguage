import React, { useRef, useEffect, useState } from "react";

const Footer = () => {
  const footerRef = useRef(null);

  const [pageYnum, setPageYnum] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", (handleScroll) => {
      let a = window.pageYOffset;
      setPageYnum(a);
      // console.log(pageYnum);
    });
  }, [pageYnum]);

  return (
    <footer
      className={`${
        // pageYnum !== 0
        // ? " hidden"
        // :
        " w-[100%] h-[3rem] flex text-white justify-center items-center"
      }`}
      style={{ backgroundColor: "#000000", opacity: "70%" }}
      ref={footerRef}
    >
      © 2023-2024 ETLAB.
    </footer>
  );
};

export default Footer;
