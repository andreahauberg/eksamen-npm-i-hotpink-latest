import { useState, useEffect } from "react";
import prices from "../backend/settings.js";

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
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <fieldset className="space-y-6">
          <legend className="text-3xl font-bold mb-4">Vælg billettype</legend>
          <div className="flex items-center">
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
          <div className="flex items-center">
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
          <div className="flex flex-col">
            <label className="mb-2">
              Antal billetter:
              <input
                type="number"
                value={localQuantity}
                min="1"
                onChange={(e) => setLocalQuantity(parseInt(e.target.value, 10))}
                className="form-input mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-pink-500 focus:bg-gray-800 focus:ring-0"
              />
            </label>
          </div>
          <div className="text-lg font-bold">
            Total Price for Tickets: {localTotalPrice} kr.
          </div>
          <button
            type="submit"
            className="bg-pink-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-pink-700 transition"
          >
            Køb billetter
          </button>
        </fieldset>
      </form>
    </div>
  );
}
