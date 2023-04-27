import React, { useState } from "react";
import NavComponents from "../../components/NavComponents";
import Footer from "../../components/Footer";
import Box from "./components/Box";
import { v4 as uuidv4 } from "uuid";
import UnitSelect from "./components/UnitSelect";

const Main = () => {
  const wbesiteContent = ["學習區", "練習區", "測驗區"];
  const [showLearningUnit, setShowLearningUnit] = useState(false);
  const [showPractice, setShowPractice] = useState(false);

  return (
    <>
      <div>
        <NavComponents needIcon={false} />
        <main className="min-h-[85vh] flex flex-col items-center justify-around text-[5rem]">
          <div className="text-[2rem] bg-slate-500 p-[2rem] ">
            sign website Icon
          </div>
          <div className="flex text-[2rem] flex-wrap justify-center">
            {wbesiteContent.map((theme) => (
              <Box
                key={uuidv4()}
                content={theme}
                setShowLearningUnit={setShowLearningUnit}
                setShowPractice={setShowPractice}
              />
            ))}
          </div>{" "}
        </main>
        <Footer />
        {showLearningUnit && (
          <UnitSelect setShowLearningUnit={setShowLearningUnit} />
        )}
      </div>{" "}
    </>
  );
};

export default Main;
