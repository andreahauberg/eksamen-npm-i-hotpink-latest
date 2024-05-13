import React, { useState, useMemo } from 'react';
import prices from './settings.js';

export default function Tickets({ onSelect }) {
  const [ticketType, setTicketType] = useState('regular');
  const [quantity, setQuantity] = useState(1);

  // Convert the input value to a number
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity >= 1 ? newQuantity : 1);
  };

  // Calculate the total using useMemo to optimize performance
  const total = useMemo(() => {
    return (prices[ticketType] * quantity) + (prices.fee * quantity);
  }, [ticketType, quantity]);


  return (
    <div>
      <h2>Choose your ticket type:</h2>
      <select value={ticketType} onChange={(e) => setTicketType(e.target.value)}>
        <option value="regular">{prices.regular}-</option>
        <option value="vip">{prices.vip}</option>
      </select>
      <input
        type="number"
        value={quantity}
        min="1"
        onChange={handleQuantityChange}
      />
      <button onClick={() => onSelect(ticketType, quantity)}>Select Tickets</button>
    </div>
  );
}
