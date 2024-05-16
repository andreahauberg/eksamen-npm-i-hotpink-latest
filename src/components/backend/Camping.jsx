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
    <div className="grid grid-cols-gridContent">
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
              <Label htmlFor="campingArea">Vælg Campingområde</Label>
              <div className="relative">
                <Select
                  id="campingArea"
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className={clsx(
                    "mt-1 block w-full appearance-none border-none rounded-lg bg-inputFieldColor text-bgColor py-2 px-5",
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
                  className="pointer-events-none absolute top-2.5 right-2.5 size-5 fill-bgColor"
                  aria-hidden="true"
                />
              </div>
            </Field>

            <table className="min-w-full rounded-lg">
              <thead>
                <tr>
                  <th className="text-left px-4 py-3 rounded-tl-lg text-bgColor bg-primaryTextColor">
                    Add-ons
                  </th>
                  <th className="text-center px-4 py-3 text-bgColor bg-primaryTextColor">
                    Quantity
                  </th>
                  <th className="text-right px-4 py-3 rounded-tr-lg text-bgColor bg-primaryTextColor">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className=" px-4 pb-2 pt-6">2 person tent</td>
                  <td className=" px-4 pb-2 pt-6 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleQuantityChange("twoPersonTent", -1)
                        }
                        aria-label="Decrease 2 person tent quantity"
                        className="px-2 py-1 rounded-lg text-white bg-red-600 focus:outline-none"
                      >
                        -
                      </button>
                      <span>{twoPersonTent}</span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange("twoPersonTent", 1)}
                        aria-label="Increase 2 person tent quantity"
                        className="px-2 py-1 rounded-lg text-white bg-green-600 focus:outline-none"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className=" px-4 pb-2 pt-6 text-right">
                    {prices.TwoPersonsTent} DKK
                  </td>
                </tr>
                <tr>
                  <td className=" px-4 py-2">3 person tent</td>
                  <td className=" px-4 py-2 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleQuantityChange("threePersonTent", -1)
                        }
                        aria-label="Decrease 3 person tent quantity"
                        className="px-2 py-1 rounded-lg text-white bg-red-600 focus:outline-none"
                      >
                        -
                      </button>
                      <span>{threePersonTent}</span>
                      <button
                        type="button"
                        onClick={() =>
                          handleQuantityChange("threePersonTent", 1)
                        }
                        aria-label="Increase 3 person tent quantity"
                        className="px-2 py-1 rounded-lg text-white bg-green-600 focus:outline-none"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className=" px-4 py-2 text-right">
                    {prices.ThreePersonsTent} DKK
                  </td>
                </tr>
                <tr>
                  <td className=" px-4 pb-6 pt-2">
                    Supportive camping
                    <br />
                    {/* <span className="text-sm text-gray-500">
                      Option to help change the world
                    </span> */}
                  </td>
                  <td className=" px-4 pb-6 pt-4 flex justify-center text-center items-center">
                    <Checkbox
                      checked={greenCamping}
                      onChange={setGreenCamping}
                      className="h-6 w-6 rounded bg-inputFieldColor text-accentColor focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-accentColor"
                    >
                      {({ checked }) => (
                        <div
                          className={clsx(
                            checked ? "bg-accentColor" : "bg-inputFieldColor",
                            "flex items-center justify-center h-6 w-6 rounded "
                          )}
                        >
                          {checked && (
                            <CheckIcon
                              className="w-4 h-4 text-bgColor"
                              aria-hidden="true"
                            />
                          )}
                        </div>
                      )}
                    </Checkbox>
                  </td>
                  <td className=" px-4 pb-6 pt-2 text-right">
                    {prices.greenCamping} DKK
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colSpan="3"
                    className="text-center px-4 py-3 bg-primaryTextColor rounded-b-lg text-bgColor"
                  >
                    <strong>
                      Total (
                      {twoPersonTent + threePersonTent + (greenCamping ? 1 : 0)}{" "}
                      item
                      {twoPersonTent +
                        threePersonTent +
                        (greenCamping ? 1 : 0) !==
                      1
                        ? "s"
                        : ""}
                      ): {totalPrice} DKK
                    </strong>
                  </td>
                </tr>
                {errorMessage && (
                  <tr>
                    <td
                      colSpan="3"
                      className="text-red-500 text-right px-4 py-2"
                    >
                      {errorMessage}
                    </td>
                  </tr>
                )}
              </tfoot>
            </table>

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
