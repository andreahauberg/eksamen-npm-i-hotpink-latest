"use client";
import { useState } from "react";
import TicketsForm from "../../components/backend/Tickets";
import Camping from "../../components/backend/Camping";
import PersonalForm from "../../components/backend/PersonalForm";
import SummaryPage from "../../components/backend/Summary";
import PaymentPage from "../../components/backend/Payment";
import ConfirmationPage from "../../components/backend/Confirmation";
import ProgressBar from "../../components/backend/ProgressBar";

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    ticketType: "regular", // Default value
    ticketQuantity: 1,
    camping: {},
    personalInfo: [],
    totalPrice: 0,
    orderId: "",
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleBookingChange = (data) => {
    console.log(data);
    setBookingData((prevData) => ({ ...prevData, ...data }));
  };

  return (
    <div>
      {step < 6 && <ProgressBar currentStep={step} />}
      {step === 1 && (
        <TicketsForm
          ticketType={bookingData.ticketType}
          ticketQuantity={bookingData.ticketQuantity}
          onClick={handleBookingChange}
          onNext={nextStep}
        />
      )}
      {step === 2 && (
        <Camping
          ticketQuantity={bookingData.ticketQuantity}
          ticketType={bookingData.ticketType}
          campingOptions={bookingData.camping}
          onClick={handleBookingChange}
          //updateBasket
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {step === 3 && (
        <PersonalForm
          personalInfo={bookingData.personalInfo}
          ticketQuantity={bookingData.ticketQuantity}
          ticketType={bookingData.ticketType}
          campingOptions={bookingData.camping}
          totalPrice={bookingData.totalPrice}
          onClick={handleBookingChange}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {step === 4 && (
        <SummaryPage
          bookingData={bookingData}
          onBack={prevStep}
          onNext={nextStep}
        />
      )}
      {step === 5 && (
        <PaymentPage
          bookingData={bookingData}
          onBack={prevStep}
          onNext={nextStep}
        />
      )}
      {step === 6 && <ConfirmationPage bookingData={bookingData} />}
    </div>
  );
}
