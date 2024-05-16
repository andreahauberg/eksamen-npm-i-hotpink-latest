"use client";
import { fetchAPI } from "../../app/api/api.js";
import { useState, useEffect } from "react";
import Image from "next/image.js";
import Logo from "../../components/svgs/Logo.svg";
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
      <section className=" grid grid-cols-4">
        {lineUp.map((band) => (
          <article key={band.name} value={band.bands}>
            <Link href={band.slug} prefetch={false}>
              <Image src={band.logo.includes("https") ? band.logo : `/logos/${band.logo}`} width={500} height={200} alt="Picture of Artist" />
              <h1>{band.name}</h1>
            </Link>
          </article>
        ))}
      </section>
    </>
  );
}
