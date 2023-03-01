"use client";

import { useEffect, useState } from "react";

export default function CurrentTimeDifference({ time }: { time: number }) {
  const [diff, setDiff] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setDiff(new Date().getTime() - time);
    }, 50);
    return () => clearInterval(interval);
  }, [time]);
  return <span>
    The difference of the above cache time and the current time (updated at 50ms interval) is {diff} ms
  </span>;
}