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
    all: "Alle",
    mon: "Mandag",
    tue: "Tirsdag",
    wed: "Onsdag",
    thu: "Torsdag",
    fri: "Fredag",
    sat: "Lørdag",
    sun: "Søndag",
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
      actsForDay = actsForDay.concat(
        scene[filterDay]?.map((act) => act.act) || []
      );
    });

    return lineUp.filter((band) => actsForDay.includes(band.name));
  };

  const filteredLineUp = filterBands();

  return (
    <>
      <section className="min-h-screen">
        <div className="px-2 sm:px-4">
          <h1 className={`${krona_one.className} large-size`}>Line-up</h1>
          <div className="flex justify-end gap-4 p-5 mb-4">
            {lineUpDays.map((day) => (
              <button
                key={day}
                onClick={() => setFilterDay(day)}
                className={`${
                  filterDay === day
                    ? "bg-secondaryColor text-bgColor border-bgColor"
                    : "bg-bgColor text-secondaryColor border-inputFieldColor"
                } rounded-lg border-2 transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-4 py-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accentColor`}
              >
                {days[day]}
              </button>
            ))}
          </div>
          <div
            className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 ${krona_one.className}`}
          >
            {filteredLineUp.map((band) => (
              <article
                key={band.name}
                value={band.bands}
                className="relative overflow-hidden flex flex-col h-48 md:h-72 w-full"
              >
                <Link
                  href={band.slug}
                  prefetch={false}
                  className="flex flex-col h-full"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={
                        band.logo.includes("https")
                          ? band.logo
                          : `/logos/${band.logo}`
                      }
                      fill
                      alt="Picture of Artist"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-end bg-black bg-opacity-50">
                      <p className="text-bgColor bg-primaryColor p-1 opacity-80 small-size">
                        {band.name}
                      </p>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
