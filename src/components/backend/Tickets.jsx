import { useState, useEffect } from 'react';
import prices from '../backend/settings.js';

export default function TicketsForm({ ticketType, ticketQuantity, onClick, onNext }) {
  const [localTicketType, setLocalTicketType] = useState(ticketType);
  const [localQuantity, setLocalQuantity] = useState(ticketQuantity);
  const [localTotalPrice, setLocalTotalPrice] = useState(0);

  useEffect(() => {
    const updatePrice = () => {
      const pricePerTicket = localTicketType === 'regular' ? prices.regular : prices.vip;
      setLocalTotalPrice(localQuantity * pricePerTicket);
    };
    updatePrice();
  }, [localTicketType, localQuantity]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onClick({ ticketType: localTicketType, ticketQuantity: localQuantity });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Vælg billettype</legend>
        <div>
          <label>
            <input
              type="radio"
              value="regular"
              checked={localTicketType === 'regular'}
              onChange={() => setLocalTicketType('regular')}
            />
            <span>Regular {prices.regular} kr.</span>
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="vip"
              checked={localTicketType === 'vip'}
              onChange={() => setLocalTicketType('vip')}
            />
            <span>VIP {prices.vip} kr.</span>
          </label>
        </div>

        <div>
          <label>
            Antal billetter:
            <input
              type="number"
              value={localQuantity}
              min="1"
              onChange={(e) => setLocalQuantity(parseInt(e.target.value, 10))}
            />
          </label>
        </div>
        <div>Total Price for Tickets: {localTotalPrice} kr.</div>
        <button type="submit">Køb billetter</button>
      </fieldset>
    </form>
  );
}
