"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const RefreshComponent = ({ game }) => {
  const router = useRouter();
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    if (!game?.isAnalyzed) {
      const interval = setInterval(() => {
        setRefreshCount((prevCount) => prevCount + 1);
        router.refresh();
      }, 30000);

      return () => clearInterval(interval);
    } else {
      setTimeout(() => {
        router.refresh();
      }, 100);
    }
  }, [router]);

  return (
    <div className="fixed bottom-[2px] right-[2px] text-[8px] text-[#808080]">
      <p>{refreshCount}</p>
    </div>
  );
};

export default RefreshComponent;