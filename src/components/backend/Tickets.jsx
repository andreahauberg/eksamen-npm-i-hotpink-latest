import { useState, useEffect } from "react";
import prices from "../backend/settings.js";
import { krona_one } from "@/app/fonts.jsx";
import { RadioGroup, Radio } from "@headlessui/react";
import { CheckCircleIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

import RegularTicketSVG from "./RegularTicketSVG";
import VIPTicketSVG from "./VIPTicketSVG";

export default function TicketsForm({
  ticketType,
  ticketQuantity,
  onClick,
  onNext,
}) {
  const [localTicketType, setLocalTicketType] = useState(ticketType);
  const [localQuantity, setLocalQuantity] = useState(ticketQuantity);
  const [localTotalPrice, setLocalTotalPrice] = useState(0);

  useEffect(() => {
    const updatePrice = () => {
      const pricePerTicket =
        localTicketType === "regular" ? prices.regular : prices.vip;
      setLocalTotalPrice(localQuantity * pricePerTicket);
    };

    updatePrice();
  }, [localTicketType, localQuantity]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onClick({ ticketType: localTicketType, ticketQuantity: localQuantity });
    onNext();
  };

  const ticketOptions = [
    { name: "Regular", price: prices.regular, SVG: RegularTicketSVG },
    { name: "VIP", price: prices.vip, SVG: VIPTicketSVG },
  ];

  return (
    <div className="grid grid-cols-gridContent">
      <div className="pt-8 pb-16 col-start-3 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-secondaryBgColor p-8 rounded-lg shadow-md shadow-primaryColor w-full max-w-md"
        >
          <fieldset className="space-y-6">
            <legend
              className={`${krona_one.className} large-size mb-1 text-primaryTextColor`}
            >
              Vælg billettype
            </legend>
            <RadioGroup
              value={localTicketType}
              onChange={setLocalTicketType}
              className="space-y-6"
              aria-labelledby="ticket-type-label"
            >
              <label id="ticket-type-label" className="block mb-2 sr-only">
                Billettype
              </label>
              {ticketOptions.map((option) => (
                <Radio
                  key={option.name}
                  value={option.name.toLowerCase()}
                  className={({ active, checked }) =>
                    // clsx kombinerer statiske og dynamiske klassetyper. fx standard tailwind klasser og booleans
                    clsx(
                      "relative flex cursor-pointer rounded-lg bg-bgColor py-4 px-5 shadow-md transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor",
                      {
                        "ring-2 ring-offset-2 ring-accentColor": active,
                        "bg-primaryTextColor/10": checked,
                      }
                    )
                  }
                >
                  {({ checked }) => (
                    <div className="flex w-full items-center justify-between">
                      <div className="small-size flex items-center gap-3">
                        <option.SVG className="h-12 w-12" aria-hidden="true" />
                        <p className="text-primaryTextColor">
                          {option.name} {option.price} DKK
                        </p>
                      </div>
                      {checked && (
                        <CheckCircleIcon
                          className="size-7 fill-accentColor"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  )}
                </Radio>
              ))}
            </RadioGroup>
            <div className="flex flex-col small-size">
              <label htmlFor="ticketQuantity" className="mb-1 font-bold">
                Vælg antal billetter:
              </label>
              <div className="relative">
                <select
                  id="ticketQuantity"
                  value={localQuantity} //Binder værdien af dropdown-menuen til localQuantity i komponenten. Når en mulighed bliver valgt opdateres localQuantity
                  onChange={(e) => setLocalQuantity(e.target.value, 10)} //onChange-hændelsen håndterer ændringer i dropdown'ens værdi. Når der vælges kaldes denne funktion, og localQuantity opdateres med den nye værdi
                  //e.target.value får værdien af det valgte option element som en streng.
                  className={clsx(
                    "mt-1 block w-28 appearance-none border-none rounded-lg bg-inputFieldColor text-bgColor py-2 px-5",
                    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accentColor"
                  )}
                  // clsx kombinerer statiske og dynamiske klassetyper. fx standard tailwind klasser og booleans
                  aria-describedby="ticketQuantity-description"
                  required
                >
                  {/* komprimeret kode */}
                  {/* Opretter et arry med 10 udeffinerede elementer, bruger spread til at kovertere til et reelt array */}
                  {/* Her mapper vi og genrerer option-elementer 
                  i = index som går fra 0 - 9*/}
                  {[...Array(10)].map((_, i) => (
                    // element får en unik nøgle baseret på indexet plus 1 (= værdier fra 1 til 10).
                    // sætter værdien af option til index + 1
                    <option key={i + 1} value={i + 1}>
                      {/* her vises index + 1 som text */}
                      {i + 1}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon
                  className="pointer-events-none absolute top-3.5 left-20 size-5 fill-bgColor"
                  aria-hidden="true"
                />
              </div>
            </div>
            <div className="normal-size">
              Total pris for billetter: {localTotalPrice} DKK
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-bgColor rounded-lg border-2 border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                aria-label="Køb billetter"
              >
                Køb billetter
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
