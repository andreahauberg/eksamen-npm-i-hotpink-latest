export default function SummaryPage({ bookingData, onBack, onNext }) {
    const { ticketType, ticketQuantity, personalInfo, camping, totalPrice } = bookingData;
  
    return (
      <div className="min-h-screen text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl mb-6">Opsummering</h1>
        <div className="mb-6">
          <h2 className="text-2xl mb-4">Billetter</h2>
          <p>{ticketType.charAt(0).toUpperCase() + ticketType.slice(1)} ticket x {ticketQuantity}</p>
          <h2 className="text-2xl mb-4">Camping</h2>
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
          <h2 className="text-2xl mb-4">Personlige oplysninger</h2>
          {personalInfo.map((info, index) => (
            <div key={index}>
              <h3 className="text-xl">Ticket {index + 1}</h3>
              <p>First name: {info.firstName}</p>
              <p>Last name: {info.lastName}</p>
              <p>Phone number: {info.phoneNumber}</p>
              <p>Date of birth: {info.dateOfBirth}</p>
              <p>Email: {info.email}</p>
            </div>
          ))}
          <h2 className="text-2xl mb-4">Pris</h2>
          <p>Total: {totalPrice} kr.</p>
  
        </div>
        <div>
          <button
            onClick={onBack}
            className="bg-bgColor border-2 border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
          >
            Back
          </button>
          <button
            onClick={onNext}
            className="bg-bgColor border-2 border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor ml-4"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    );
  }
  