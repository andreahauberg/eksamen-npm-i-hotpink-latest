import { fetchAPI } from "../../app/api/api.js";
import Image from "next/image.js";
import { krona_one } from "@/app/fonts";
import BandBio from "@/components/frondend/BandBio.jsx";
import { HeartIcon } from "@heroicons/react/24/outline";

export async function generateMetadata({ params }) {
  const { slug } = params;
  const fetchData = await fetchAPI("/bands");
  const filterData = fetchData.filter((band) => band.slug === slug);
  const band = filterData[0];
  // Husk at sætte en if statement på, så der er fejl hvis den ikke finder data...
  if (!band) {
    return { title: "Band Not Found" };
  }
  return {
    title: `FooFest - ${band.name}`,
  };
}

export async function generateStaticParams() {
  const data = await fetchAPI("/bands");
  return data.map((band) => ({
    slug: band.slug,
  }));
}

export default async function Band({ params }) {
  const { slug } = params;
  const fetchBandsData = await fetchAPI("/bands");
  const fetchScheduleData = await fetchAPI("/schedule");

  const filterBandsData = fetchBandsData.filter((band) => band.slug === slug);
  const band = filterBandsData[0];

  if (!band) {
    return <div>Band not found</div>;
  }

  let bandSchedule = [];

  Object.keys(fetchScheduleData).forEach((stage) => {
    Object.keys(fetchScheduleData[stage]).forEach((day) => {
      fetchScheduleData[stage][day].forEach((event) => {
        if (event.act === band.name) {
          bandSchedule.push({ ...event, stage, day });
        }
      });
    });
  });

  return (
    <>
      <section className="grid grid-cols-gridContent">
        <div className={`${krona_one.className} bandheader pb-6 md:pb-0 text-center col-start-2 col-end-5 pt-5`}>
          <h1>{band.name}</h1>
        </div>
        <div className="col-start-2 col-end-5">
          <div className="grid md:grid-cols-2">
            <div className="flex flex-col order-last	md:order-first md:p-5">
              <div className="flex gap-2 justify-center md:justify-start items-center py-5 md:pt-0 md:pb-11">
                <div className={`${krona_one.className} uppercase bg-primaryColor small-size text-center text-secondaryTextColor rounded-lg w-28 lg:w-32 lg:px-5 py-1`}>Genre:</div>
                <div></div>
                <p className={`${krona_one.className} small-size`}>{band.genre}</p>
              </div>

              <div className="pb-6">
                <BandBio bio={band.bio} />
              </div>
              <div className="py-5">
                <div className="rounded-lg overflow-hidden">
                  <iframe
                    title="playliste"
                    src="https://open.spotify.com/embed/artist/08GQAI4eElDnROBrJRGE0X?utm_source=generator"
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="w-full h-88" // Tailwind classes for width and height
                  ></iframe>
                </div>
              </div>
            </div>
            <div className="md:p-5">
              {bandSchedule.length > 0 &&
                bandSchedule.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center text-center pb-4 md:pb-2">
                    <div className="uppercase bg-labelColor text-secondaryTextColor rounded-lg w-40 md:w-36 lg:w-48 lg:px-5 py-3">
                      {schedule.day.charAt(0).toUpperCase() + schedule.day.slice(1)} {schedule.start}
                    </div>
                    <div className="uppercase bg-labelColor text-secondaryTextColor rounded-lg w-40 md:w-36  lg:w-48 lg:px-5 py-3">{schedule.stage}</div>
                  </div>
                ))}
              <figure className=" md:py-5">
                <Image src={band.logo.includes("https") ? band.logo : `/logos/${band.logo}`} width={400} height={400} alt="Picture of Artist" />
                <p className=" text-xs text-right px-2">{band.logoCredits}</p>
              </figure>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
