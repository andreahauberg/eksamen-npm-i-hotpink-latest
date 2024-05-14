"use client";
import { useState, useEffect } from 'react';
import TicketsForm from '../../components/backend/Tickets';
import Camping from '../../components/backend/Camping';
import PersonalForm from '../../components/backend/PersonalForm';
import prices from '../../components/backend/settings.js';

export default function BookingPage() {
    const [step, setStep] = useState(1);
    const [bookingData, setBookingData] = useState({
        ticketType: 'regular',
        ticketQuantity: 1,
        camping: {},
        personalInfo: {}
    });
    const [totalPrice, setTotalPrice] = useState(0);

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleBookingChange = (data) => {
        setBookingData(prevData => ({ ...prevData, ...data }));
    };

    useEffect(() => {
        const calculateTotalPrice = () => {
            let total = prices.fee;
            total += bookingData.ticketQuantity * (bookingData.ticketType === 'regular' ? prices.regular : prices.vip);
            total += bookingData.camping.greenCamping ? prices.greenCamping : 0;
            total += (bookingData.camping.twoPersonTent || 0) * prices.TwoPersonsTent;
            total += (bookingData.camping.threePersonTent || 0) * prices.ThreePersonsTent;
            setTotalPrice(total);
        };
        calculateTotalPrice();
    }, [bookingData]);

    return (
        <div>
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
                    campingOptions={bookingData.camping}
                    onClick={handleBookingChange}
                    onNext={nextStep}
                    onBack={prevStep}
                />
            )}
            {step === 3 && (
                <PersonalForm
                    personalInfo={bookingData.personalInfo}
                    onClick={handleBookingChange}
                    onNext={nextStep}
                    onBack={prevStep}
                />
            )}
        </div>
    );
}
