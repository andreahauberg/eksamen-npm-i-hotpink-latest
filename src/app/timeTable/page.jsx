"use client";
import { fetchAPI } from "../../app/api/api.js";
import { useState, useEffect, act } from "react";
import Image from "next/image.js";
import { krona_one } from "@/app/fonts";
import Link from "next/link.js";

export default function Schedule() {
  const [lineUp, setLineUp] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [filterDay, setFilterDay] = useState("mon"); // Default til mandag
  const [filterScene, setFilterScene] = useState("all");

  const lineUpDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const days = {
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

  const getBandSchedule = () => {
    let actsForDay = [];
    // Henter alle acts, fra alle scener på den valgte dag
    if (filterScene === "all") {
      Object.entries(schedule).forEach(([sceneName, sceneSchedule]) => {
        actsForDay = actsForDay.concat(
          sceneSchedule[filterDay]?.map((act) => ({
            ...act,
            scene: sceneName,
          })) || []
        );
      });
    } else {
      actsForDay =
        schedule[filterScene]?.[filterDay]?.map((act) => ({
          ...act,
          scene: filterScene,
        })) || [];
    }

    const bandsMap = lineUp.reduce((map, band) => {
      map[band.name] = band;
      return map;
    }, {});

    return actsForDay
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
      <div className="">
        <div className={`${krona_one.className} large-size text-center`}>
          <h1>Tidsplan</h1>
        </div>
        <header className="flex justify-between px-6 py-5">
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

        <section className="grid md:grid-cols-gridContent md:px-5">
          {Object.keys(groupedByTime).map((time) => (
            <div key={time} className=" col-start-2 col-end-5">
              <div className="bg-secondaryBgColor py-3 px-3 small-size">
                <p>{time}</p>
              </div>
              <ul className="col-start-2 col-end-5 w-full">
                {groupedByTime[time].map((act) => (
                  <li key={`${act.act}-${act.scene}`} className="flex justify-between overflow-hidden w-full h-24 md:h-40 border-b border-primaryTextColor last:border-b-0">
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
                      <figure className="flex-1 h-24 md:h-40 flex justify-end items-end">
                        {act.band && (
                          <div className="relative h-24 w-24 md:w-44 md:h-40 flex justify-center items-center">
                            <Image src={act.band.logo.includes("https") ? act.band.logo : `/logos/${act.band.logo}`} fill alt="Picture of Artist" className=" h-full w-full object-cover" />
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
