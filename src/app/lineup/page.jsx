"use client";
import { fetchAPI } from "../../app/api/api.js";
import { useState, useEffect } from "react";
import Image from "next/image.js";
import { krona_one } from "@/app/fonts";
import Link from "next/link.js";
import { Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

export default function Lineup() {
  const [lineUp, setLineUp] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [filterDay, setFilterDay] = useState("all");
  const [filterGenre, setFilterGenre] = useState("all");
  const [genres, setGenres] = useState([]);

  const lineUpDays = ["all", "mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const days = {
    all: "Alle dage",
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

        // Henter genre fra bands data
        const bandsGenres = ["all", ...new Set(bandsData.map((band) => band.genre))];
        setGenres(bandsGenres);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadLineup();
  }, []);

  const filterBands = () => {
    let filteredBands = lineUp;

    if (filterDay !== "all") {
      let actsForDay = [];
      // Henter alle acts, fra alle scener på den valgte dag
      Object.values(schedule).forEach((scene) => {
        actsForDay = actsForDay.concat(scene[filterDay]?.map((act) => act.act) || []);
      });

      filteredBands = filteredBands.filter((band) => actsForDay.includes(band.name));
    }

    if (filterGenre !== "all") {
      filteredBands = filteredBands.filter((band) => band.genre === filterGenre);
    }

    return filteredBands;
  };

  const filteredLineUp = filterBands();

  return (
    <>
      <section className="min-h-screen mb-32 md:px-2">
        <div className={`${krona_one.className} headliner text-center`}>
          <h1>Line-up</h1>
        </div>
        <header className="flex justify-between gap-4 py-5 px-2 sm:px-4">
          {/* Dropdown for genres */}
          <div className="w-1/2 lg:w-1/4">
            <div className="relative">
              <Select value={filterGenre} onChange={(e) => setFilterGenre(e.target.value)} className={clsx("mt-1 block w-full appearance-none border-none rounded-lg bg-inputFieldColor text-bgColor py-2 px-5", "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accentColor")} aria-label="Vælg genre">
                {genres.map((genre) =>
                  genre === "all" ? (
                    <option key={genre} value={genre}>
                      Alle genre
                    </option>
                  ) : (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  )
                )}
              </Select>
              <ChevronDownIcon className="pointer-events-none absolute top-2.5 right-2.5 size-5 fill-bgColor" aria-hidden="true" />
            </div>
          </div>

          {/* Dropdown for small screens */}
          <div className="w-1/2 lg:w-auto lg:hidden">
            <div className="relative">
              <Select value={filterDay} onChange={(e) => setFilterDay(e.target.value)} className={clsx("mt-1 block w-full appearance-none border-none rounded-lg bg-inputFieldColor text-bgColor py-2 px-5", "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accentColor")} aria-label="Vælg dag">
                {lineUpDays.map((day) => (
                  <option key={day} value={day}>
                    {days[day]}
                  </option>
                ))}
              </Select>
              <ChevronDownIcon className="pointer-events-none absolute top-2.5 right-2.5 size-5 fill-bgColor" aria-hidden="true" />
            </div>
          </div>

          {/* Buttons for larger screens */}
          <div className="hidden h-fit lg:flex flex-wrap gap-4">
            {lineUpDays.map((day) => (
              <button key={day} onClick={() => setFilterDay(day)} className={`${filterDay === day ? "bg-secondaryColor text-bgColor border-bgColor" : "bg-bgColor text-secondaryColor border-inputFieldColor"} rounded-lg border-2 transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-4 py-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accentColor`}>
                {days[day]}
              </button>
            ))}
          </div>
        </header>
        <div className={`grid grid-cols-2 px-6 py-5 sm:grid-cols-3 lg:grid-cols-4 gap-4 ${krona_one.className}`}>
          {filteredLineUp.map((band) => (
            <article key={band.name} tabIndex={0} className="relative overflow-hidden flex flex-col h-48 md:h-72 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accentColor">
              <Link href={band.slug} prefetch={false} className="flex flex-col h-full">
                <div className="relative w-full h-full">
                  <Image
                    src={band.logo.includes("https") ? band.logo : `/logos/${band.logo}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 
                             (max-width: 1200px) 50vw, 
                             25vw"
                    alt="Picture of Artist"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-end bg-black bg-opacity-50">
                    <p className="text-bgColor bg-primaryColor rounded-lg p-1 bg-opacity-80 small-size">{band.name}</p>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
