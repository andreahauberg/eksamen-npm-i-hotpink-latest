// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import Button from "@/components/globals/Button";

// function BasketTimer({ step, onTimeExpired }) {
//   const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutter i sekunder
//   const [popup, setPopup] = useState(false);

//   useEffect(() => {
//     if (step < 3) return; 

//     if (timeLeft <= 0) {
//       setPopup(true);
//       onTimeExpired();
//       return;
//     }

//     const timerId = setInterval(() => {
//       setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
//     }, 1000);

//     return () => clearInterval(timerId);
//   }, [timeLeft, step, onTimeExpired]);

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
//   };

//   return (
//     <>
//       {step >= 3 && (
//         <div className="relative">
//           <h1 className="text-2xl font-bold">Time Left: {formatTime(timeLeft)}</h1>
//           {popup && (
//             <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
//               <div className="absolute inset-0 backdrop-blur-sm"></div>
//               <div className="relative bg-gray-800 rounded-lg p-8 shadow-md shadow-primaryColor text-center max-w-md mx-auto text-white">
//                 <h2 className="text-xl font-bold mb-4">Your session has expired</h2>
//                 <p className="mb-4">
//                   The time limit has exceeded. You can choose to resume to try again or restart to start over your reservation.
//                 </p>
//                 <div className="flex justify-between mt-4 space-x-4">
//                   <button
//                     onClick={() => setPopup(false)}
//                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//                   >
//                     Resume
//                   </button>
//                   <Link href="/booking/page" passHref>
//                     <Button title="Start Over" />
//                   </Link>
//                   <Link href="/" passHref>
//                     <Button title="Go to Home" />
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </>
//   );
// }

// export default BasketTimer;
