import { useState, useEffect } from "react";
import { Field, Label } from "@headlessui/react";
import clsx from "clsx";
import prices from "../backend/settings.js";
import { krona_one } from "@/app/fonts.jsx";
import CartSummary from "./CartSummary";

export default function PersonalForm({
  personalInfo,
  ticketQuantity,
  ticketType,
  campingOptions,
  onClick,
  onNext,
  onBack,
}) {
  const [localPersonalInfo, setLocalPersonalInfo] = useState(personalInfo);

  useEffect(() => {
    if (localPersonalInfo.length === 0) {
      const initialInfo = Array.from({ length: ticketQuantity }, () => ({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        dateOfBirth: "",
        email: "",
      }));
      setLocalPersonalInfo(initialInfo);
    }
  }, [ticketQuantity]);

  const handleInputChange = (index, field, value) => {
    const newPersonalInfo = [...localPersonalInfo];
    newPersonalInfo[index] = { ...newPersonalInfo[index], [field]: value };
    setLocalPersonalInfo(newPersonalInfo);
  };

  const handlePhoneKeyPress = (e) => {
    const allowedChars = /^[0-9+]+$/;
    if (!allowedChars.test(e.key) && !e.ctrlKey && e.key !== "Backspace") {
      e.preventDefault();
    }
  };

  const calculateTotalPrice = () => {
    const ticketPrice =
      ticketQuantity * (ticketType === "regular" ? prices.regular : prices.vip);
    const addOnPrice =
      (campingOptions.greenCamping ? prices.greenCamping : 0) +
      campingOptions.twoPersonTent * prices.TwoPersonsTent +
      campingOptions.threePersonTent * prices.ThreePersonsTent;
    return ticketPrice + addOnPrice + prices.fee;
  };

  useEffect(() => {
    const totalPrice = calculateTotalPrice();
    onClick({ personalInfo: localPersonalInfo, totalPrice: totalPrice });
  }, [localPersonalInfo, campingOptions]);

  const generateOrderId = () => {
    return "ORD" + Math.floor(Math.random() * 1000000).toString();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const orderId = generateOrderId();
    const totalPrice = calculateTotalPrice();

    const orderData = localPersonalInfo.map((info) => ({
      id: orderId,
      first_name: info.firstName,
      last_name: info.lastName,
      email: info.email,
      phone: info.phoneNumber,
      amount: ticketQuantity,
      birthday: info.dateOfBirth,
    }));

    onClick({
      personalInfo: localPersonalInfo,
      totalPrice: totalPrice,
      orderId: orderId,
    });
    onNext();
  };

  const validateDateOfBirth = (date) => {
    const today = new Date();
    const birthDate = new Date(date);
    const age = today.getFullYear() - birthDate.getFullYear();
    const isFutureDate = birthDate > today;
    const isOlderThan100 = age > 100;
    return !(isFutureDate || isOlderThan100);
  };

  return (
    <div className="grid grid-cols-gridContent">
      <div className="pt-8 pb-16 col-start-3 gap-3 flex flex-wrap items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-secondaryBgColor rounded-lg p-8 shadow-md shadow-primaryColor w-full max-w-md"
        >
          <fieldset className="space-y-6">
            <legend
              className={`${krona_one.className} large-size text-primaryTextColor`}
            >
              Personlig information
            </legend>
            {localPersonalInfo.map((info, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-lg font-semibold text-secondaryTextColor">
                  Ticket {index + 1} ({ticketType})
                </h3>

                <Field className="space-y-2">
                  <Label htmlFor={`firstName-${index}`}>First name:</Label>
                  <input
                    id={`firstName-${index}`}
                    type="text"
                    value={info.firstName}
                    className="w-full p-2 bg-inputFieldColor text-bgColor rounded-lg focus:outline-none focus:ring-2 focus:ring-accentColor"
                    aria-label={`First name for ticket ${index + 1}`}
                    required
                    pattern="^[A-Za-z]+$"
                    title="First name must contain only letters."
                    onChange={(e) =>
                      handleInputChange(index, "firstName", e.target.value)
                    }
                  />
                </Field>

                <Field className="space-y-2">
                  <Label htmlFor={`lastName-${index}`}>Last name:</Label>
                  <input
                    id={`lastName-${index}`}
                    type="text"
                    value={info.lastName}
                    className="w-full p-2 bg-inputFieldColor text-bgColor rounded-lg focus:outline-none focus:ring-2 focus:ring-accentColor"
                    aria-label={`Last name for ticket ${index + 1}`}
                    required
                    pattern="^[A-Za-z]+$"
                    title="Last name must contain only letters."
                    onChange={(e) =>
                      handleInputChange(index, "lastName", e.target.value)
                    }
                  />
                </Field>

                <Field className="space-y-2">
                  <Label htmlFor={`phoneNumber-${index}`}>Phone number:</Label>
                  <input
                    id={`phoneNumber-${index}`}
                    type="tel"
                    value={info.phoneNumber}
                    className="w-full p-2 border bg-inputFieldColor text-bgColor rounded-lg focus:outline-none focus:ring-2 focus:ring-accentColor"
                    aria-label={`Phone number for ticket ${index + 1}`}
                    required
                    pattern="^\+\d+$"
                    title="Phone number must start with a + and contain only numbers."
                    onKeyPress={handlePhoneKeyPress}
                    onChange={(e) =>
                      handleInputChange(index, "phoneNumber", e.target.value)
                    }
                  />
                </Field>

                <Field className="space-y-2">
                  <Label htmlFor={`dateOfBirth-${index}`}>Date of birth:</Label>
                  <input
                    id={`dateOfBirth-${index}`}
                    type="date"
                    value={info.dateOfBirth}
                    className="w-full p-2 bg-inputFieldColor text-bgColor rounded-lg focus:outline-none focus:ring-2 focus:ring-accentColor"
                    aria-label={`Date of birth for ticket ${index + 1}`}
                    required
                    min="1923-01-01"
                    max={new Date().toISOString().split("T")[0]}
                    onChange={(e) => {
                      if (validateDateOfBirth(e.target.value)) {
                        handleInputChange(index, "dateOfBirth", e.target.value);
                      } else {
                        alert(
                          "Date of birth must be a valid date not in the future and less than 100 years ago."
                        );
                      }
                    }}
                  />
                </Field>

                <Field className="space-y-2">
                  <Label htmlFor={`email-${index}`}>Email:</Label>
                  <input
                    id={`email-${index}`}
                    type="email"
                    value={info.email}
                    className="w-full p-2 bg-inputFieldColor text-bgColor rounded-lg focus:outline-none focus:ring-2 focus:ring-accentColor"
                    aria-label={`Email for ticket ${index + 1}`}
                    required
                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                    title="Email must be a valid email address."
                    onChange={(e) =>
                      handleInputChange(index, "email", e.target.value)
                    }
                  />
                </Field>
              </div>
            ))}
          </fieldset>

          {/* <fieldset className="space-y-6 mt-8">
            <legend className="text-primaryTextColor">Kurvens indhold</legend>
            <p>
              {ticketType.charAt(0).toUpperCase() + ticketType.slice(1)} ticket
              x {ticketQuantity}
            </p>
            {campingOptions.selectedArea && (
              <p>Camping area: {campingOptions.selectedArea}</p>
            )}
            {campingOptions.twoPersonTent > 0 && (
              <p>2 person Tent x {campingOptions.twoPersonTent}</p>
            )}
            {campingOptions.threePersonTent > 0 && (
              <p>3 person Tent x {campingOptions.threePersonTent}</p>
            )}
            <p>Booking fee: {prices.fee} kr.</p>
            <h3>Total: {calculateTotalPrice()} kr.</h3>
          </fieldset> */}

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={onBack}
              className="bg-bgColor border-2 rounded-lg border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-bgColor border-2 rounded-lg border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
            >
              Continue to Summary
            </button>
          </div>
        </form>
        <div className=" flex items-center justify-center w-full max-w-md md:w-44">
          <CartSummary
            ticketType={ticketType}
            ticketQuantity={ticketQuantity}
            campingOptions={campingOptions}
          />
        </div>
      </div>
    </div>
  );
}
