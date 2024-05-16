import { krona_one } from "@/app/fonts.jsx";
export default function SummaryPage({ bookingData, onBack, onNext }) {
  const {
    ticketType,
    ticketQuantity,
    personalInfo,
    camping,
    totalPrice,
    orderId,
  } = bookingData;

  return (
    <div className="grid grid-cols-gridContent">
      <div className="pt-8 pb-16 col-start-3 gap-3 flex flex-wrap  items-center justify-center">
        <div className=" bg-secondaryBgColor rounded-lg p-8 shadow-md shadow-primaryColor">
          <h1
            className={`${krona_one.className} large-size text-primaryTextColor mb-3 text-center`}
          >
            Opsummering
          </h1>
          <div className="mb-6 space-y-4">
            <div>
              <h2 className="text-2xl mb-2">Ordrenummer</h2>
              <p>{orderId}</p>
            </div>
            <div>
              <h2 className="text-2xl mb-2">Billetter</h2>
              <p>
                {ticketType.charAt(0).toUpperCase() + ticketType.slice(1)}{" "}
                ticket x {ticketQuantity}
              </p>
            </div>
            <div>
              <h2 className="text-2xl mb-2">Camping</h2>
              {camping.selectedArea && (
                <p>Camping area: {camping.selectedArea}</p>
              )}
              {camping.greenCamping && (
                <p>Green Camping: {camping.greenCamping ? "Yes" : "No"}</p>
              )}
              {camping.twoPersonTent > 0 && (
                <p>2 person Tent x {camping.twoPersonTent}</p>
              )}
              {camping.threePersonTent > 0 && (
                <p>3 person Tent x {camping.threePersonTent}</p>
              )}
            </div>
            <div>
              <h2 className="text-2xl mb-2">Personlige oplysninger</h2>
              {personalInfo.map((info, index) => (
                <div key={index} className="mb-2">
                  <h3 className="text-xl">Ticket {index + 1}</h3>
                  <p>First name: {info.firstName}</p>
                  <p>Last name: {info.lastName}</p>
                  <p>Phone number: {info.phoneNumber}</p>
                  <p>Date of birth: {info.dateOfBirth}</p>
                  <p>Email: {info.email}</p>
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-2xl mb-2">Pris</h2>
              <p>Total: {totalPrice} kr.</p>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={onBack}
              className="bg-bgColor border-2 rounded-lg border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
            >
              Back
            </button>
            <button
              onClick={onNext}
              className="bg-bgColor border-2 rounded-lg border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor ml-4"
            >
              Continue to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
