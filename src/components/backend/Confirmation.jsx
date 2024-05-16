export default function ConfirmationPage({ bookingData }) {
    const { orderId, personalInfo, totalPrice } = bookingData;

    return (
      <div className="min-h-screen text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl mb-6">Ordrebekræftelse</h1>
        <p>Tak for dit køb! Dit ordrenummer er {orderId}.</p>
        <div className="mb-6">
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
          <h2 className="text-2xl mb-4">Total Pris</h2>
          <p>{totalPrice} kr.</p>
        </div>
      </div>
    );
  }
