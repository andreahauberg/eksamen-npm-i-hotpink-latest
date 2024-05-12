export default function PersonalForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit({ name, email });
    }}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <button type="submit">Submit</button>
    </form>
  );
}
