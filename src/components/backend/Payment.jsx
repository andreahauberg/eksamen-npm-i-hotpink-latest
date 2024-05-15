// const confirmReservation = async () => {
//     const res = await fetch('/api/reservations', {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ area: bookingData.camping.area, amount: bookingData.tickets.length })
//     });

//     const data = await res.json();
//     if (data.id) {
//         // Gennemfør reservationen
//         const confirmRes = await fetch('/api/reservations', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ id: data.id })
//         });

//         const confirmData = await confirmRes.json();
//         if (confirmData.success) {
//             // Reservation bekræftet
//             console.log('Reservation confirmed!');
//         }
//     }
// };


// export default function Checkout({ onCheckout }) {
//   return (
//     <button onClick={onCheckout}>Checkout</button>
//   );
// }


export default function PaymentPage({ onBack }) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl mb-6">Betalingsside</h1>
        <p className="mb-6">Her vil betalingsdetaljer blive indtastet.</p>
        <button
          onClick={onBack}
          className="bg-bgColor border-2 border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
        >
          Back
        </button>
      </div>
    );
  }
  