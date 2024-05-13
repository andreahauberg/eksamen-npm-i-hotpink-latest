export default function Camping({ onSelect }) {
  return (
    <div>
      <h2>Camping Options:</h2>
      <label>
        <input type="checkbox" onChange={(e) => onSelect('greenCamping', e.target.checked)} />
        Green Camping Option +249,-
      </label>
      <label>
        <input type="checkbox" onChange={(e) => onSelect('twoPersonTent', e.target.checked)} />
        2 Person Tent (including the tent) 299,-
      </label>
      <label>
        <input type="checkbox" onChange={(e) => onSelect('threePersonTent', e.target.checked)} />
        3 Person Tent (including the tent) 399,-
      </label>
    </div>
  );
}
