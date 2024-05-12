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
