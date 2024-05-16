import { useState, useEffect } from 'react';
import prices from '../backend/settings.js';

export default function PersonalForm({
  personalInfo,
  ticketQuantity,
  ticketType,
  campingOptions,
  onClick,
  onNext,
  onBack
}) {
  const [localPersonalInfo, setLocalPersonalInfo] = useState(personalInfo);

  useEffect(() => {
    if (localPersonalInfo.length === 0) {
      const initialInfo = Array.from({ length: ticketQuantity }, () => ({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        dateOfBirth: '',
        email: ''
      }));
      setLocalPersonalInfo(initialInfo);
    }
  }, [ticketQuantity]);

  const handleInputChange = (index, field, value) => {
    const newPersonalInfo = [...localPersonalInfo];
    newPersonalInfo[index] = { ...newPersonalInfo[index], [field]: value };
    setLocalPersonalInfo(newPersonalInfo);
  };

  const handlePhoneKeyPress = (e) => {
    const allowedChars = /^[0-9+]+$/;
    if (!allowedChars.test(e.key) && !e.ctrlKey && e.key !== 'Backspace') {
      e.preventDefault();
    }
  };

  const calculateTotalPrice = () => {
    const ticketPrice = ticketQuantity * (ticketType === 'regular' ? prices.regular : prices.vip);
    const addOnPrice = (
      (campingOptions.greenCamping ? prices.greenCamping : 0) +
      (campingOptions.twoPersonTent * prices.TwoPersonsTent) +
      (campingOptions.threePersonTent * prices.ThreePersonsTent)
    );
    return ticketPrice + addOnPrice + prices.fee;
  };

  useEffect(() => {
    const totalPrice = calculateTotalPrice();
    onClick({ personalInfo: localPersonalInfo, totalPrice: totalPrice });
  }, [localPersonalInfo, campingOptions]);

  const generateOrderId = () => {
    return 'ORD' + Math.floor(Math.random() * 1000000).toString();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const orderId = generateOrderId();
    const totalPrice = calculateTotalPrice();

    const orderData = localPersonalInfo.map(info => ({
      id: orderId,
      first_name: info.firstName,
      last_name: info.lastName,
      email: info.email,
      phone: info.phoneNumber,
      amount: ticketQuantity,
      birthday: info.dateOfBirth,
    }));

    onClick({
      personalInfo: localPersonalInfo,
      totalPrice: totalPrice,
      orderId: orderId
    });
    onNext(); 
  };

  const validateDateOfBirth = (date) => {
    const today = new Date();
    const birthDate = new Date(date);
    const age = today.getFullYear() - birthDate.getFullYear();
    const isFutureDate = birthDate > today;
    const isOlderThan100 = age > 100;
    return !(isFutureDate || isOlderThan100);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Personlig information</legend>
        {localPersonalInfo.map((info, index) => (
          <div key={index}>
            <h3>Ticket {index + 1} ({ticketType})</h3>
            <label>
              First name:
              <input
                type="text"
                value={info.firstName}
                aria-label={`First name for ticket ${index + 1}`}
                required
                pattern="^[A-Za-z]+$"
                title="First name must contain only letters."
                onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
              />
            </label>
            <label>
              Last name:
              <input
                type="text"
                value={info.lastName}
                aria-label={`Last name for ticket ${index + 1}`}
                required
                pattern="^[A-Za-z]+$"
                title="Last name must contain only letters."
                onChange={(e) => handleInputChange(index, 'lastName', e.target.value)}
              />
            </label>
            <label>
              Phone number:
              <input
                type="tel"
                value={info.phoneNumber}
                aria-label={`Phone number for ticket ${index + 1}`}
                required
                pattern="^\+\d+$"
                title="Phone number must start with a + and contain only numbers."
                onKeyPress={handlePhoneKeyPress}
                onChange={(e) => handleInputChange(index, 'phoneNumber', e.target.value)}
              />
            </label>
            <label>
              Date of birth:
              <input
                type="date"
                value={info.dateOfBirth}
                aria-label={`Date of birth for ticket ${index + 1}`}
                required
                min="1923-01-01"
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => {
                  if (validateDateOfBirth(e.target.value)) {
                    handleInputChange(index, 'dateOfBirth', e.target.value);
                  } else {
                    alert("Date of birth must be a valid date not in the future and less than 100 years ago.");
                  }
                }}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={info.email}
                aria-label={`Email for ticket ${index + 1}`}
                required
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                title="Email must be a valid email address."
                onChange={(e) => handleInputChange(index, 'email', e.target.value)}
              />
            </label>
          </div>
        ))}
      </fieldset>

      <fieldset>
        <legend>Kurvens indhold</legend>
        <p>{ticketType.charAt(0).toUpperCase() + ticketType.slice(1)} ticket x {ticketQuantity}</p>
        {campingOptions.selectedArea && (
          <p>Camping area: {campingOptions.selectedArea}</p>
        )}
        {campingOptions.twoPersonTent > 0 && (
          <p>2 person Tent x {campingOptions.twoPersonTent}</p>
        )}
        {campingOptions.threePersonTent > 0 && (
          <p>3 person Tent x {campingOptions.threePersonTent}</p>
        )}
        <p>Booking fee: {prices.fee} kr.</p>
        <h3>Total: {calculateTotalPrice()} kr.</h3>
      </fieldset>

      <div>
        <button type="button" onClick={onBack}>Back</button>
        <button type="submit" onClick={onNext}>Continue to Summary</button>
      </div>
    </form>
  );
}
