export default function Camping({ onCampingOptionSelect }) {
  return (
    <div>
      <h2>Camping Options:</h2>
      <label>
        <input type="checkbox" onChange={(e) => onCampingOptionSelect('greenCamping', e.target.checked)} />
        Green Camping Option +249,-
      </label>
      <label>
        <input type="checkbox" onChange={(e) => onCampingOptionSelect('twoPersonTent', e.target.checked)} />
        2 Person Tent (including the tent) 299,-
      </label>
      <label>
        <input type="checkbox" onChange={(e) => onCampingOptionSelect('threePersonTent', e.target.checked)} />
        3 Person Tent (including the tent) 399,-
      </label>
    </div>
  );
}
