"use client";
import { useState } from 'react';
import TicketsForm from '../../components/backend/Tickets';
import Camping from '../../components/backend/Camping';
import PersonalForm from '../../components/backend/PersonalForm';

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
            {step === 1 && <TicketsForm onSelect={handleBookingChange} onNext={nextStep} />}
            {step === 2 && <Camping onCampingOptionSelect={handleBookingChange} onNext={nextStep} onBack={prevStep} />}
            {step === 3 && <PersonalForm onSelect={handleBookingChange} onNext={nextStep} onBack={prevStep} />}
        </div>
    );
}
