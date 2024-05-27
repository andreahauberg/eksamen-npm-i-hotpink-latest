"use client";
import { fetchAPI } from "../../app/api/api.js";
import { useState, useEffect } from "react";
import Image from "next/image.js";
import { krona_one } from "@/app/fonts";
import Link from "next/link.js";
import { Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

export default function Schedule() {
  const [lineUp, setLineUp] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [filterDay, setFilterDay] = useState("mon");
  const [filterScene, setFilterScene] = useState("all");

  const lineUpDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const days = {
    mon: "Mandag",
    tue: "Tirsdag",
    wed: "Onsdag",
    thu: "Torsdag",
    fri: "Fredag",
    sat: "Lørdag",
    sun: "Søndag",
  };

  useEffect(() => {
    const loadSchedule = async () => {
      const bandsData = await fetchAPI("/bands");
      const scheduleData = await fetchAPI("/schedule");

      setLineUp(bandsData);
      setSchedule(scheduleData);
    };
    loadSchedule();
  }, []);

  const getBandSchedule = () => {
    let actsDay = [];
    if (filterScene === "all") {
      Object.entries(schedule).forEach(([sceneName, sceneSchedule]) => {
        actsDay = actsDay.concat(
          sceneSchedule[filterDay]?.map((act) => ({
            ...act,
            scene: sceneName,
          })) || []
        );
      });
    } else {
      actsDay =
        schedule[filterScene]?.[filterDay]?.map((act) => ({
          ...act,
          scene: filterScene,
        })) || [];
    }

    const bandsMap = lineUp.reduce((map, band) => {
      map[band.name] = band;
      return map;
    }, {});

    return actsDay
      .map((act) => ({
        ...act,
        band: bandsMap[act.act],
      }))
      .filter((act) => act.act !== "break");
  };

  const bandSchedule = getBandSchedule();

  const groupedByTime = bandSchedule.reduce((acc, act) => {
    if (!acc[act.start]) {
      acc[act.start] = [];
    }
    acc[act.start].push(act);
    return acc;
  }, {});

  return (
    <>
      <div>
        <div className={`${krona_one.className} headliner text-center`}>
          <h1>Tidsplan</h1>
        </div>
        <header className="flex justify-between gap-3 px-6 py-5">
          <div className="flex justify-center mb-4 gap-2 w-full lg:w-auto">
            <div className="relative w-full lg:hidden">
              <Select value={filterScene} onChange={(e) => setFilterScene(e.target.value)} className={clsx("mt-1 block w-full appearance-none border-none rounded-lg bg-inputFieldColor text-bgColor py-2 px-5", "focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor")} aria-label="Vælg scene">
                <option value="all">All Scenes</option>
                {Object.keys(schedule).map((scene) => (
                  <option key={scene} value={scene}>
                    {scene}
                  </option>
                ))}
              </Select>
              <ChevronDownIcon className="pointer-events-none absolute top-2.5 right-2.5 h-5 w-5 text-bgColor" aria-hidden="true" />
            </div>
            <div className="hidden lg:flex flex-wrap gap-4">
              <button onClick={() => setFilterScene("all")} className={`${filterScene === "all" ? "bg-secondaryColor text-bgColor border-bgColor" : "bg-bgColor text-secondaryColor border-inputFieldColor"} rounded-lg border-2 transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-4 py-1 :ring-2 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor`}>
                All Scenes
              </button>
              {Object.keys(schedule).map((scene) => (
                <button key={scene} onClick={() => setFilterScene(scene)} className={`${filterScene === scene ? "bg-secondaryColor text-bgColor border-bgColor" : "bg-bgColor text-secondaryColor border-inputFieldColor"} rounded-lg border-2 transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-4 py-1 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor`}>
                  {scene}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-center mb-4 gap-2 w-full lg:w-auto">
            <div className="relative w-full lg:hidden">
              <Select value={filterDay} onChange={(e) => setFilterDay(e.target.value)} className={clsx("mt-1 block w-full appearance-none border-none rounded-lg bg-inputFieldColor text-bgColor py-2 px-5", "focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor")} aria-label="Vælg dag">
                {lineUpDays.map((day) => (
                  <option key={day} value={day}>
                    {days[day]}
                  </option>
                ))}
              </Select>
              <ChevronDownIcon className="pointer-events-none absolute top-2.5 right-2.5 h-5 w-5 text-bgColor" aria-hidden="true" />
            </div>
            <div className="hidden lg:flex flex-wrap gap-4">
              {lineUpDays.map((day) => (
                <button key={day} onClick={() => setFilterDay(day)} className={`${filterDay === day ? "bg-secondaryColor text-bgColor border-bgColor" : "bg-bgColor text-secondaryColor border-inputFieldColor"} rounded-lg border-2 transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-4 py-1 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor`}>
                  {days[day]}
                </button>
              ))}
            </div>
          </div>
        </header>

        <section className="md:grid md:grid-cols-gridContent px-6 py-5 md:px-5">
          {Object.keys(groupedByTime).map((time) => (
            <div key={time} className="col-start-2 col-end-5">
              <div className="bg-secondaryBgColor py-3 px-3 small-size">
                <p>{time}</p>
              </div>
              <ul className="col-start-2 col-end-5 w-full">
                {groupedByTime[time].map((act) => (
                  <li key={`${act.act}-${act.scene}`} tabIndex={0} className="flex justify-between overflow-hidden w-full h-24 md:h-40 border-b border-primaryTextColor last:border-b-0 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor hover:bg-secondaryBgColor hover:bg-opacity-30 group">
                    <Link href={act.band?.slug || "#"} prefetch={false} className="w-full h-24 md:h-40 overflow-hidden flex jus items-center xsmall-size md:small-size pl-2 md:pl-0">
                      <div className="flex flex-col md:flex-row md:gap-12 flex-1">
                        <div className="flex">
                          <p>
                            {time} - {act.scene}
                          </p>
                        </div>
                        <div className={`${krona_one.className} flex-1`}>
                          <p>{act.act}</p>
                        </div>
                      </div>
                      <figure className="flex-1 h-24 md:h-40 flex justify-end items-end overflow-hidden">
                        {act.band && (
                          <div className="relative h-24 w-24 md:w-44 md:h-40 flex justify-center items-center">
                            <Image
                              src={act.band.logo.includes("https") ? act.band.logo : `/logos/${act.band.logo}`}
                              fill
                              sizes="(max-width: 768px) 100vw, 
                                     (max-width: 1200px) 50vw, 
                                     25vw"
                              alt="Picture of Artist"
                              className="h-full w-full object-cover duration-300 transform group-hover:scale-110"
                            />
                          </div>
                        )}
                      </figure>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
