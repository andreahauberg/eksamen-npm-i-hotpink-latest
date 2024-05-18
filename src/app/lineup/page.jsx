"use client";
import { fetchAPI } from "../../app/api/api.js";
import { useState, useEffect } from "react";
import Image from "next/image.js";
import { krona_one } from "@/app/fonts";
import Link from "next/link.js";

export default function Lineup() {
  const [lineUp, setLineUp] = useState([]);

  useEffect(() => {
    const loadLineup = async () => {
      try {
        const data = await fetchAPI("/bands");
        setLineUp(data);
      } catch (error) {
        console.error("Error loading line up:", error);
      }
    };
    loadLineup();
  }, []);

  return (
    <>
      <section className="">
        <div className={`${krona_one.className} md:grid md:grid-cols-4`}>
          {lineUp.map((band) => (
            <article key={band.name} value={band.bands} className="flex flex-col">
              <Link href={band.slug} prefetch={false} className=" grid justify-items-between flex-grow ">
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
