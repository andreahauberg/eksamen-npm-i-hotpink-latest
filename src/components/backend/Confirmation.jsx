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
            className={`${krona_one.className} text-center large-size text-primaryTextColor mb-8 `}
          >
            Ordrebekræftelse
          </h1>
          <p className="normal-size mb-5 text-center ">
            Tak for dit køb! <br /> Dit ordrenummer er{" "}
            <span className="font-bold large-size text-center">{orderId}</span>.
          </p>
          <p className="normal-size mb-12 text-center">
            En ordrebekræftelse er sendt til din email.
          </p>

          <div className="flex justify-between mb-6">
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
