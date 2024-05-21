"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchAPI } from "./api/api";
import moment from "moment";
import { krona_one } from "./fonts";
import Button from "@/components/globals/Button";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(moment("2024-07-01").diff(moment()));
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const getBands = async () => {
      try {
        const bands = await fetchAPI("/bands");
        console.log("Fetched bands:", bands);
      } catch (error) {
        console.error("Failed to fetch bands:", error);
      }
    };

    getBands();

    const interval = setInterval(() => {
      setTimeLeft(moment("2024-07-01").diff(moment()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const formatTimeLeft = (duration) => {
    const days = Math.floor(moment.duration(duration).asDays());
    const hours = moment.duration(duration).hours();
    const minutes = moment.duration(duration).minutes();
    const seconds = moment.duration(duration).seconds();
    return { days, hours, minutes, seconds };
  };

  const time = formatTimeLeft(timeLeft);

  return (
    <div className="min-h-screen">
      <header
        className="relative text-center py-16 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/image1.png')" }}
      >
        <svg
          className="h-16"
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="74"
          viewBox="0 0 200 74"
          fill="none"
        >
          {/* SVG content here */}
        </svg>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/booking/">
            <Button title="Køb billetter" />
          </Link>
          <Link href="/lineup/">
            <Button title="Line-up" />
          </Link>
        </div>
      </header>

      <div className="text-center pt-16 pb-8">
        {isMounted && (
          <div
            className={`${krona_one.className} text-3xl flex justify-center text-white space-x-4`}
          >
            <div className="flex flex-col items-center">
              <span className="text-4xl ">
                {String(time.days).padStart(2, "0")}
              </span>
              <span className="text-sm">DAYS</span>
            </div>
            <span className="text-4xl ">:</span>
            <div className="flex flex-col items-center">
              <span className="text-4xl ">
                {String(time.hours).padStart(2, "0")}
              </span>
              <span className="text-sm">HOURS</span>
            </div>
            <span className="text-4xl ">:</span>
            <div className="flex flex-col items-center">
              <span className="text-4xl ">
                {String(time.minutes).padStart(2, "0")}
              </span>
              <span className="text-sm">MINUTES</span>
            </div>
            <span className="text-4xl ">:</span>
            <div className="flex flex-col items-center">
              <span className="text-4xl ">
                {String(time.seconds).padStart(2, "0")}
              </span>
              <span className="text-sm">SECONDS</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center md:space-x-8 py-8 space-y-8 md:space-y-0">
        <div className="relative w-72 h-72">
          <img
            src="/images/image2.png"
            alt="Bands 1"
            className="w-full h-full object-cover"
          />
          <Link
            href="/lineup/"
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
          >
            <Button title="Line-up" />
          </Link>
        </div>
        <div className="relative w-72 h-72">
          <img
            src="/images/image3.png"
            alt="Bands 2"
            className="w-full h-full object-cover"
          />
          <Link
            href="/booking/"
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
          >
            <Button title="Billetter" />
          </Link>
        </div>
        <div className="relative w-72 h-72">
          <img
            src="/images/image4.png"
            alt="Bands 3"
            className="w-full h-full object-cover"
          />
          <Link
            href="/timeTable/"
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
          >
            <Button title="Tidsplan" />
          </Link>
        </div>
      </div>
    </div>
  );
}
