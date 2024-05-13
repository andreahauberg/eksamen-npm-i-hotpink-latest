"use client";
import { useState } from 'react';
import Tickets from '../../components/backend/Tickets';
import Camping from '../../components/backend/Camping';
import PersonalForm from '../../components/backend/PersonalForm';
import Payment from '../../components/backend/Payment';

export default function BookingPage() {
    const [step, setStep] = useState(1);
    const [bookingData, setBookingData] = useState({
        tickets: [],
        camping: {},
        personalInfo: {}
    });

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleBookingChange = (data) => {
        setBookingData({ ...bookingData, ...data });
    };

    return (
        <div>
            {step === 1 && <Tickets onChange={handleBookingChange} onNext={nextStep} />}
            {step === 2 && <Camping onChange={handleBookingChange} onNext={nextStep} onBack={prevStep} />}
            {step === 3 && <PersonalForm onChange={handleBookingChange} onNext={nextStep} onBack={prevStep} />}
            {step === 4 && <Payment data={bookingData} onBack={prevStep} />}
        </div>
    );
}
