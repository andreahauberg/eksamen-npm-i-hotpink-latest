import React from "react";
import prices from "../backend/settings.js";

function calculateTotalPrice(ticketQuantity, ticketType, campingOptions) {
  const ticketPrice =
    ticketQuantity * (ticketType === "regular" ? prices.regular : prices.vip);
  const addOnPrice =
    (campingOptions.greenCamping ? prices.greenCamping : 0) +
    campingOptions.twoPersonTent * prices.TwoPersonsTent +
    campingOptions.threePersonTent * prices.ThreePersonsTent;
  return ticketPrice + addOnPrice + prices.fee;
}

export default function CartSummary({
  ticketType,
  ticketQuantity,
  campingOptions,
}) {
  return (
    <aside className="bg-secondaryBgColor rounded-lg p-4 shadow-md shadow-primaryColor w-full max-w-md">
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-primaryTextColor">
          Kurvens indhold
        </legend>
        <p>
          {ticketType.charAt(0).toUpperCase() + ticketType.slice(1)} billet x{" "}
          {ticketQuantity}
        </p>
        {campingOptions.selectedArea && (
          <p>Campingområde: {campingOptions.selectedArea}</p>
        )}
        {campingOptions.twoPersonTent > 0 && (
          <p>2 personers telt x {campingOptions.twoPersonTent}</p>
        )}
        {campingOptions.threePersonTent > 0 && (
          <p>3 personers telt x {campingOptions.threePersonTent}</p>
        )}
        <p>
          Booking gebyr: <br /> {prices.fee} kr.
        </p>
        <h3 className="text-lg font-bold">
          I alt:{" "}
          {calculateTotalPrice(ticketQuantity, ticketType, campingOptions)} DKK
        </h3>
      </fieldset>
    </aside>
  );
}
