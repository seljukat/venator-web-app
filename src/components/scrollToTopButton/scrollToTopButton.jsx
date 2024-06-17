"use client";
import { useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { motion, useAnimationControls, useScroll } from "framer-motion";

const ScrollToTopButton = () => {
  const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js

  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const { scrollYProgress } = useScroll();
  const controls = useAnimationControls();
  const ScrollToTopContainerVariants = {
    show: {
      opacity: 1,
      y: 0,
    },
    hide: {
      opacity: 0,
      y: 100,
    },
  };

  useEffect(() => {
    return scrollYProgress.on("change", (latestValue) => {
      if (latestValue > 0.2) {
        controls.start("show");
      } else {
        controls.start("hide");
      }
    });
  });

  return (
    <motion.button
      className="fixed bottom-0 right-0 p-5 m-5 rounded-full bg-[#0d0c22] hover:bg-[#2d2b42] text-white"
      variants={ScrollToTopContainerVariants}
      initial="hide"
      animate={controls}
      onClick={scrollToTop}
    >
      <FaArrowUp />
    </motion.button>
  );
};

export default ScrollToTopButton;
