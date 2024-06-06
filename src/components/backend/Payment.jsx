import { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { fetchAPI, saveOrderToSupabase } from "../../app/api/api.js";
import { krona_one } from "@/app/fonts.jsx";

export default function Payment({ bookingData, onNext, onBack }) {
  // sender de tre props med
  const {
    reservationId,
    personalInfo,
    ticketQuantity,
    ticketType,
    orderId,
    totalPrice,
  } = bookingData;
  // Ekstrahere data fra bookingData

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focused, setFocused] = useState("");
  // useState opbevarer og opdaterer værdierne for kreditkortdetaljerne og den fokuserede inputfelt.

  const handleCompletePurchase = async (event) => {
    event.preventDefault();
    // Forhindrer den standard handling af formularindsendelse, som normalt ville genindlæse siden, så vi kan udføre yderligere valideringer og API-opkald uden at genindlæse siden

    const form = event.target.closest("form");
    //  Finder den nærmeste formularelement til den aktuelle event target
    if (!form.checkValidity()) {
      // Returnerer true hvis formularen er gyldig, ellers false
      form.reportValidity();
      // Viser valideringsmeddelelser
      return;
    }

    await fetchAPI(
      "/fullfill-reservation",
      // Kalder til API'en med reservations-ID'et
      {
        method: "POST",
        // Specificerer, at dette er en POST-anmodning.
        body: JSON.stringify({ id: reservationId }),
        // Inkluderer reservations-ID'et i anmodningen
      }
    );
    // sender en POST-request til serveren fot at fuldføre reservationen

    const orderData = personalInfo.map((info) => ({
      // mapper personalInfo arrayet og skaber et nyt array med formaterede ordredata
      first_name: info.firstName,
      last_name: info.lastName,
      amount: ticketQuantity,
      email: info.email,
      phone: info.phoneNumber,
      birthday: info.dateOfBirth,
      ordrenummer: orderId,
      tickettype: ticketType,
    }));

    await saveOrderToSupabase(orderData);
    // Kalder en funktion for at gemme dataene i Supabase, await sørger for vi venter til handlingen er fuldført
    onNext({ ...bookingData, orderId });
    // Kalder onNext callback for at navigere til det næste trin i betalingsprocessen.
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setCardNumber(value);
  };
  // Fjerner ikke-cifrede tegn fra kortnummeret.

  const handleCardNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-ZæøåÆØÅ\s]/g, "");
    setCardName(value);
  };
  // Tillader kun bogstaver og mellemrum i navnet.

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 4) {
      value = value.slice(0, 4);
    }

    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }

    setExpiry(value);
  };
  // Formaterer udløbsdatoen som MM/YY.

  const handleCvcChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setCvc(value);
  };
  // handleCvcChange: Fjerner ikke-cifrede tegn fra CVC.

  return (
    <div className="grid grid-cols-gridContent">
      <div className="pt-8 pb-16 col-start-3 gap-3 flex flex-wrap items-center justify-center">
        <div className="bg-secondaryBgColor rounded-lg p-8 shadow-md shadow-primaryColor w-full max-w-md">
          <h2
            className={`${krona_one.className} large-size text-primaryTextColor mb-5`}
          >
            Betalingsside
          </h2>
          <div className="mb-6">
            <Cards
              number={cardNumber}
              name={cardName}
              expiry={expiry}
              cvc={cvc}
              focused={focused}
            />
            <form className="space-y-4 mt-5" noValidate>
              {/* Deaktiverer HTML5-formularvalidering. Bruger java-sript til manuelt og validere  */}
              <div>
                <label htmlFor="cardNumber" className="block small-size">
                  Kortnummer
                </label>
                <input
                  required
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  className="w-full p-2 bg-inputFieldColor text-bgColor rounded-lg focus:outline-none focus:ring-2 focus:ring-accentColor"
                  value={cardNumber}
                  // state variabel, indeholder den aktuelle værdi. Når den ændres, apdateres værdien automatisk og afspejler den nye værdi.
                  onChange={handleCardNumberChange}
                  // on-change = event-handler, udløses når værdien ændres of functionen handleCardnumberChange håndtere ændringerne
                  onFocus={(e) => setFocused(e.target.name)}
                  // Angiver en event-handler til at opdatere focused state-variablen, når feltet får fokus.

                  maxLength="16"
                  aria-label="Indtast kortnummer"
                />
              </div>
              <div>
                <label htmlFor="cardName" className="block small-size">
                  Navn på kortet
                </label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  className="w-full p-2 bg-inputFieldColor text-bgColor rounded-lg focus:outline-none focus:ring-2 focus:ring-accentColor"
                  value={cardName}
                  onChange={handleCardNameChange}
                  onFocus={(e) => setFocused(e.target.name)}
                  aria-label="Indtast navn på kortet"
                  required
                />
              </div>
              <div className="flex space-x-4">
                <div>
                  <label htmlFor="expiry" className="block small-size">
                    Udløbsdato (YY/MM)
                  </label>
                  <input
                    type="text"
                    id="expiry"
                    name="expiry"
                    className="w-full p-2 bg-inputFieldColor text-bgColor rounded-lg focus:outline-none focus:ring-2 focus:ring-accentColor"
                    value={expiry}
                    onChange={handleExpiryChange}
                    onFocus={(e) => setFocused(e.target.name)}
                    maxLength="5"
                    aria-label="Indtast udløbsdato (YY/MM)"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cvc" className="block small-size">
                    CVC
                  </label>
                  <input
                    type="text"
                    id="cvc"
                    name="cvc"
                    className="w-full p-2 bg-inputFieldColor text-bgColor rounded-lg focus:outline-none focus:ring-2 focus:ring-accentColor"
                    value={cvc}
                    onChange={handleCvcChange}
                    onFocus={(e) => setFocused(e.target.name)}
                    maxLength="3"
                    aria-label="Indtast CVC"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-between pt-10">
                <button
                  onClick={onBack}
                  className="bg-bgColor border-2 rounded-lg border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                  aria-label="Tilbage"
                >
                  Tilbage
                </button>
                <button
                  onClick={handleCompletePurchase}
                  type="submit"
                  className="bg-bgColor border-2 rounded-lg border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                  aria-label="Gennemfør betaling"
                >
                  Gennemfør betaling
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
