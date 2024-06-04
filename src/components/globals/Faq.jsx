import { useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";

const Faq = ({ title, body, data, id }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" mb-5 border-b border-primaryColor pb-5 gap-10">
      <input
        type="checkbox"
        className=" hidden"
        id={id}
        checked={isOpen}
        onChange={() => setIsOpen(!isOpen)}
      />
      <label
        htmlFor={data}
        className="cursor-pointer normal-size font-bold w-full text-left flex justify-between items-center gap-12"
      >
        {title}
        {isOpen ? (
          <MinusIcon className="h-5 w-5" />
        ) : (
          <PlusIcon className="h-5 w-5" />
        )}
      </label>
      {isOpen && (
        <div className=" mt-2">
          <p className="small-size max-w-lg">{body}</p>
        </div>
      )}
    </div>
  );
};

export default Faq;
