import React from "react";
import Countdown from "react-countdown";
import { krona_one } from "@/app/fonts";

// CountdownTimer tager en targetDate som prop
const CountdownTimer = ({ targetDate }) => (
  <Countdown date={targetDate} renderer={renderer} />
);

const renderer = ({ days, hours, minutes, seconds }) => {
  return (
    <div
      className={`${krona_one.className} text-3xl flex justify-center text-white space-x-1 md:space-x-3`}
    >
      <div className="flex flex-col items-center">
        <span className="text-4xl md:text-6xl ">{days}</span>
        <span className="text-sm md:text-2xl">DAGE</span>
      </div>
      <span className="text-4xl md:text-6xl">:</span>
      <div className="flex flex-col items-center">
        <span className="text-4xl md:text-6xl">{hours}</span>
        <span className="text-sm md:text-2xl">TIMER</span>
      </div>
      <span className="text-4xl md:text-6xl ">:</span>
      <div className="flex flex-col items-center">
        <span className="text-4xl md:text-6xl ">{minutes}</span>
        <span className="text-sm md:text-2xl">MINUTTER</span>
      </div>
      <span className="text-4xl md:text-6xl ">:</span>
      <div className="flex flex-col items-center">
        <span className="text-4xl md:text-6xl ">{seconds}</span>
        <span className="text-sm md:text-2xl">SEKUNDER</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
