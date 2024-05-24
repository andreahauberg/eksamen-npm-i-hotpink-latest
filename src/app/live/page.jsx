"use client";
import { fetchAPI } from "../../app/api/api.js";
import { useState, useEffect } from "react";
import Image from "next/image.js";
import { krona_one } from "@/app/fonts";
import Link from "next/link.js";

export default function Schedule() {
  const [lineUp, setLineUp] = useState([]);
  const [schedule, setSchedule] = useState({});

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

    const bandsMap = lineUp.reduce((map, band) => {
      map[band.name] = band;
      return map;
    }, {});

    return actsForScene.map((act) => ({
      ...act,
      band: act.act !== "break" ? bandsMap[act.act] : null,
    }));
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
      endDateTime: getDateTime(act.day, act.end),
    }))
    .sort((a, b) => a.startDateTime - b.startDateTime);

  const now = new Date();

  const groupedByScene = Object.keys(schedule).reduce((acc, scene) => {
    const currentAct = sortedBandSchedule.find((act) => act.scene === scene && now >= act.startDateTime && now <= act.endDateTime);

    let nextAct = null;
    if (!currentAct) {
      nextAct = sortedBandSchedule.find((act) => act.scene === scene && now < act.startDateTime);
    }

    const currentOrNextAct = currentAct ? [currentAct] : nextAct ? [nextAct] : [];
    acc[scene] = currentOrNextAct;
    return acc;
  }, {});

  return (
    <>
      <div>
        <div className={`${krona_one.className} headliner text-center`}>
          <h1>Spiller nu</h1>
        </div>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-5">
          {Object.keys(groupedByScene).map((scene) => (
            <div key={scene} className="overflow-hidden bg-secondaryBgColor p-8 rounded-lg shadow-md shadow-primaryColor relative">
              <div className="large-size mb-1 text-primaryTextColor flex justify-between items-center">
                <h2 className="text-3xl p-4">{scene}</h2>
                {groupedByScene[scene].length > 0 && <span className="text-sm text-input-bg-color">{groupedByScene[scene][0].start}</span>}
              </div>
              {groupedByScene[scene].length > 0 ? (
                <ul className="divide-y divide-gray-700">
                  {groupedByScene[scene].map((act) => (
                    <li key={`${act.act}-${act.scene}`} className="flex items-center p-4">
                      {act.act && (
                        <Link href={act.band?.slug || "#"} prefetch={false} className="flex items-center space-x-4 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accentColor" tabIndex={0}>
                          <div className="flex-shrink-0">
                            {act.band && (
                              <div className="relative h-24 w-24 md:w-32 md:h-32">
                                <Image src={act.band.logo.includes("https") ? act.band.logo : `/logos/${act.band.logo}`} fill alt="Billede af band der spiller" className="rounded-full object-cover" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`${krona_one.className} text-lg`}>{act.act}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-input-bg-color">{act.start}</p>
                          </div>
                        </Link>
                      )}
                      {act.act === "break" && (
                        <div className="relative h-24 w-24 md:w-32 md:h-32 flex items-center justify-center">
                          <span className={`${krona_one.className} text-lg`}>Break</span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="p-4">På nuværende tidspunkt, er der ingen der spiller.</p>
              )}
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
