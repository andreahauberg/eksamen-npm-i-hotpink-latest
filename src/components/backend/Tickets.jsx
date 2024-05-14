import { useState, useEffect } from "react";
import prices from "../backend/settings.js";
import { krona_one } from "@/app/fonts.jsx";

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

  return (
    <div className="min-h-screen text-white flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className=" bg-secondaryBgColor p-8 shadow-md w-full max-w-md"
      >
        <fieldset className="space-y-6">
          <legend
            className={`${krona_one.className} large-size mb-6 text-primaryTextColor`}
          >
            Vælg billettype
          </legend>
          <div className="flex items-center small-size">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="regular"
                checked={localTicketType === "regular"}
                onChange={() => setLocalTicketType("regular")}
                className="form-radio text-pink-500"
              />
              <span>Regular {prices.regular} kr.</span>
            </label>
          </div>
          <div className="flex items-center small-size">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="vip"
                checked={localTicketType === "vip"}
                onChange={() => setLocalTicketType("vip")}
                className="form-radio text-pink-500"
              />
              <span>VIP {prices.vip} kr.</span>
            </label>
          </div>
          <div className="flex flex-col small-size">
            <label className="mb-2">
              Antal billetter:
              <input
                type="number"
                value={localQuantity}
                min="1"
                onChange={(e) => setLocalQuantity(parseInt(e.target.value, 10))}
                className="form-input mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-pink-500 focus:bg-gray-800 focus:ring-0 small-size"
              />
            </label>
          </div>
          <div className="normal-size">
            Total Price for Tickets: {localTotalPrice} kr.
          </div>
          <button
            type="submit"
            className=" bg-bgColor border-2 border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accentColor"
          >
            Køb billetter
          </button>
        </fieldset>
      </form>
    </div>
  );
}
