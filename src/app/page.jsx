import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1>Foofest</h1>
      <div>
        <Link href="/booking/">
          <button>Go to Booking</button>
        </Link> 
        </div>
    </>
  );
}
