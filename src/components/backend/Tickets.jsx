import { useState } from 'react';

export default function Tickets({ onSelect }) {
  const [ticketType, setTicketType] = useState('regular');
  const [quantity, setQuantity] = useState(1);

  return (
    <div>
      <h2>Choose your ticket type:</h2>
      <select value={ticketType} onChange={(e) => setTicketType(e.target.value)}>
        <option value="regular">Regular - 799,-</option>
        <option value="vip">VIP - 1299,-</option>
      </select>
      <input type="number" value={quantity} min="1" onChange={(e) => setQuantity(e.target.value)} />
      <button onClick={() => onSelect(ticketType, quantity)}>Select Tickets</button>
    </div>
  );
}
