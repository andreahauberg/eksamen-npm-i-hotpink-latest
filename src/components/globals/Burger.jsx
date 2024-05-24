"use client";

import Link from "next/link";
import { Turn as Hamburger } from "hamburger-react";
import { useState } from "react";

export default function Burger() {
  const [isOpen, setOpen] = useState(false);
  //   const handleClick = () => {
  //     setIsOpen(!isOpen);
  //   };

  return (
    <>
      <Hamburger toggled={isOpen} toggle={setOpen} />
      {isOpen && (
        <ul className={`absolute grid justify-center items-center gap-4 py-6 right-0 z-10 bg-secondaryBgColor ${isOpen ? "w-full fixed top-20" : "w-0"} overflow-hidden transition-all duration-300 ease-in-out`}>
          <li>
            <Link href={"/lineup/"} prefetch={false}>
              <div className="">Line-up</div>
            </Link>
          </li>
          <li>
            <Link href={"/timeTable"} prefetch={false}>
              <div className="">Tidsplan</div>
            </Link>
          </li>
          <li>
            <Link href={"/booking"} prefetch={false}>
              <div className="">Billetter</div>
            </Link>
          </li>
          <li className=" justify-self-center ">
            <Link href={"/live/"} prefetch={false}>
              <div>
                <svg className=" transition duration-600 ease-in h-8 w-8 hover:fill-primaryColor" xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
                  <path d="M36.4166 26.8333C39.2724 24.035 42.1666 20.6808 42.1666 16.2917C42.1666 13.4958 41.056 10.8145 39.079 8.83758C37.1021 6.86064 34.4207 5.75 31.6249 5.75C28.2516 5.75 25.8749 6.70833 22.9999 9.58333C20.1249 6.70833 17.7483 5.75 14.3749 5.75C11.5791 5.75 8.89778 6.86064 6.92083 8.83758C4.94389 10.8145 3.83325 13.4958 3.83325 16.2917C3.83325 20.7 6.70825 24.0542 9.58325 26.8333L22.9999 40.25L36.4166 26.8333Z" stroke="#FFF0F5" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
            </Link>
          </li>
        </ul>
      )}
    </>
  );
}
