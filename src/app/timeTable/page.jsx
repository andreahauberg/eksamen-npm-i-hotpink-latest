"use client";
import { fetchAPI } from "../../app/api/api.js";
import { useState, useEffect } from "react";
import Image from "next/image.js";
import { krona_one } from "@/app/fonts";
import Link from "next/link.js";
import { Listbox } from "@headlessui/react";
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
              <label htmlFor="scene-select" className="sr-only">
                Vælg scene
              </label>
              <Listbox value={filterScene} onChange={setFilterScene}>
                <div className="relative mt-1">
                  <Listbox.Button
                    className={clsx(
                      "mt-1 block w-full appearance-none border-none rounded-lg bg-inputFieldColor text-bgColor py-2 px-5",
                      "focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                    )}
                  >
                    {filterScene === "all" ? "Alle scener" : filterScene}
                    <ChevronDownIcon
                      className="pointer-events-none absolute top-2.5 right-2.5 h-5 w-5 text-bgColor"
                      aria-hidden="true"
                    />
                  </Listbox.Button>
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg small-size border-none rounded-lg bg-inputFieldColor text-bgColor focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor">
                    <Listbox.Option key="all" value="all">
                      {({ selected }) => (
                        <div
                          className={`cursor-default select-none relative py-2 pl-10 pr-4 ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          Alle scener
                        </div>
                      )}
                    </Listbox.Option>
                    {Object.keys(schedule).map((scene) => (
                      <Listbox.Option
                        key={scene}
                        className={({ active }) =>
                          clsx(
                            active ? "bg-accentColor" : "",
                            "cursor-default select-none relative py-2 pl-10 pr-4"
                          )
                        }
                        value={scene}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={clsx(
                                selected ? "font-semibold" : "font-normal",
                                "block truncate"
                              )}
                            >
                              {scene}
                            </span>
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
            <div className="hidden lg:flex flex-wrap gap-4">
              <button
                onClick={() => setFilterScene("all")}
                className={`${
                  filterScene === "all"
                    ? "bg-secondaryColor text-bgColor border-bgColor"
                    : "bg-bgColor text-secondaryColor border-inputFieldColor"
                } rounded-lg border-2 transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-4 py-1 :ring-2 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor`}
                aria-pressed={filterScene === "all"}
              >
                Alle scener
              </button>
              {Object.keys(schedule).map((scene) => (
                <button
                  key={scene}
                  onClick={() => setFilterScene(scene)}
                  className={`${
                    filterScene === scene
                      ? "bg-secondaryColor text-bgColor border-bgColor"
                      : "bg-bgColor text-secondaryColor border-inputFieldColor"
                  } rounded-lg border-2 transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-4 py-1 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor`}
                  aria-pressed={filterScene === scene}
                >
                  {scene}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-center mb-4 gap-2 w-full lg:w-auto">
            <div className="relative w-full lg:hidden">
              <label htmlFor="day-select" className="sr-only">
                Vælg dag
              </label>
              <Listbox value={filterDay} onChange={setFilterDay}>
                <div className="relative mt-1">
                  <Listbox.Button
                    className={clsx(
                      "mt-1 block w-full appearance-none border-none rounded-lg bg-inputFieldColor text-bgColor py-2 px-5",
                      "focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                    )}
                  >
                    {days[filterDay]}
                    <ChevronDownIcon
                      className="pointer-events-none absolute top-2.5 right-2.5 h-5 w-5 text-bgColor"
                      aria-hidden="true"
                    />
                  </Listbox.Button>
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg  small-size border-none rounded-lg bg-inputFieldColor text-bgColor focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor z-10">
                    {lineUpDays.map((day) => (
                      <Listbox.Option
                        key={day}
                        className={({ active }) =>
                          clsx(
                            active ? "bg-accentColor" : "",
                            "cursor-default select-none relative py-2 pl-10 pr-4"
                          )
                        }
                        value={day}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={clsx(
                                selected ? "font-semibold" : "font-normal",
                                "block truncate"
                              )}
                            >
                              {days[day]}
                            </span>
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
            <div className="hidden lg:flex flex-wrap gap-4">
              {lineUpDays.map((day) => (
                <button
                  key={day}
                  onClick={() => setFilterDay(day)}
                  className={`${
                    filterDay === day
                      ? "bg-secondaryColor text-bgColor border-bgColor"
                      : "bg-bgColor text-secondaryColor border-inputFieldColor"
                  } rounded-lg border-2 transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-4 py-1 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor`}
                  aria-pressed={filterDay === day}
                >
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
                  <li
                    key={`${act.act}-${act.scene}`}
                    tabIndex={0}
                    className="flex justify-between overflow-hidden w-full h-24 md:h-40 border-b border-primaryTextColor last:border-b-0 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor hover:bg-secondaryBgColor hover:bg-opacity-30 group"
                  >
                    <Link
                      href={act.band?.slug || "#"}
                      prefetch={false}
                      className="w-full h-24 md:h-40 overflow-hidden flex items-center xsmall-size md:small-size pl-2 md:pl-0"
                      aria-label={`Link to ${act.act} details`}
                    >
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
                              src={
                                act.band.logo.includes("https")
                                  ? act.band.logo
                                  : `/logos/${act.band.logo}`
                              }
                              fill
                              loading="lazy"
                              sizes="(max-width: 768px) 100vw, 
                                     (max-width: 1200px) 50vw, 
                                     25vw"
                              alt={`Picture of ${act.act}`}
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
