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
      <section className="">
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
