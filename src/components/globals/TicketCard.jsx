import Link from "next/link";
import Button from "./Button";
import { krona_one } from "@/app/fonts.jsx";

const TicketCard = ({ title, description, features, price, link }) => {
  return (
    <div className="relative snap-always snap-center w-72 h-auto min-w-72 lg:w-96 lg:h-96 flex-shrink-0">
      <div className="bg-bgColor p-8 rounded-lg shadow-md shadow-primaryColor w-full h-full">
        <h2
          className={`${krona_one.className} medium-size text-primaryTextColor`}
        >
          {title}
        </h2>
        <p className="mt-4 small-size">{description}</p>
        <ul className="list-disc list-inside mt-2 small-size">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <p className="mt-4 font-bold small-size">Pris: {price} DKK</p>
        <div className="flex justify-end">
          <Link
            href="/booking/"
            className="pt-6 md:pt-2 focus: rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accentColor"
          >
            <Button title="Køb billet" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
