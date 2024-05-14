import { useState, useEffect } from 'react';
import prices from '../backend/settings.js';
import { fetchAPI, fetchDatabase } from '../../app/api/api.js';

export default function Camping({ ticketQuantity, campingOptions, onClick, onNext, onBack }) {
  const [greenCamping, setGreenCamping] = useState(campingOptions.greenCamping || false);
  const [twoPersonTent, setTwoPersonTent] = useState(campingOptions.twoPersonTent || 0);
  const [threePersonTent, setThreePersonTent] = useState(campingOptions.threePersonTent || 0);
  const [campingAreas, setCampingAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(campingOptions.selectedArea || '');
  const [totalPrice, setTotalPrice] = useState(0);

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

  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      total += greenCamping ? prices.greenCamping : 0;
      total += twoPersonTent * prices.TwoPersonsTent;
      total += threePersonTent * prices.ThreePersonsTent;
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [greenCamping, twoPersonTent, threePersonTent]);

  useEffect(() => {
    onClick({ camping: { greenCamping, twoPersonTent, threePersonTent, selectedArea } });
  }, [greenCamping, twoPersonTent, threePersonTent, selectedArea]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Reserve spot via external API
      const reservation = await fetchAPI('/reserve-spot', {
        method: 'PUT',
        body: JSON.stringify({
          area: selectedArea,
          amount: ticketQuantity,
        }),
      });

      // Confirm reservation via external API
      await fetchAPI('/fullfill-reservation', {
        method: 'POST',
        body: JSON.stringify({
          id: reservation.id,
        }),
      });

      // Save booking information to Supabase database
      const bookingData = {
        area: selectedArea,
        ticketQuantity,
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
      <div>
        <h2>Add-on</h2>
        <p>Note: The price includes the crew setting up your tent</p>
        
        <div>
          <label>2 person Tent</label>
          <div>
            <button type="button" onClick={() => handleQuantityChange('twoPersonTent', -1)}>-</button>
            <span>{twoPersonTent}</span>
            <button type="button" onClick={() => handleQuantityChange('twoPersonTent', 1)}>+</button>
            <p>{prices.TwoPersonsTent} kr.</p>
          </div>
        </div>
        
        <div>
          <label>3 person Tent</label>
          <div>
            <button type="button" onClick={() => handleQuantityChange('threePersonTent', -1)}>-</button>
            <span>{threePersonTent}</span>
            <button type="button" onClick={() => handleQuantityChange('threePersonTent', 1)}>+</button>
            <p>{prices.ThreePersonsTent} kr.</p>
          </div>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={greenCamping}
              onChange={(e) => setGreenCamping(e.target.checked)}
            />
            Green camping {prices.greenCamping} kr.
          </label>
        </div>

        <div>
          <label>Choose Camping Area</label>
          <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)}>
            <option value="">Select an area</option>
            {campingAreas.map(area => (
              <option key={area.area} value={area.area}>
                {area.area} (Available spots: {area.available})
              </option>
            ))}
          </select>
        </div>

        <div>Total Price for Add-ons: {totalPrice} kr.</div>

        <button type="submit">Continue</button>
        <button type="button" onClick={onBack}>Back</button>
      </div>
    </form>
  );
}
