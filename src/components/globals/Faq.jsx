import { useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";

const Faq = ({ title, body, id }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-5 border-b border-primaryColor pb-5 gap-10">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="cursor-pointer normal-size font-bold w-full text-left flex justify-between items-center gap-12 focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accentColor"
      >
        {title}
        {isOpen ? (
          <MinusIcon className="h-6 w-6" />
        ) : (
          <PlusIcon className="h-6 w-6" />
        )}
      </button>
      {isOpen && (
        <div className="mt-2">
          <p className="small-size max-w-lg">{body}</p>
        </div>
      )}
    </div>
  );
};

export default Faq;
