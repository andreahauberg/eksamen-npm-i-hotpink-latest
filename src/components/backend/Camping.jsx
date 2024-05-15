import { useState, useEffect } from 'react';
import prices from '../backend/settings.js';
import { fetchAPI, fetchDatabase } from '../../app/api/api.js';

export default function Camping({ ticketQuantity, ticketType, campingOptions, onClick, onNext, onBack }) {
  const [greenCamping, setGreenCamping] = useState(campingOptions.greenCamping || false);
  const [twoPersonTent, setTwoPersonTent] = useState(campingOptions.twoPersonTent || 0);
  const [threePersonTent, setThreePersonTent] = useState(campingOptions.threePersonTent || 0);
  const [campingAreas, setCampingAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(campingOptions.selectedArea || '');
  const [totalPrice, setTotalPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadCampingAreas = async () => {
      try {
        const data = await fetchAPI('/available-spots');
        setCampingAreas(data);
      } catch (error) {
        console.error('Error loading camping areas:', error);
      }
    };
    loadCampingAreas();
  }, []);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const ticketPrice = ticketQuantity * (ticketType === 'regular' ? prices.regular : prices.vip);
      let addOnPrice = 0;
      addOnPrice += greenCamping ? prices.greenCamping : 0;
      addOnPrice += twoPersonTent * prices.TwoPersonsTent;
      addOnPrice += threePersonTent * prices.ThreePersonsTent;
      setTotalPrice(ticketPrice + addOnPrice);
    };
    calculateTotalPrice();
  }, [ticketQuantity, ticketType, greenCamping, twoPersonTent, threePersonTent]);

  useEffect(() => {
    onClick({ camping: { greenCamping, twoPersonTent, threePersonTent, selectedArea } });
  }, [greenCamping, twoPersonTent, threePersonTent, selectedArea]);

  const handleQuantityChange = (type, increment) => {
    if (type === 'twoPersonTent') {
      setTwoPersonTent(prev => {
        const newQuantity = Math.max(0, prev + increment);
        const totalTents = newQuantity + threePersonTent;
        return totalTents <= ticketQuantity ? newQuantity : prev;
      });
    } else if (type === 'threePersonTent') {
      setThreePersonTent(prev => {
        const newQuantity = Math.max(0, prev + increment);
        const totalTents = twoPersonTent + newQuantity;
        return totalTents <= ticketQuantity ? newQuantity : prev;
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (twoPersonTent + threePersonTent === 0) {
      setErrorMessage('Du skal vælge telt, inden du kan gå videre.');
      return;
    }

    try {
     
      const reservation = await fetchAPI('/reserve-spot', {
        method: 'PUT',
        body: JSON.stringify({
          area: selectedArea,
          amount: ticketQuantity,
        }),
      });


      await fetchAPI('/fullfill-reservation', {
        method: 'POST',
        body: JSON.stringify({
          id: reservation.id,
        }),
      });


      const bookingData = {
        area: selectedArea,
        ticketQuantity,
        ticketType,
        greenCamping,
        twoPersonTent,
        threePersonTent,
        totalPrice,
        reservationId: reservation.id,
      };

      await fetchDatabase('/foofest_info', {
        method: 'POST',
        body: JSON.stringify(bookingData),
      });

      onNext();
    } catch (error) {
      console.error('Error reserving spot:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Add-on</legend>
        <p>Note: The price includes the crew setting up your tent</p>
        
        <div>
          <label>2 person Tent</label>
          <div>
            <button type="button" onClick={() => handleQuantityChange('twoPersonTent', -1)} aria-label="Decrease 2 person tent quantity">-</button>
            <span>{twoPersonTent}</span>
            <button type="button" onClick={() => handleQuantityChange('twoPersonTent', 1)} aria-label="Increase 2 person tent quantity">+</button>
            <p>{prices.TwoPersonsTent} kr.</p>
          </div>
        </div>
        
        <div>
          <label>3 person Tent</label>
          <div>
            <button type="button" onClick={() => handleQuantityChange('threePersonTent', -1)} aria-label="Decrease 3 person tent quantity">-</button>
            <span>{threePersonTent}</span>
            <button type="button" onClick={() => handleQuantityChange('threePersonTent', 1)} aria-label="Increase 3 person tent quantity">+</button>
            <p>{prices.ThreePersonsTent} kr.</p>
          </div>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={greenCamping}
              onChange={(e) => setGreenCamping(e.target.checked)}
              aria-label="Green camping"
            />
            Green camping {prices.greenCamping} kr.
          </label>
        </div>

        <div>
          <label>Choose Camping Area</label>
          <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)} aria-label="Choose camping area">
            <option value="">Select an area</option>
            {campingAreas.map(area => (
              <option key={area.area} value={area.area}>
                {area.area} (Available spots: {area.available})
              </option>
            ))}
          </select>
        </div>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <div>Total Price: {totalPrice} kr.</div>

        <button type="button" onClick={onBack}>Back</button>
        <button type="button" onClick={onNext}>Continue</button>

      </fieldset>
    </form>
  );
}
