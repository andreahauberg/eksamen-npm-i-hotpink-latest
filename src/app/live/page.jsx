"use client";
import { useState, useEffect } from 'react';
import { fetchAPI } from "../../app/api/api.js";

const LiveComponent = () => {
  const [bands, setBands] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [currentEvent, setCurrentEvent] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const bandsData = await fetchAPI("/bands");
      const scheduleData = await fetchAPI("/schedule");

      setBands(bandsData);
      setSchedule(scheduleData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const parseEventTime = (day, time) => {
      try {
        const [year, month, date] = day.split('-').map(Number);
        const [hour, minute] = time.split(':').map(Number);

        if (
          !Number.isNaN(year) &&
          !Number.isNaN(month) &&
          !Number.isNaN(date) &&
          !Number.isNaN(hour) &&
          !Number.isNaN(minute)
        ) {
          return new Date(year, month - 1, date, hour, minute);
        } else {
          throw new Error('Invalid date/time components');
        }
      } catch (error) {
        console.error(`Error parsing time: ${time} on day: ${day}`, error);
        return null;
      }
    };

    const getCurrentAndUpcomingEvents = () => {
      const now = new Date();
      const upcoming = [];

      for (const stage in schedule) {
        for (const day in schedule[stage]) {
          schedule[stage][day].forEach((event) => {
            const eventStart = parseEventTime(day, event.start);
            const eventEnd = parseEventTime(day, event.end);

            if (!eventStart || !eventEnd) {
              console.error(`Invalid date for event: ${event.act} at ${stage} on ${day}`);
              return;
            }

            console.log(`Checking event: ${event.act} at ${stage} on ${day} from ${event.start} to ${event.end}`);
            console.log(`Parsed times - Start: ${eventStart}, End: ${eventEnd}, Now: ${now}`);

            if (now >= eventStart && now <= eventEnd) {
              console.log(`Current event found: ${event.act}`);
              const band = bands.find(band => band.name === event.act);
              setCurrentEvent({ ...event, stage, bandName: band?.name });
            } else if (now < eventStart) {
              const band = bands.find(band => band.name === event.act);
              upcoming.push({ ...event, stage, bandName: band?.name, startTime: eventStart });
            }
          });
        }
      }

      upcoming.sort((a, b) => a.startTime - b.startTime);
      setUpcomingEvents(upcoming);
    };

    const interval = setInterval(getCurrentAndUpcomingEvents, 60000);
    getCurrentAndUpcomingEvents();

    return () => clearInterval(interval);
  }, [schedule, bands]);

  return (
    <div className="container mx-auto p-4">
      {currentEvent ? (
        <div className="bg-green-100 p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-2xl font-bold mb-2">Currently Playing</h2>
          <p><span className="font-semibold">Band:</span> {currentEvent.bandName}</p>
          <p><span className="font-semibold">Stage:</span> {currentEvent.stage}</p>
          <p><span className="font-semibold">Start Time:</span> {currentEvent.start}</p>
          <p><span className="font-semibold">End Time:</span> {currentEvent.end}</p>
        </div>
      ) : (
        <div className="bg-red-100 p-4 rounded-lg shadow-md mb-4">
          <p className="text-2xl font-bold mb-2">No bands are currently playing.</p>
          {upcomingEvents.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-2">Upcoming Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                    <p><span className="font-semibold">Band:</span> {event.bandName}</p>
                    <p><span className="font-semibold">Stage:</span> {event.stage}</p>
                    <p><span className="font-semibold">Start Time:</span> {event.start}</p>
                    <p><span className="font-semibold">End Time:</span> {event.end}</p>
                    <p><span className="font-semibold">Date:</span> {event.startTime.toLocaleDateString()}</p>
                    <p><span className="font-semibold">Time:</span> {event.startTime.toLocaleTimeString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LiveComponent;
