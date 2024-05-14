// pages/index.js
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchAPI } from "./api/api";
import moment from "moment";
import { krona_one } from "./fonts";
import Button from "@/components/globals/Button";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(moment("2024-06-01").diff(moment()));

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

  const formatTimeLeft = (duration) => {
    const days = Math.floor(moment.duration(duration).asDays());
    const hours = moment.duration(duration).hours();
    const minutes = moment.duration(duration).minutes();
    const seconds = moment.duration(duration).seconds();
    return `${days} DAGE TIL FESTIVAL ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="min-h-screen">
      <header
        className="relative text-center py-16 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/image1.png')" }}
      >
        <h1 className={`${krona_one.className} text-5xl`}>FOO FEST</h1>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/booking/">
            <Button title="KØB BILLET" />
          </Link>
          <Link href="/lineup/">
            <Button title="LINE-UP" />
          </Link>
        </div>
      </header>

      <div className="text-center pt-16 pb-8">
        <h2 className={`${krona_one.className} text-3xl`}>
          {formatTimeLeft(timeLeft)}
        </h2>
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
        <div className="relative w-72 h-72 ">
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
