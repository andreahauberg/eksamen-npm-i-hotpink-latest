"use client";
import Link from 'next/link';
import { useEffect } from 'react';
import { fetchAPI } from './api/api';

export default function Home() {
  useEffect(() => {
    const getBands = async () => {
      try {
        const bands = await fetchAPI('/bands');
        console.log('Fetched bands:', bands);
      } catch (error) {
        console.error('Failed to fetch bands:', error);
      }
    };

    getBands();
  }, []); 

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
