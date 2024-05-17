import { krona_one } from "@/app/fonts.jsx";
import { Tab, Disclosure } from "@headlessui/react";
import RegularTicketSVG from "./RegularTicketSVG";
import VIPTicketSVG from "./VIPTicketSVG";

export default function SummaryPage({ bookingData, onBack, onNext }) {
  const {
    ticketType,
    ticketQuantity,
    personalInfo,
    camping,
    totalPrice,
    orderId,
  } = bookingData;

  const TicketSVG =
    ticketType.toLowerCase() === "vip" ? VIPTicketSVG : RegularTicketSVG;

  return (
    <div className="grid grid-cols-gridContent">
      <div className="pt-8 pb-16 col-start-3 gap-3 flex flex-wrap items-center justify-center ">
        <div className="bg-secondaryBgColor rounded-lg p-8 shadow-md shadow-primaryColor w-full max-w-3xl">
          <h1
            className={`${krona_one.className} large-size text-primaryTextColor mb-3 text-center`}
          >
            Opsummering
          </h1>
          <div className="mb-6 space-y-4">
            {/* <div>
              <h2 className="medium-size mb-2 ">Ordrenummer</h2>
              <p className="mb-10 normal-size">{orderId}</p>
            </div> */}
            <div className="flex gap-4 justify-center">
              <div>
                <h2 className="normal-size mb-2">Billetter</h2>
                <p className="small-size">
                  {ticketType.charAt(0).toUpperCase() + ticketType.slice(1)}{" "}
                  ticket x {ticketQuantity}
                </p>
              </div>
              <TicketSVG className="" />
            </div>
            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-xl bg-secondaryColor text-bgColor p-1">
                <Tab
                  className={({ selected }) =>
                    selected
                      ? "w-full py-2.5 text-sm leading-5 small-size text-blue-700 rounded-lg bg-bgColor text-primaryTextColor shadow focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                      : "w-full py-2.5 text-sm leading-5 small-size text-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                  }
                >
                  Personlige oplysninger
                </Tab>
                <Tab
                  className={({ selected }) =>
                    selected
                      ? "w-full py-2.5 text-sm leading-5 small-size  rounded-lg bg-bgColor text-primaryTextColor shadow focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                      : "w-full py-2.5 text-sm leading-5 small-size  rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                  }
                >
                  Camping
                </Tab>
              </Tab.List>
              <Tab.Panels className="mt-2">
                <Tab.Panel className="rounded-xl p-3">
                  {personalInfo.map((info, index) => (
                    <Disclosure key={index} defaultOpen={index === 0}>
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className={({ selected }) =>
                              selected
                                ? "w-full py-2.5 text-sm leading-5 small-size rounded-lg mb-4  bg-bgColor text-primaryTextColor shadow focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                                : "w-full py-2.5 text-sm leading-5 small-size rounded-lg mb-4  bg-bgColor text-primaryTextColorfocus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                            }
                          >
                            Billet {index + 1}
                          </Disclosure.Button>
                          <Disclosure.Panel className="pt-2 mb-2 pb-4 text-center text-bgColor bg-secondaryColor rounded-lg text-primaryTextColorfocus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor">
                            <p className="small-size">
                              First name: {info.firstName}
                            </p>
                            <p className="small-size">
                              Last name: {info.lastName}
                            </p>
                            <p className="small-size">
                              Phone number: {info.phoneNumber}
                            </p>
                            <p className="small-size">
                              Date of birth: {info.dateOfBirth}
                            </p>
                            <p className="small-size">Email: {info.email}</p>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </Tab.Panel>
                <Tab.Panel className="rounded-xl p-3 bg-secondaryColor text-bgColor text-center">
                  {camping.selectedArea && (
                    <p className="small-size">
                      Camping area: {camping.selectedArea}
                    </p>
                  )}
                  {camping.greenCamping && (
                    <p className="small-size">
                      Green Camping: {camping.greenCamping ? "Yes" : "No"}
                    </p>
                  )}
                  {camping.twoPersonTent > 0 && (
                    <p className="small-size">
                      2 person Tent x {camping.twoPersonTent}
                    </p>
                  )}
                  {camping.threePersonTent > 0 && (
                    <p className="small-size">
                      3 person Tent x {camping.threePersonTent}
                    </p>
                  )}
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
            <div>
              <h2 className="normal-size mb-2">Pris</h2>
              <p className="small-size">Total: {totalPrice} kr.</p>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={onBack}
              className="bg-bgColor border-2 rounded-lg border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
            >
              Back
            </button>
            <button
              onClick={onNext}
              className="bg-bgColor border-2 rounded-lg border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor ml-4"
            >
              Continue to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
