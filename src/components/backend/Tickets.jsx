import { useState } from 'react';
import prices from '../backend/settings.js';

export default function TicketsForm({ onSelect }) {
  const [ticketType, setTicketType] = useState('regular');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();  
    onSelect(ticketType, quantity);  
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Vælg billettype</legend>
        <h1>Regular</h1>
        <div>
          <label>
            <input
              type="radio"
              value="regular"
              checked={ticketType === 'regular'}
              onChange={() => setTicketType('regular')}
            />
            <p>{prices.regular}</p>
          </label>
          <label>
          <h1>VIP</h1>
            <input
              type="radio"
              value="vip"
              checked={ticketType === 'vip'}
              onChange={() => setTicketType('vip')}
            />
            <p>{prices.vip}</p>
       
          </label>
        </div>

        <div>
          <label>
            Antal billetter:
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            />
          </label>
        </div>
        <div>
          +Fee {prices.fee}
        </div>

        <button type="submit">Vælg billetter</button>
      </fieldset>
    </form>
  );
}