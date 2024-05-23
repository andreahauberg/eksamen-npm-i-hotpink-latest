import { krona_one } from "@/app/fonts.jsx";
import Button from "@/components/globals/Button";
import Link from "next/link";

export default function ConfirmationPage({ bookingData }) {
  const { orderId, personalInfo, totalPrice } = bookingData;

  return (
    <div className="grid grid-cols-gridContent ">
      <div className=" my-24 col-start-3 gap-3 flex flex-wrap items-center justify-center">
        <div className="bg-secondaryBgColor rounded-lg p-8 shadow-md shadow-primaryColor w-full max-w-md">
          <h1
            className={`${krona_one.className} large-size text-primaryTextColor mb-5 `}
          >
            Ordrebekræftelse
          </h1>
          <p className="normal-size mb-3">
            Tak for dit køb! <br /> Dit ordrenummer er{" "}
            <span className="font-bold">{orderId}</span>.
          </p>
          <p className="normal-size mb-8">
            En ordrebekræftelse er sendt til din email.
          </p>
          <p className="normal-size mb-8">
            Udforsk festivallens tidsplan og line-up her
          </p>
          <div className="flex justify-between">
            <Link href="/timeTable/">
              <Button title="Tidsplan" />
            </Link>
            <Link href="/lineup/">
              <Button title="Line-up" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
