import { krona_one } from "@/app/fonts.jsx";
import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Disclosure,
  DisclosurePanel,
  DisclosureButton,
} from "@headlessui/react";
import RegularTicketSVG from "./RegularTicketSVG";
import VIPTicketSVG from "./VIPTicketSVG";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import CartSummary from "./CartSummary";

export default function SummaryPage({ bookingData, onBack, onNext }) {
  const { ticketType, ticketQuantity, personalInfo, camping, totalPrice } =
    bookingData;

  const TicketSVG =
    ticketType.toLowerCase() === "vip" ? VIPTicketSVG : RegularTicketSVG;
  // Denne betingelse tjekker, om ticketType (billet type) er "vip" (ignorerer store/små bogstaver). ternary operator bruges til at vælge mellem de to svg'er
  return (
    <div className="grid grid-cols-gridContent">
      <div className="pt-8 pb-16 col-start-3 gap-3 flex flex-wrap items-center justify-center ">
        <div className="bg-secondaryBgColor rounded-lg p-8 shadow-lg w-full max-w-lg">
          <h2
            className={`${krona_one.className} large-size  text-primaryTextColor mb-6`}
          >
            Opsummering
          </h2>
          <div className="mb-6 space-y-6">
            <div className="flex flex-wrap md:justify-evenly items-center mb-8 gap-2">
              <div className="normal-size">
                <p className="font-semibold mb-2 ">Billetter:</p>
                <p className="mb-2">
                  {ticketType.charAt(0).toUpperCase() + ticketType.slice(1)}{" "}
                  billet x {ticketQuantity}
                  {/* Formaterer ticketType til at have en stor begyndelsesbogstav. */}
                </p>
              </div>
              <TicketSVG className=" w-64" aria-hidden="true" />
            </div>
            <TabGroup>
              <TabList className="flex space-x-1 rounded-xl bg-primaryTextColor text-bgColor p-1">
                <Tab
                  className={({ selected }) =>
                    // render-prop dele kode mellem komponenter ved at bruge en prop, hvis værdi er en funktion. Her er det en boolesk værdi, der viser om tabben er valgt eller ej
                    selected
                      ? "w-full py-2.5 xsmall-size rounded-lg bg-inputFieldColor text-bgColor shadow focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                      : "w-full py-2.5 xsmall-size rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                  }
                  // clsx kombinerer statiske og dynamiske klassetyper. fx standard tailwind klasser og booleans
                >
                  Personlige oplysninger
                </Tab>
                <Tab
                  className={({ selected }) =>
                    selected
                      ? "w-full py-2.5 xsmall-size  rounded-lg bg-inputFieldColor text-bgColor shadow focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                      : "w-full py-2.5 xsmall-size  rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                  }
                >
                  Campingområde
                </Tab>
              </TabList>
              <TabPanels className="mt-2">
                <TabPanel className="rounded-xl p-3">
                  {personalInfo.map((info, index) => (
                    // mappes over arrayet, to argumenter gives til call back funktionen. Så hvor hvert element i personalInfo genereres der en sektion
                    <Disclosure key={index} defaultOpen={index === 0}>
                      {/* key = unik nøgle og defaultOpen sørger for den første sektion er åben som standard */}
                      {({ open }) => (
                        // render-prop dele kode mellem komponenter ved at bruge en prop, hvis værdi er en funktion. Funktionen tager open-tilstanden som argument og returnerer JSX-indholdet
                        <>
                          <div className="relative mb-2">
                            <DisclosureButton
                              className={clsx(
                                "w-full py-2.5 small-size rounded-lg bg-inputFieldColor text-bgColor shadow focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor",
                                { " ": open }
                              )}
                              aria-expanded={open}
                              aria-controls={`panel-${index}`}
                              // clsx til at tilføje CSS-klasser baseret på open-tilstanden. aria-expanded={open} og aria-controls={panel-${index}} er ARIA-attributter, der forbedrer tilgængeligheden ved at angive knaptilstand og kontrollere hvilket panel knappen er forbundet med.
                            >
                              <b>Billet</b> {index + 1} ({ticketType})
                            </DisclosureButton>
                            {open ? (
                              <ChevronUpIcon
                                className="pointer-events-none absolute top-2.5 right-2.5 size-5 fill-bgColor"
                                aria-hidden="true"
                              />
                            ) : (
                              <ChevronDownIcon
                                className="pointer-events-none absolute top-2.5 right-2.5 size-5 fill-bgColor"
                                aria-hidden="true"
                              />
                            )}
                          </div>

                          <DisclosurePanel
                            className=" pt-2 mb-4  pb-4 px-5 flex flex-wrap text-bgColor bg-primaryTextColor rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                            id={`panel-${index}`}
                          >
                            <div>
                              <p className="small-size">
                                <b>Fornavn:</b> {info.firstName}
                              </p>
                              <p className="small-size">
                                <b>Efternavn:</b> {info.lastName}
                              </p>
                              <p className="small-size">
                                <b>Telefonnummer:</b> {info.phoneNumber}
                              </p>
                            </div>
                            <div>
                              <p className="small-size">
                                <b>Fødselsdato:</b> {info.dateOfBirth}
                              </p>
                              <p className="small-size">
                                <b>Email:</b> {info.email}
                              </p>
                            </div>
                          </DisclosurePanel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </TabPanel>
                <TabPanel className="rounded-xl  bg-primaryTextColor text-bgColor pt-2 mb-4  pb-4 px-5 ">
                  <div>
                    {camping.selectedArea && (
                      <p className="small-size">
                        <b>Camping område:</b> {camping.selectedArea}
                      </p>
                    )}
                    {camping.greenCamping && (
                      <p className="small-size">
                        <b>Green Camping:</b>{" "}
                        {camping.greenCamping ? "Yes" : "No"}
                      </p>
                    )}

                    {camping.twoPersonTent > 0 && (
                      <p className="small-size">
                        <b>2 personers telt x</b> {camping.twoPersonTent}
                      </p>
                    )}
                    {camping.threePersonTent > 0 && (
                      <p className="small-size">
                        <b>3 personers telt x</b> {camping.threePersonTent}
                      </p>
                    )}
                  </div>
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </div>
          <div className="flex justify-between">
            <button
              onClick={onBack}
              className="bg-bgColor border-2 rounded-lg border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
              aria-label="Tilbage"
            >
              Tilbage
            </button>
            <button
              onClick={onNext}
              className="bg-bgColor border-2 rounded-lg border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor ml-4"
              aria-label="Fortsæt til betaling"
            >
              Fortsæt til betaling
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center fixed w-full max-w-md md:w-44">
          <CartSummary
            ticketType={ticketType}
            ticketQuantity={ticketQuantity}
            campingOptions={camping}
          />
        </div>
      </div>
    </div>
  );
}
