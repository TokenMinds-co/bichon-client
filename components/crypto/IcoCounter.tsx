"use client";

import React, { useEffect, useState } from "react";
import Loader from "../shared/Loader";
import { cn } from "@/lib/utils";

interface IcoCounterProps {
  until: string;
  className?: string;
}

const IcoCounter = ({ until, className }: IcoCounterProps) => {
  const calculateTimeLeft = () => {
    const untilDate = new Date(until);
    const now = new Date();
    const difference = untilDate.getTime() - now.getTime();

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        } else if (prevTime.minutes > 0) {
          return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 };
        } else if (prevTime.hours > 0) {
          return {
            ...prevTime,
            hours: prevTime.hours - 1,
            minutes: 59,
            seconds: 59,
          };
        } else if (prevTime.days > 0) {
          return {
            ...prevTime,
            days: prevTime.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        } else {
          clearInterval(timer);
          return prevTime;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isMounted]);
  return (
    <div className="bg-gradient-to-r border-blue-800 from-blue-500 to-blue-700 opacity-95 hover:opacity-100 rounded-md p-4">
      {!isMounted ? (
        <Loader size="20" color="#ffffff" />
      ) : (
        <div className={cn("grid grid-cols-4 gap-4", className)}>
          {Object.entries(timeLeft).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="text-3xl font-spaceMono font-semibold">
                {value.toString().padStart(2, "0")}
              </div>
              <div className="text-sm capitalize">{key}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IcoCounter;
