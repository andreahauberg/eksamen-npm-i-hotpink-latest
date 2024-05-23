"use client";
import { fetchAPI } from "../../app/api/api.js";
import { useState, useEffect } from "react";
import Image from "next/image.js";
import { krona_one } from "@/app/fonts";
import Link from "next/link.js";

export default function Schedule() {
  const [lineUp, setLineUp] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [filterScene, setFilterScene] = useState("all");

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
    let actsForScene = [];
    if (filterScene === "all") {
      Object.entries(schedule).forEach(([sceneName, sceneSchedule]) => {
        Object.entries(sceneSchedule).forEach(([day, acts]) => {
          actsForScene = actsForScene.concat(
            acts.map((act) => ({
              ...act,
              scene: sceneName,
              day,
            })) || []
          );
        });
      });
    } else {
      Object.entries(schedule[filterScene] || {}).forEach(([day, acts]) => {
        actsForScene = actsForScene.concat(
          acts.map((act) => ({
            ...act,
            scene: filterScene,
            day,
          })) || []
        );
      });
    }

    const bandsMap = lineUp.reduce((map, band) => {
      map[band.name] = band;
      return map;
    }, {});

    return actsForScene
      .map((act) => ({
        ...act,
        band: bandsMap[act.act],
      }))
      .filter((act) => act.act !== "break");
  };

  const bandSchedule = getBandSchedule();

  const getDateTime = (day, time) => {
    const today = new Date();
    const dayOffset = (["sun", "mon", "tue", "wed", "thu", "fri", "sat"].indexOf(day) + 7 - today.getDay()) % 7;
    const [hours, minutes] = time.split(":").map(Number);
    const eventDate = new Date(today);
    eventDate.setDate(today.getDate() + dayOffset);
    eventDate.setHours(hours);
    eventDate.setMinutes(minutes);
    eventDate.setSeconds(0);
    eventDate.setMilliseconds(0);
    return eventDate;
  };

  const sortedBandSchedule = bandSchedule
    .map((act) => ({
      ...act,
      startDateTime: getDateTime(act.day, act.start),
    }))
    .sort((a, b) => a.startDateTime - b.startDateTime)
    .filter((act) => act.startDateTime >= new Date());

  const groupedByTime = sortedBandSchedule.reduce((acc, act) => {
    const time = act.start;
    if (!acc[time]) {
      acc[time] = [];
    }
    acc[time].push(act);
    return acc;
  }, {});

  return (
    <>
      <div className="bg-gradient-to-b from-purple-600 via-pink-500 to-red-500 min-h-screen text-white">
        <div className={`${krona_one.className} headliner text-center py-5`}>
          <h1 className="text-4xl font-bold uppercase">Live koncerter</h1>
        </div>
        <header className="flex justify-center px-6 py-5 bg-gray-900 shadow-lg">
          <div className="flex items-center space-x-4">
            <label htmlFor="scene-filter" className="text-lg font-medium text-white">
              Vælg Scene
            </label>
            <select
              id="scene-filter"
              className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white text-black"
              value={filterScene}
              onChange={(e) => setFilterScene(e.target.value)}
            >
              <option value="all">Alle</option>
              {Object.keys(schedule).map((scene) => (
                <option key={scene} value={scene}>
                  {scene}
                </option>
              ))}
            </select>
          </div>
        </header>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-5">
          {Object.keys(groupedByTime).map((time) => (
            <div key={time} className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
              <div className="bg-yellow-400 py-2 px-3">
                <p className="text-xl font-bold text-black">{time}</p>
              </div>
              <ul className="divide-y divide-gray-700">
                {groupedByTime[time].map((act) => (
                  <li
                    key={`${act.act}-${act.scene}`}
                    className="flex items-center p-4 hover:bg-gray-800 transition-colors duration-300 ease-in-out"
                  >
                    <Link
                      href={act.band?.slug || "#"}
                      prefetch={false}
                      className="flex items-center space-x-4 w-full"
                    >
                      <div className="flex-shrink-0">
                        {act.band && (
                          <div className="relative h-24 w-24 md:w-32 md:h-32">
                            <Image
                              src={
                                act.band.logo.includes("https")
                                  ? act.band.logo
                                  : `/logos/${act.band.logo}`
                              }
                              fill
                              alt="Picture of Artist"
                              className="rounded-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-lg font-medium truncate">{act.act}</p>
                        <p className="text-sm text-gray-400">{act.scene}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400">{act.start}</p>
                      </div>
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
