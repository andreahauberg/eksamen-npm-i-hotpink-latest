"use client";

import Link from "next/link";
import { Turn as Hamburger } from "hamburger-react";
import { useState } from "react";

export default function Burger() {
  const [isOpen, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!isOpen);
  };

  return (
    <>
      <Hamburger toggled={isOpen} toggle={setOpen} />
      {isOpen && (
        <ul className={`absolute grid justify-center justify-items-center gap-4 py-6 right-0 z-10 bg-secondaryBgColor ${isOpen ? "w-full fixed top-20" : "w-0"} overflow-hidden transition-all duration-300 ease-in-out`}>
          <li>
            <Link onClick={handleClick} href={"/lineup/"} prefetch={false}>
              <div>Line-up</div>
            </Link>
          </li>
          <li>
            <Link onClick={handleClick} href={"/timeTable"} prefetch={false}>
              <div>Tidsplan</div>
            </Link>
          </li>
          <li>
            <Link onClick={handleClick} href={"/booking"} prefetch={false}>
              <div>Billetter</div>
            </Link>
          </li>
          <li>
            <Link onClick={handleClick} href={"/live"} prefetch={false}>
              <div className="flex gap-2 justify-center items-center">
                <div className="">Spiller nu</div>
                <svg className=" transition duration-600 ease-in h-7 w-7 hover:fill-primaryColor" xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707zm2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 0 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708zm5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708zm2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
                </svg>
              </div>
            </Link>
          </li>
        </ul>
      )}
    </>
  );
}
