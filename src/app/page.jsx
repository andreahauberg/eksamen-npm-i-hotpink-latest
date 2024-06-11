"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "@/components/globals/Button";
import CountdownTimer from "@/components/globals/CountdownTimer";
import HeroSvg from "@/components/globals/HeroSvg.jsx";
import Faq from "@/components/globals/Faq.jsx";
import TicketCard from "@/components/globals/TicketCard";
import { krona_one } from "@/app/fonts.jsx";

export default function Home() {
  // holder styr på om komponenten er monteret. Sørger for at den kun renderes på klienten og ikke på serveren. Serveren har ikke adgang til DOM'en
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    //isMounted er true, viser at komponenten er monteret (effecten)
    setIsMounted(true);
  }, []); //tomt array sørger for den kun kører en gang. Derved sikrer man at hele DOM'en er tilgængelig og komponenten er fuldt monteret. (dependencies)

  const tickets = [
    {
      title: "VIP",
      description: "Få en eksklusiv oplevelse med vores VIP billet. ",
      features: [
        "Adgang til VIP område",
        "Gratis mad og drikke",
        "Prioriteret siddeplads",
        "Meet & Greet med kunstnere",
      ],
      price: 1299,
      link: "/booking/",
    },
    {
      title: "REGULAR",
      description:
        "Nyd alle festivalens højdepunkter med vores REGULAR billet. ",
      features: [
        "Adgang til alle koncerter",
        "Adgang til fællesområder",
        "Købsadgang til mad og drikke",
      ],
      price: 799,
      link: "/booking/",
    },
  ];

  const faqs = [
    {
      title:
        "Hvad er åbningstiderne for festivalen, og er der særlige aktiviteter?",
      body: "Festivalen er åben fra kl. 10:00 til kl. 23:00 hver dag.",
      data: "åbningstider",
      id: "åbningstider",
    },
    {
      title: "Hvordan køber jeg billetter, og hvilke typer er tilgængelige?",
      body: "Billetter kan købes online eller ved indgangen. Vi tilbyder VIP og Regular billetter.",
      data: "køb af billetter",
      id: "køb af billetter",
    },
    {
      title: "Hvad er reglerne for medbringelse af mad og drikkevarer?",
      body: "Det er ikke tilladt at medbringe egen mad og drikkevarer.",
      data: "medbragte mad og drikke",
      id: "medbragte mad og drikke",
    },
    {
      title: "Hvilke sikkerhedsforanstaltninger er der på festivalen?",
      body: "Vi har sikkerhedspersonale på pladsen døgnet rundt.",
      data: "sikkerheden på pladsen",
      id: "sikkerheden på pladsen",
    },
    {
      title:
        "Er der faciliteter til personer med handicap, og hvordan er forholdene?",
      body: "Ja, vi har specielle faciliteter og adgangsforhold for personer med handicap.",
      data: "faciliteter for handicap",
      id: "faciliteter for handicap",
    },
    {
      title: "Er der parkeringsmuligheder, og hvor kan jeg finde information?",
      body: "Ja, der er parkeringsmuligheder tæt på festivalområdet. Parkeringspladser kan reserveres på forhånd gennem vores hjemmeside.",
      data: "parkering",
      id: "parkering",
    },
  ];

  return (
    <div className="min-h-screen bg-secondaryBgColor">
      <h1 className="hidden">FooFest Forside</h1>
      <header className="relative text-center py-16 bg-cover bg-center">
        <div className="absolute inset-0">
          <Image
            src="/images/image1.png"
            alt="Background"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
        <div className="relative z-10">
          <HeroSvg />
          <div className="mt-8 flex justify-center gap-4 md:gap-6">
            <Link
              href="/booking/"
              className=" w-44 md:w-52 focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accentColor"
            >
              <Button title="Køb billetter" />
            </Link>
          </div>
        </div>
      </header>
      <section className="text-center py-8 bg-bgColor">
        {/* Conditional rendering bruges, så den kun renderes når isMounted er true. Derved forhindrer vi at den renderes for tidligt.  */}
        {isMounted && (
          <CountdownTimer targetDate={new Date("2024-07-01T00:00:00")} />
        )}
      </section>
      <section>
        <p className={`${krona_one.className} medium-size text-center py-6`}>
          Billettyper
        </p>
        <div className="flex flex-row overflow-x-auto snap-x scroll-px-8 justify-start lg:justify-center items-center space-x-4 md:space-x-8 px-12 lg:px-0 pb-5 space-y-0 w-full">
          {tickets.map((ticket, index) => (
            <TicketCard key={index} {...ticket} />
          ))}
        </div>
      </section>
      <section className=" bg-bgColor mt-8">
        <div className="py-6 px-4 rounded-lg flex flex-col justify-center items-center">
          <p className="large-size pt-4 pb-10 ">Ofte Stillede Spørgsmål</p>
          <div className="">
            {faqs.map((faq, index) => (
              <Faq key={index} {...faq} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
