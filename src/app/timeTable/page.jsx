"use client";
import { fetchAPI } from "../../app/api/api.js";
import { useState, useEffect } from "react";
import Image from "next/image.js";
import { krona_one } from "@/app/fonts";
import Link from "next/link.js";

export default function Schedule() {
  const [lineUp, setLineUp] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [filterDay, setFilterDay] = useState("all");
  const [filterScene, setFilterScene] = useState("all");

  const lineUpDays = ["all", "mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const days = {
    all: "All",
    mon: "Monday",
    tue: "Tuesday",
    wed: "Wednesday",
    thu: "Thursday",
    fri: "Friday",
    sat: "Saturday",
    sun: "Sunday",
  };

  useEffect(() => {
    const loadSchedule = async () => {
      try {
        const bandsData = await fetchAPI("/bands");
        const scheduleData = await fetchAPI("/schedule");

        setLineUp(bandsData);
        setSchedule(scheduleData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadSchedule();
  }, []);

  const filterBands = () => {
    if (filterDay === "all") {
      return lineUp;
    }

    let actsForDay = [];
    // Henter alle acts, fra alle scener på den valgte dag
    if (filterScene === "all") {
      Object.values(schedule).forEach((scene) => {
        actsForDay = actsForDay.concat(scene[filterDay]?.map((act) => act.act) || []);
      });
    } else {
      actsForDay = schedule[filterScene]?.[filterDay]?.map((act) => act.act) || [];
    }

    return lineUp.filter((band) => actsForDay.includes(band.name));
  };

  const filteredLineUp = filterBands();

  return (
    <>
      <div className="">
        <header className="flex justify-between px-5 py-5">
          <div className="flex justify-center mb-4 gap-2">
            <button onClick={() => setFilterScene("all")} className={`${filterScene === "all" ? "bg-secondaryColor text-bgColor border-bgColor" : "bg-bgColor text-secondaryColor border-inputFieldColor"} rounded-lg border-2 transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-4 py-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accentColor`}>
              All Scenes
            </button>
            {Object.keys(schedule).map((scene) => (
              <button key={scene} onClick={() => setFilterScene(scene)} className={`${filterScene === scene ? "bg-secondaryColor text-bgColor border-bgColor" : "bg-bgColor text-secondaryColor border-inputFieldColor"} rounded-lg border-2 transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-4 py-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accentColor`}>
                {scene}
              </button>
            ))}
          </div>
          <div className="flex justify-center mb-4 gap-2">
            {lineUpDays.map((day) => (
              <button key={day} onClick={() => setFilterDay(day)} className={`${filterDay === day ? "bg-secondaryColor text-bgColor border-bgColor" : "bg-bgColor text-secondaryColor border-inputFieldColor"} rounded-lg border-2 transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-4 py-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accentColor`}>
                {days[day]}
              </button>
            ))}
          </div>
        </header>

        <section className="grid grid-cols-gridContent">
          <div className="col-start-2 col-end-5 w-full bg-secondaryBgColor py-3 px-3">
            <p>14:00</p>
          </div>
          <ul className="col-start-2 col-end-5 w-full">
            {filteredLineUp.map((band) => (
              <li key={band.name} className="flex justify-between overflow-hidden w-full h-40 border-b border-primaryTextColor last:border-b-0">
                <Link href={band.slug} prefetch={false} className="w-full h-40 overflow-hidden flex items-center">
                  <div className="flex-1">
                    <p>14:00</p>
                    <p>SCENE</p>
                  </div>
                  <div className={`${krona_one.className} flex-1`}>
                    <p>{band.name}</p>
                  </div>
                  <figure className="flex-1 h-full flex justify-end items-end">
                    <div className="relative w-full h-40 flex justify-center items-center">
                      <Image src={band.logo.includes("https") ? band.logo : `/logos/${band.logo}`} layout="fill" objectFit="contain" alt="Picture of Artist" className="w-full h-full" />
                    </div>
                  </figure>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
