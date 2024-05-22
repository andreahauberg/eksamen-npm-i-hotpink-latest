import { fetchAPI, saveOrderToSupabase } from "../../app/api/api.js";

export default function Payment({ bookingData, onNext, onBack }) {
  const {
    reservationId,
    personalInfo,
    ticketQuantity,
    ticketType,
    orderId,
    totalPrice,
  } = bookingData;

  const handleCompletePurchase = async () => {
    try {
      console.log("Reservations ID: // ordrenummer", reservationId);

      await fetchAPI("/fullfill-reservation", {
        method: "POST",
        body: JSON.stringify({ id: reservationId }),
      });

      console.log("Reservation fulfilled. ID:", reservationId);

      const orderData = personalInfo.map((info) => ({
        first_name: info.firstName,
        last_name: info.lastName,
        amount: ticketQuantity,
        email: info.email,
        phone: info.phoneNumber,
        birthday: info.dateOfBirth,
        ordrenummer: orderId, 
        tickettype: ticketType,
      }));

      console.log("Gemt i databasen (Supabase)", orderData);

      await saveOrderToSupabase(orderData);

      onNext({ ...bookingData, orderId });
    } catch (error) {
      console.error("Der opstod en fejl", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl mb-6">Betalingsside</h1>
      <p className="mb-6">Her vil betalingsdetaljer blive indtastet.</p>
      <div>
        <button
          onClick={onBack}
          className="bg-bgColor border-2 border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
        >
          Tilbage
        </button>
        <button
          onClick={handleCompletePurchase}
          className="bg-bgColor border-2 border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor ml-4"
        >
          Gennemfør Køb
        </button>
      </div>
    </div>
  );
}
