"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SingleGameSlider from "../singleGameSlider/singleGameSlider";

const Slider = ({ game, beforeVideo, afterVideo }) => {
  const [count, setCount] = useState(0);

  return (
    <SingleGameSlider
      game={game}
      beforeVideo={"beforeVideo"}
      afterVideo={"afterVideo"}
      count={count}
      setCount={setCount}
    />
  );
};

export default Slider;
