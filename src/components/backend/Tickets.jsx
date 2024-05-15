import { useState, useEffect } from "react";
import prices from "../backend/settings.js";
import { krona_one } from "@/app/fonts.jsx";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

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
    { name: "Regular", price: prices.regular },
    { name: "VIP", price: prices.vip },
  ];

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
          <RadioGroup
            value={localTicketType}
            onChange={setLocalTicketType}
            className="space-y-6"
          >
            {ticketOptions.map((option) => (
              <RadioGroup.Option
                key={option.name}
                value={option.name.toLowerCase()}
                className="group relative flex cursor-pointer bg-bgColor py-4 px-5 text-white shadow-md transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
              >
                {({ checked }) => (
                  <div className="flex w-full items-center justify-between">
                    <div className="small-size">
                      <p className=" text-primaryTextColor">
                        {option.name} {option.price} kr.
                      </p>
                    </div>
                    {checked && (
                      <CheckCircleIcon className="size-7 fill-accentColor " />
                    )}
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          </RadioGroup>
          <div className="flex flex-col small-size">
            <label className="mb-2">
              Antal billetter:
              <input
                type="number"
                value={localQuantity}
                min="1"
                onChange={(e) => setLocalQuantity(parseInt(e.target.value, 10))}
                className="form-input mt-1 block w-24  bg-inputFieldColor text-bgColor py-2 px-5  focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
              />
            </label>
          </div>
          <div className="normal-size">
            Total pris for billetter: {localTotalPrice} kr.
          </div>
          <button
            type="submit"
            className=" bg-bgColor border-2 border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2  focus:ring-offset-1 focus:ring-accentColor"
          >
            Køb billetter
          </button>
        </fieldset>
      </form>
    </div>
  );
}
