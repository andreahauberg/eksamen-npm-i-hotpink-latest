import { useState, useEffect } from "react";
import prices from "../backend/settings.js";
import { fetchAPI, fetchDatabase } from "../../app/api/api.js";
import { Field, Label, Select, Checkbox } from "@headlessui/react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { krona_one } from "@/app/fonts.jsx";

export default function Camping({
  ticketQuantity,
  ticketType,
  campingOptions,
  onClick,
  onNext,
  onBack,
}) {
  const [greenCamping, setGreenCamping] = useState(
    campingOptions.greenCamping || false
  );
  const [twoPersonTent, setTwoPersonTent] = useState(
    campingOptions.twoPersonTent || 0
  );
  const [threePersonTent, setThreePersonTent] = useState(
    campingOptions.threePersonTent || 0
  );
  const [campingAreas, setCampingAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(
    campingOptions.selectedArea || ""
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadCampingAreas = async () => {
      try {
        const data = await fetchAPI("/available-spots");
        setCampingAreas(data);
      } catch (error) {
        console.error("Error loading camping areas:", error);
      }
    };
    loadCampingAreas();
  }, []);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const ticketPrice =
        ticketQuantity *
        (ticketType === "regular" ? prices.regular : prices.vip);
      let addOnPrice = 0;
      addOnPrice += greenCamping ? prices.greenCamping : 0;
      addOnPrice += twoPersonTent * prices.TwoPersonsTent;
      addOnPrice += threePersonTent * prices.ThreePersonsTent;
      setTotalPrice(ticketPrice + addOnPrice);
    };
    calculateTotalPrice();
  }, [
    ticketQuantity,
    ticketType,
    greenCamping,
    twoPersonTent,
    threePersonTent,
  ]);

  useEffect(() => {
    onClick({
      camping: { greenCamping, twoPersonTent, threePersonTent, selectedArea },
    });
  }, [greenCamping, twoPersonTent, threePersonTent, selectedArea]);

  const handleQuantityChange = (type, increment) => {
    if (type === "twoPersonTent") {
      setTwoPersonTent((prev) => {
        const newQuantity = Math.max(0, prev + increment);
        const totalTents = newQuantity + threePersonTent;
        return totalTents <= ticketQuantity ? newQuantity : prev;
      });
    } else if (type === "threePersonTent") {
      setThreePersonTent((prev) => {
        const newQuantity = Math.max(0, prev + increment);
        const totalTents = twoPersonTent + newQuantity;
        return totalTents <= ticketQuantity ? newQuantity : prev;
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (twoPersonTent + threePersonTent === 0) {
      setErrorMessage("Du skal vælge telt, inden du kan gå videre.");
      return;
    }

    try {
      const reservation = await fetchAPI("/reserve-spot", {
        method: "PUT",
        body: JSON.stringify({
          area: selectedArea,
          amount: ticketQuantity,
        }),
      });

      await fetchAPI("/fullfill-reservation", {
        method: "POST",
        body: JSON.stringify({
          id: reservation.id,
        }),
      });

      const bookingData = {
        area: selectedArea,
        ticketQuantity,
        ticketType,
        greenCamping,
        twoPersonTent,
        threePersonTent,
        totalPrice,
        reservationId: reservation.id,
      };

      await fetchDatabase("/foofest_info", {
        method: "POST",
        body: JSON.stringify(bookingData),
      });

      onNext();
    } catch (error) {
      console.error("Error reserving spot:", error);
    }
  };

  return (
    <div className=" grid grid-cols-gridContent ">
      <div className="py-16 col-start-3 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-secondaryBgColor rounded-lg p-8 shadow-md shadow-primaryColor w-full max-w-md"
        >
          <fieldset className="space-y-6">
            <legend
              className={`${krona_one.className} large-size text-primaryTextColor`}
            >
              Camping Tilvalg
            </legend>
            <p className="text-sm">
              Bemærk: Prisen inkluderer opsætning af dit telt af vores team
            </p>

            <Field className="space-y-4">
              <Label htmlFor="twoPersonTent">2 person Telt</Label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => handleQuantityChange("twoPersonTent", -1)}
                  aria-label="Decrease 2 person tent quantity"
                  className="px-2 py-1 rounded-lg text-white bg-red-600 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-accentColor"
                >
                  -
                </button>
                <span className="mx-2 text-white">{twoPersonTent}</span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange("twoPersonTent", 1)}
                  aria-label="Increase 2 person tent quantity"
                  className="px-2 py-1 rounded-lg text-white bg-green-600 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-accentColor"
                >
                  +
                </button>
                <p className="ml-2 text-white">{prices.TwoPersonsTent} kr.</p>
              </div>
            </Field>

            <Field className="space-y-4">
              <Label htmlFor="threePersonTent">3 person Telt</Label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => handleQuantityChange("threePersonTent", -1)}
                  aria-label="Decrease 3 person tent quantity"
                  className="px-2 py-1 rounded-lg text-white bg-red-600 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-accentColor"
                >
                  -
                </button>
                <span className="mx-2 text-white">{threePersonTent}</span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange("threePersonTent", 1)}
                  aria-label="Increase 3 person tent quantity"
                  className="px-2 py-1 rounded-lg text-white bg-green-600 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-accentColor"
                >
                  +
                </button>
                <p className="ml-2 text-white">{prices.ThreePersonsTent} kr.</p>
              </div>
            </Field>

            <Field className="flex items-center">
              <Checkbox
                checked={greenCamping}
                onChange={setGreenCamping}
                className="group size-6 bg-inputFieldColor rounded-md p-1 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-accentColor data-[checked]:bg-white"
                id="greenCamping"
                aria-labelledby="greenCampingLabel"
              >
                <CheckIcon className="hidden size-4 fill-bgColor group-data-[checked]:block" />
              </Checkbox>
              <Label
                htmlFor="greenCamping"
                id="greenCampingLabel"
                className="ml-2 text-white"
              >
                Green camping {prices.greenCamping} kr.
              </Label>
            </Field>

            <Field className="space-y-4">
              <Label htmlFor="campingArea">Vælg Campingområde</Label>
              <div className="relative">
                <Select
                  id="campingArea"
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className={clsx(
                    "mt-1 block w-44 appearance-none border-none rounded-lg bg-inputFieldColor text-bgColor py-2 px-5",
                    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accentColor"
                  )}
                  aria-label="Vælg campingområde"
                >
                  <option value="">Select an area</option>
                  {campingAreas.map((area) => (
                    <option key={area.area} value={area.area}>
                      {area.area} (Available spots: {area.available})
                    </option>
                  ))}
                </Select>
                <ChevronDownIcon
                  className="pointer-events-none absolute top-2.5 left-36 size-5 fill-bgColor"
                  aria-hidden="true"
                />
              </div>
            </Field>

            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <div className="text-white">Total pris: {totalPrice} kr.</div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={onBack}
                className="bg-bgColor border-2 rounded-lg border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
              >
                Tilbage
              </button>
              <button
                type="submit"
                onClick={onNext}
                className="bg-bgColor border-2 rounded-lg border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
              >
                Fortsæt
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
