import { useState, useEffect } from "react";
import prices from "../backend/settings.js";
import { fetchAPI } from "../../app/api/api.js";
import {
  Field,
  Label,
  Select,
  Checkbox,
  Fieldset,
  Legend,
} from "@headlessui/react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { krona_one } from "@/app/fonts.jsx";
import CartSummary from "./CartSummary";

function calculateTotalPrice(ticketQuantity, ticketType, campingOptions) {
  const ticketPrice =
    ticketQuantity * (ticketType === "regular" ? prices.regular : prices.vip);
  const addOnPrice =
    (campingOptions.greenCamping ? prices.greenCamping : 0) +
    campingOptions.twoPersonTent * prices.TwoPersonsTent +
    campingOptions.threePersonTent * prices.ThreePersonsTent;

  return ticketPrice + addOnPrice + prices.fee;
}

export default function Camping({
  ticketQuantity,
  ticketType,
  campingOptions,
  onClick,
  onNext,
  onBack,
  setBookingData,
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
    // Definerer en asynkron funktion kaldet loadCampingAreas
    const loadCampingAreas = async () => {
      // bruger await til at vente på, at fetchAPI's Promise bliver opfyldt, og returnerer data
      const data = await fetchAPI("/available-spots");
      // opdaterer state med den hentede data.
      setCampingAreas(data);
    };
    // kaldes for at udføre datahentningen.
    loadCampingAreas();
    // kun kører én gang, når komponenten mountes
  }, []);

  useEffect(() => {
    const campingOptions = { greenCamping, twoPersonTent, threePersonTent };
    const totalPrice = calculateTotalPrice(
      ticketQuantity,
      ticketType,
      campingOptions
    );
    setTotalPrice(totalPrice);
  }, [
    greenCamping,
    twoPersonTent,
    threePersonTent,
    ticketQuantity,
    ticketType,
  ]);

  useEffect(() => {
    onClick({
      // kalder on-click og sender et objekt med campingdata
      camping: { greenCamping, twoPersonTent, threePersonTent, selectedArea },
    });
  }, [greenCamping, twoPersonTent, threePersonTent, selectedArea, onClick]);

  // to parametre: type af telt og mængden der skal ændres
  // defineres som en variabel, der tildeles en arrow-funktion, kan derefter bruges som en funktion andre steder
  const handleQuantityChange = (type, increment) => {
    if (type === "twoPersonTent") {
      // prev er den nuværende mængde
      setTwoPersonTent((prev) => {
        // newQuantity beregnes ved at lægge increment til den nuværende mængde og sikre at den ikke bliver mindre end 0
        const newQuantity = Math.max(0, prev + increment);
        // den samlede mængde telte, summen af de nye topersonerstelte og de nuværende tre personers
        const totalTents = newQuantity + threePersonTent;
        // hvis den er <= biletmængden, så returneres den nye mængde ellers retuneres prev (ændringen gennemføres ikke)
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

    if (!selectedArea || selectedArea === "") {
      setErrorMessage(
        "Du skal vælge et campingområde, inden du kan gå videre."
      );
      return;
    }

    const reservation = await fetchAPI("/reserve-spot", {
      method: "PUT",
      body: JSON.stringify({
        area: selectedArea,
        amount: ticketQuantity,
      }),
    });

    setBookingData((old) => ({
      ...old,
      area: selectedArea,
      ticketQuantity,
      ticketType,
      greenCamping,
      twoPersonTent,
      threePersonTent,
      orderId: reservation.id,
    }));

    onNext();
  };
  // Filter-metoden skaber et nyt array med alle elementer der opfylder kravene
  const filteredCampingAreas = campingAreas.filter(
    // denne funktion tjekker hvert area for tilgængelighed er større end eller lig med det ønskede antal billetter
    (area) => area.available >= ticketQuantity
    // kun de områder hvor tilgængelighed er større end eller lig med billetmængden, indkluderes i filteredCampingAreas
  );

  return (
    <div className="grid grid-cols-gridContent">
      <div className="pt-8 pb-16 col-start-3 gap-3 flex flex-wrap items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-secondaryBgColor rounded-lg p-8 shadow-md shadow-primaryColor w-full max-w-md"
        >
          <Fieldset className="space-y-6">
            <Legend
              className={`${krona_one.className} large-size text-primaryTextColor`}
            >
              Camping Tilvalg
            </Legend>
            <p className="xsmall-size">
              Bemærk: Prisen inkluderer opsætning af dit telt af vores team
            </p>

            <Field className="space-y-4">
              <Label htmlFor="campingArea">Vælg Campingområde</Label>
              <div className="relative">
                <Select
                  id="campingArea"
                  value={selectedArea} //Binder værdien af dropdown-menuen til selectedArea i komponenten. Når en mulighed bliver valgt opdateres selectedArea
                  onChange={(e) => setSelectedArea(e.target.value)}
                  //onChange-hændelsen håndterer ændringer i dropdown'ens værdi. Når der vælges kaldes denne funktion, og localQuantity opdateres med den nye værdi
                  //e.target.value får værdien af det valgte option element som en streng.

                  className={clsx(
                    "mt-1 block w-full appearance-none border-none rounded-lg bg-inputFieldColor text-bgColor py-2 px-5",
                    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accentColor"
                  )}
                  // clsx kombinerer statiske og dynamiske klassetyper. fx standard tailwind klasser og booleans
                  aria-label="Vælg campingområde"
                  required
                >
                  <option value="">Vælg campingområde</option>
                  {/*første option er tom, fungerer som en standard besked til brugeren om at vælge et campingområde. */}
                  {filteredCampingAreas.map((area) => (
                    // For hvert area i filteredCampingAreas arrayet, oprettes en option
                    <option key={area.area} value={area.area}>
                      {/* hvert element får en unik nøgle baseret på area*/}
                      {area.area} (Ledige pladser: {area.available})
                      {/*her vises campingområdets navn og antallet af ledige pladser */}
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
                    Tilvalg
                  </th>
                  <th className="text-center px-4 py-3 text-bgColor bg-primaryTextColor">
                    Antal
                  </th>
                  <th className="text-right px-4 py-3 rounded-tr-lg text-bgColor bg-primaryTextColor">
                    Pris
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 pb-2 pt-6">2 pers telt</td>
                  <td className="px-4 pb-2 pt-6 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        type="button"
                        onClick={() =>
                          // ved klik kaldes funktionen, som tager to argumenter, typen og ændringen af mænngde
                          handleQuantityChange("twoPersonTent", -1)
                        }
                        aria-label="Decrease 2 person tent quantity"
                        className="px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                      >
                        -
                      </button>
                      <span>{twoPersonTent}</span>
                      <button
                        type="button"
                        onClick={() =>
                          // ved klik kaldes funktionen, som tager to argumenter, typen og ændringen af mænngde
                          handleQuantityChange("twoPersonTent", 1)
                        }
                        aria-label="Increase 2 person tent quantity"
                        className="px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-4 pb-2 pt-6 text-right">
                    {prices.TwoPersonsTent} DKK
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2">3 pers telt</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        type="button"
                        onClick={() =>
                          // ved klik kaldes funktionen, som tager to argumenter, typen og ændringen af mænngde
                          handleQuantityChange("threePersonTent", -1)
                        }
                        aria-label="Decrease 3 person tent quantity"
                        className="px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                      >
                        -
                      </button>
                      <span>{threePersonTent}</span>
                      <button
                        type="button"
                        onClick={() =>
                          // ved klik kaldes funktionen, som tager to argumenter, typen og ændringen af mænngde

                          handleQuantityChange("threePersonTent", 1)
                        }
                        aria-label="Increase 3 person tent quantity"
                        className="px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-right">
                    {prices.ThreePersonsTent} DKK
                  </td>
                </tr>
                <tr>
                  <td className="px-4 pb-6 pt-2">Grøn camping</td>
                  <td className="px-4 pb-6 pt-4 flex justify-center text-center items-center">
                    <Checkbox
                      checked={greenCamping}
                      // checked Prop: Bestemmer, om checkboxen er tjekket. greenCamping er en state-variabel, der holder en boolean værdi
                      onChange={setGreenCamping}
                      //Angiver en funktion, der skal kaldes, når checkboxens tilstand ændres. setGreenCamping opdaterer greenCamping state-variablen
                      className="h-6 w-6 rounded bg-inputFieldColor text-accentColor focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-accentColor"
                      aria-label="Green camping"
                    >
                      {({ checked }) => (
                        // Render prop funktion, der tager et objekt med en checked egenskab som argument og returnerer JSX. checked enskaben har en boolesk værdi, der angiver, om checkboxen er tjekket eller ej
                        <div
                          className={clsx(
                            checked ? "bg-accentColor" : "bg-inputFieldColor",
                            // tunary operator
                            "flex items-center justify-center h-6 w-6 rounded "
                          )}
                          // clsx kombinerer statiske og dynamiske klassetyper. fx standard tailwind klasser og booleans
                        >
                          {checked && (
                            // conditional rendering. viser elementer baseret på betingelsen.
                            <CheckIcon
                              className="w-4 h-4 text-bgColor"
                              aria-hidden="true"
                            />
                          )}
                        </div>
                      )}
                    </Checkbox>
                  </td>
                  <td className="px-4 pb-6 pt-2 text-right">
                    {prices.greenCamping} DKK
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="px-4 py-2 text-right">
                    Booking gebyr: {prices.fee} DKK
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    className="text-center px-4 py-3 bg-primaryTextColor rounded-b-lg text-bgColor"
                  >
                    <strong>Total Pris: {totalPrice} DKK</strong>
                  </td>
                </tr>
                {errorMessage && (
                  <tr>
                    <td colSpan="3" className=" text-right px-4 py-2">
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
                aria-label="Tilbage"
              >
                Tilbage
              </button>
              <button
                type="submit"
                className="bg-bgColor border-2 rounded-lg border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                aria-label="Fortsæt"
              >
                Fortsæt
              </button>
            </div>
          </Fieldset>
        </form>

        <CartSummary
          ticketType={ticketType}
          ticketQuantity={ticketQuantity}
          campingOptions={campingOptions}
        />
      </div>
    </div>
  );
}
