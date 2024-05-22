"use client";
import { fetchAPI } from "../../app/api/api.js";
import { useState, useEffect } from "react";
import Image from "next/image.js";
import { krona_one } from "@/app/fonts";
import Link from "next/link.js";

export default function Lineup() {
  const [lineUp, setLineUp] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [filterDay, setFilterDay] = useState("all");

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
    const loadLineup = async () => {
      try {
        const bandsData = await fetchAPI("/bands");
        const scheduleData = await fetchAPI("/schedule");

        setLineUp(bandsData);
        setSchedule(scheduleData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadLineup();
  }, []);

  const filterBands = () => {
    if (filterDay === "all") {
      return lineUp;
    }

    let actsForDay = [];
    // Henter alle acts, fra alle scener på den valgte dag
    Object.values(schedule).forEach((scene) => {
      actsForDay = actsForDay.concat(scene[filterDay]?.map((act) => act.act) || []);
    });

    return lineUp.filter((band) => actsForDay.includes(band.name));
  };

  const filteredLineUp = filterBands();

  return (
    <>
      <section className="">
        <div className="flex justify-end gap-4 p-5 mb-4">
          {lineUpDays.map((day) => (
            <button key={day} onClick={() => setFilterDay(day)} className={`${filterDay === day ? "bg-secondaryColor text-bgColor border-bgColor" : "bg-bgColor text-secondaryColor border-inputFieldColor"} rounded-lg border-2 transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-4 py-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accentColor`}>
              {days[day]}
            </button>
          ))}
        </div>
        <div className={`${krona_one.className} md:grid md:grid-cols-4`}>
          {filteredLineUp.map((band) => (
            <article key={band.name} value={band.bands} className="flex flex-col pb-8">
              <Link href={band.slug} prefetch={false} className="grid justify-center justify-items-between flex-grow">
                <div className="flex-shrink-0 h-72 w-72 relative overflow-hidden">
                  <Image src={band.logo.includes("https") ? band.logo : `/logos/${band.logo}`} width={400} height={400} alt="Picture of Artist" />
                </div>
                <div className="flex-shrink-0">
                  <h1>{band.name}</h1>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
