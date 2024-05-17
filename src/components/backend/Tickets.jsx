import { useState, useEffect } from "react";
import prices from "../backend/settings.js";
import { krona_one } from "@/app/fonts.jsx";
import {
  Select,
  RadioGroup,
  Field,
  Label,
  Description,
} from "@headlessui/react";
import { CheckCircleIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

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
    { name: "Partoutbillet", price: prices.regular },
    { name: "VIP-Partoutbillet", price: prices.vip },
  ];

  return (
    <div className=" grid grid-cols-gridContent ">
      <div className="pt-8 pb-16 col-start-3 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-secondaryBgColor p-8 rounded-lg shadow-md shadow-primaryColor w-full max-w-md"
        >
          <fieldset className="space-y-6">
            <legend
              className={`${krona_one.className} large-size mb-1 text-primaryTextColor`}
            >
              Vælg billettype
            </legend>
            <RadioGroup
              value={localTicketType}
              onChange={setLocalTicketType}
              className="space-y-6"
            >
              <RadioGroup.Label className="sr-only">
                Billettype
              </RadioGroup.Label>
              {ticketOptions.map((option) => (
                <RadioGroup.Option
                  key={option.name}
                  value={option.name.toLowerCase()}
                  className={({ active, checked }) =>
                    clsx(
                      "relative flex cursor-pointer rounded-lg bg-bgColor py-4 px-5 text-white shadow-md transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor",
                      {
                        "ring-2 ring-offset-2 ring-accentColor": active,
                        "bg-white/10": checked,
                      }
                    )
                  }
                >
                  {({ checked }) => (
                    <div className="flex w-full items-center justify-between">
                      <div className="small-size">
                        <p className="text-primaryTextColor">
                          {option.name} {option.price} kr.
                        </p>
                      </div>
                      {checked && (
                        <CheckCircleIcon className="size-7 fill-accentColor" />
                      )}
                    </div>
                  )}
                </RadioGroup.Option>
              ))}
            </RadioGroup>
            <Field className="flex flex-col small-size">
              <Label htmlFor="ticketQuantity" className="mb-1 font-bold">
                Vælg antal billetter:
              </Label>
              {/* <Description id="ticketQuantity-description" className="mb-1">
                Vælg antal billetter fra 1 til 10
              </Description> */}
              <div className="relative">
                <Select
                  id="ticketQuantity"
                  value={localQuantity}
                  onChange={(e) =>
                    setLocalQuantity(parseInt(e.target.value, 10))
                  }
                  className={clsx(
                    "mt-1 block w-28 appearance-none border-none rounded-lg bg-inputFieldColor text-bgColor py-2 px-5",
                    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accentColor"
                  )}
                  aria-describedby="ticketQuantity-description"
                  required
                >
                  {[...Array(10).keys()].map((i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </Select>
                <ChevronDownIcon
                  className="pointer-events-none absolute top-3.5 left-20 size-5 fill-bgColor"
                  aria-hidden="true"
                />
              </div>
            </Field>
            <div className="normal-size">
              Total pris for billetter: {localTotalPrice} kr.
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-bgColor rounded-lg border-2 border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
              >
                Køb billetter
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
