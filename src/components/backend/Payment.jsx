import { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { fetchAPI, saveOrderToSupabase } from "../../app/api/api.js";
import { krona_one } from "@/app/fonts.jsx";


export default function Payment({ bookingData, onNext, onBack }) {
  const {
    reservationId,
    personalInfo,
    ticketQuantity,
    ticketType,
    orderId,
    totalPrice,
  } = bookingData;

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focused, setFocused] = useState("");

  const handleCompletePurchase = async () => {
    try {
      console.log("Reservations ID: // ordrenummer", reservationId);

      await fetchAPI("/fullfill-reservation", {
        method: "POST",
        body: JSON.stringify({ id: reservationId }),
      });

      console.log("Betalingen er gennemført:", reservationId);

      const orderData = personalInfo.map((info) => ({
        first_name: info.firstName,
        last_name: info.lastName,
        amount: ticketQuantity,
        email: info.email,
        phone: info.phoneNumber,
        birthday: info.dateOfBirth,
        ordrenummer: orderId, 
        tickettype: ticketType,
      }));

      console.log("Gemt i databasen (Supabase)", orderData);

      await saveOrderToSupabase(orderData);

      onNext({ ...bookingData, orderId });
    } catch (error) {
      console.error("Der opstod en fejl", error);
    }
  };

  return (
    <div className="grid grid-cols-gridContent">
      <div className="pt-8 pb-16 col-start-3 gap-3 flex flex-wrap items-center justify-center">
        <div className="bg-secondaryBgColor rounded-lg p-8 shadow-md shadow-primaryColor w-full max-w-md">
          <h1
            className={`${krona_one.className} large-size text-primaryTextColor mb-5`}
          >
            Betalingsside
          </h1>
          <div className="mb-6">
            <Cards
              number={cardNumber}
              name={cardName}
              expiry={expiry}
              cvc={cvc}
              focused={focused}
            />
            <form className="space-y-4 mt-5">
              <div>
                <label htmlFor="cardNumber" className="block small-size">
                  Kortnummer
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  className="w-full p-2 bg-inputFieldColor text-bgColor rounded-lg focus:outline-none focus:ring-2 focus:ring-accentColor"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  onFocus={(e) => setFocused(e.target.name)}
                  maxLength="16"
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
                  onChange={(e) => setCardName(e.target.value)}
                  onFocus={(e) => setFocused(e.target.name)}
                />
              </div>
              <div className="flex space-x-4">
                <div>
                  <label htmlFor="expiry" className="block small-size">
                    Udløbsdato
                  </label>
                  <input
                    type="text"
                    id="expiry"
                    name="expiry"
                    className="w-full p-2 bg-inputFieldColor text-bgColor rounded-lg focus:outline-none focus:ring-2 focus:ring-accentColor"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    onFocus={(e) => setFocused(e.target.name)}
                    maxLength="4"
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
                    onChange={(e) => setCvc(e.target.value)}
                    onFocus={(e) => setFocused(e.target.name)}
                    maxLength="3"
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="flex justify-between">
            <button
              onClick={onBack}
              className="bg-bgColor border-2 rounded-lg border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
            >
              Tilbage
            </button>
            <button
              onClick={handleCompletePurchase}
              className="bg-bgColor border-2 rounded-lg border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
            >
              Færdiggør betalting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
