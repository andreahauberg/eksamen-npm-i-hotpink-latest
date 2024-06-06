import { useState, useEffect } from "react";
import {
  Disclosure,
  DisclosurePanel,
  DisclosureButton,
  Field,
  Label,
  Description,
} from "@headlessui/react";
import clsx from "clsx";
import prices from "../backend/settings.js";
import { krona_one } from "@/app/fonts.jsx";
import CartSummary from "./CartSummary";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

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
  const [totalPrice, setTotalPrice] = useState(0);

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

  useEffect(() => {
    const ticketPrice =
      ticketQuantity * (ticketType === "regular" ? prices.regular : prices.vip);
    const addOnPrice =
      (campingOptions.greenCamping ? prices.greenCamping : 0) +
      campingOptions.twoPersonTent * prices.TwoPersonsTent +
      campingOptions.threePersonTent * prices.ThreePersonsTent;
    setTotalPrice(ticketPrice + addOnPrice + prices.fee);
  }, [ticketQuantity, ticketType, campingOptions]);

  const handleInputChange = (index, field, value) => {
    // Funktionen modtager tre parametre: index, field, og value.
    setLocalPersonalInfo((prev) => {
      // setLocalPersonalInfo bruges til at opdatere state-variablen localPersonalInfo. Funktionen tager en callback-funktion som argument, som modtager den tidligere state (prev) og returnerer den nye state.
      const newPersonalInfo = [...prev];
      // Her oprettes en kopi af den tidligere state (prev). Dette er vigtigt, fordi state i React er immutabel, hvilket betyder, at du ikke bør ændre den direkte.
      newPersonalInfo[index] = {
        ...newPersonalInfo[index],
        [field]: value,
        // Der laves en kopi af det element i newPersonalInfo-arrayet, der svarer til det givne index. Derefter opdateres feltet (field) i dette element med den nye værdi (value).
      };
      return newPersonalInfo;
      // Den opdaterede kopi af newPersonalInfo returneres og bliver den nye state.
    });
  };

  //ChatGpt prompt: Jeg arbejder på en React-komponent, hvor jeg har brug for hjælp til at implementere patterns i input felter. Kan du forklare, hvordan jeg kan tilføje patterns for at validere data som fornavn (kun bogstaver), efternavn (kun bogstaver), telefonnummer (starter med + og kun tal), og email (gyldig email format)? Jeg vil også gerne vide, hvordan jeg kan bruge ARIA-attributter for tilgængelighed.

  const handlePhoneKeyPress = (e) => {
    const allowedChars = /^[0-9+]+$/;
    if (!allowedChars.test(e.key) && !e.ctrlKey && e.key !== "Backspace") {
      e.preventDefault();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const orderData = localPersonalInfo.map((info) => ({
      first_name: info.firstName,
      last_name: info.lastName,
      email: info.email,
      phone: info.phoneNumber,
      amount: ticketQuantity,
      birthday: info.dateOfBirth,
      id: info.id,
    }));

    onClick({
      personalInfo: localPersonalInfo,
      totalPrice: totalPrice,
    });
    onNext();
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
              // mappes over arrayet, to argumenter gives til call back funktionen. Så hvor hvert element i localPersonalInfo genereres der en sektion
              <Disclosure key={index} defaultOpen={index === 0}>
                {/* key = unik nøgle og defaultOpen sørger for den første sektion er åben som standard */}
                {({ open }) => (
                  // render-prop dele kode mellem komponenter ved at bruge en prop, hvis værdi er en funktion. Funktionen tager open-tilstanden som argument og returnerer JSX-indholdet
                  <>
                    <div className="relative mb-2">
                      <DisclosureButton
                        className={clsx(
                          "w-full py-2 text-center small-size rounded-lg bg-bgColor text-primaryTextColor shadow focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor",
                          { "": open }
                        )}
                        aria-expanded={open}
                        // clsx til at tilføje CSS-klasser baseret på open-tilstanden. aria-expanded={open} og aria-controls={panel-${index}} er ARIA-attributter, der forbedrer tilgængeligheden ved at angive knaptilstand og kontrollere hvilket panel knappen er forbundet med.

                        //ChatGpt prompt: Jeg udvikler en formular i React og ønsker at forbedre tilgængeligheden ved at bruge ARIA-attributter. Kan du forklare, hvordan jeg kan tilføje ARIA labels for input felter som fornavn, efternavn, telefonnummer, fødselsdato, og email? Jeg vil gerne sikre, at skærmlæsere korrekt kan identificere hvert felt og dets formål.

                        aria-controls={`panel-${index}`}
                      >
                        Billet {index + 1} ({ticketType})
                      </DisclosureButton>
                      {open ? (
                        <ChevronUpIcon
                          className="pointer-events-none absolute top-2.5 right-2.5 size-5 fill-primaryTextColor"
                          aria-hidden="true"
                        />
                      ) : (
                        <ChevronDownIcon
                          className="pointer-events-none absolute top-2.5 right-2.5 size-5 fill-primaryTextColor"
                          aria-hidden="true"
                        />
                      )}
                      {/* ternary operator */}
                    </div>
                    <DisclosurePanel className="pb-2" id={`panel-${index}`}>
                      {/* matcher aria-controls attributten i DisclosureButton for at forbinde de to. */}
                      <div className="space-y-4">
                        <Field className="space-y-2">
                          <Label htmlFor={`firstName-${index}`}>Fornavn:</Label>
                          <input
                            id={`firstName-${index}`}
                            type="text"
                            value={info.firstName}
                            className="peer w-full p-2 bg-inputFieldColor text-bgColor rounded-lg focus:outline-none focus:ring-2 focus:ring-accentColor"
                            aria-label={`Fornavn for billet ${index + 1}`}
                            pattern="^[A-Za-zæøåÆØÅ ]+$"
                            title="Fornavn må kun indeholde bogstaver."
                            required
                            onChange={(e) =>
                              handleInputChange(
                                // hændelse der opdaterer localPersonalInfo via handleInputChange.
                                index,
                                "firstName",
                                e.target.value
                              )
                            }
                          />
                          <Description className="xsmall-size hidden peer-focus:block">
                            Fornavn må kun indeholde bogstaver
                          </Description>
                        </Field>

                        <Field className="space-y-2">
                          <Label htmlFor={`lastName-${index}`}>
                            Efternavn:
                          </Label>
                          <input
                            id={`lastName-${index}`}
                            type="text"
                            value={info.lastName}
                            className="peer w-full p-2 bg-inputFieldColor text-bgColor rounded-lg focus:outline-none focus:ring-2 focus:ring-accentColor"
                            aria-label={`Efternavn for billet ${index + 1}`}
                            pattern="^[A-Za-zæøåÆØÅ ]+$"
                            title="Efternavn må kun indeholde bogstaver."
                            required
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "lastName",
                                e.target.value
                              )
                            }
                          />
                          <Description className=" xsmall-size hidden peer-focus:block">
                            Efternavn må kun indeholde bogstaver
                          </Description>
                        </Field>

                        <Field className="space-y-2">
                          <Label htmlFor={`phoneNumber-${index}`}>
                            Telefonnummer:
                          </Label>
                          <input
                            id={`phoneNumber-${index}`}
                            type="tel"
                            value={info.phoneNumber}
                            className="peer w-full p-2 border bg-inputFieldColor text-bgColor rounded-lg focus:outline-none focus:ring-2 focus:ring-accentColor"
                            aria-label={`Telefonnummer for billet ${index + 1}`}
                            pattern="^\+\d+$"
                            title="Telefonnummeret skal starte med et + og kun indeholde tal."
                            onKeyPress={handlePhoneKeyPress}
                            required
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "phoneNumber",
                                e.target.value
                              )
                            }
                          />
                          <Description className=" xsmall-size hidden peer-focus:block">
                            Telefonnummeret skal starte med et + og kun
                            indeholde tal
                          </Description>
                        </Field>

                        <Field className="space-y-2">
                          <Label htmlFor={`dateOfBirth-${index}`}>
                            Fødselsdato:
                          </Label>
                          <input
                            id={`dateOfBirth-${index}`}
                            type="date"
                            value={info.dateOfBirth}
                            className="peer w-full p-2 bg-inputFieldColor text-bgColor rounded-lg focus:outline-none focus:ring-2 focus:ring-accentColor"
                            aria-label={`Fødselsdato for billet ${index + 1}`}
                            min="1923-01-01"
                            required
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "dateOfBirth",
                                e.target.value
                              )
                            }
                          />
                          <Description className="xsmall-size hidden peer-focus:block">
                            Du skal være mindst 18 år gammel
                          </Description>
                        </Field>

                        <Field className="space-y-2">
                          <Label htmlFor={`email-${index}`}>Email:</Label>
                          <input
                            id={`email-${index}`}
                            type="email"
                            value={info.email}
                            className="peer w-full p-2 bg-inputFieldColor text-bgColor rounded-lg focus:outline-none focus:ring-2 focus:ring-accentColor"
                            aria-label={`Email for billet ${index + 1}`}
                            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                            title="Email skal være en gyldig emailadresse."
                            required
                            onChange={(e) =>
                              handleInputChange(index, "email", e.target.value)
                            }
                          />
                          <Description className="xsmall-size hidden peer-focus:block">
                            Email skal være en gyldig emailadresse og indeholde
                            @
                          </Description>
                        </Field>
                      </div>
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            ))}
          </fieldset>

          <div className="flex justify-between mt-8">
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
              Forsæt
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center fixed w-full max-w-md md:w-44">
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
