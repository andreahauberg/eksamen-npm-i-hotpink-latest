import { krona_one } from "@/app/fonts.jsx";
import Button from "@/components/globals/Button";
import Link from "next/link";

export default function ConfirmationPage({ bookingData }) {
  const { orderId, personalInfo, totalPrice } = bookingData;

  return (
    <div className="grid grid-cols-gridContent justify-center mt-16 mb-32 ">
      <div className=" pt-8 pb-16 col-start-3 gap-3  bg-secondaryBgColor rounded-lg p-10 shadow-lg shadow-primaryColor max-w-lg w-full ">
        <h1
          className={`${krona_one.className} large-size text-primaryTextColor mb-8 `}
        >
          Ordrebekræftelse
        </h1>
        <p className="normal-size mb-5 ">
          Tak for dit køb! <br /> Dit ordrenummer er{" "}
          <span className="font-bold large-size">{orderId}</span>.
        </p>
        <p className="normal-size mb-12">
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
  );
}
