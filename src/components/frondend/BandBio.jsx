"use client";
import { Disclosure, DisclosureButton, DisclosurePanel, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function BandBio({ bio }) {
  //   console.log("Band bio Data", bio);
  return (
    <>
      <div className="w-full rounded-xl bg-primaryTextColor">
        <Disclosure defaultOpen={true}>
          <DisclosureButton className=" w-full flex justify-between items-center text-secondaryTextColor px-5 py-4 border-b">
            <span>BIO</span>
            <ChevronDownIcon className="size-5 fill-secondaryTextColor group-data-[hover]:fill-secondaryBgColor group-data-[open]:rotate-180" />
          </DisclosureButton>
          <div>
            <Transition enter="duration-300 ease-in-out	" enterFrom="opacity-0 -translate-y-6" enterTo="opacity-100 translate-y-0" leave="duration-300 ease-in-out" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 -translate-y-5">
              <DisclosurePanel className=" 	leading-relaxed	 h-72	text-secondaryTextColor px-5 py-3 overflow-auto">
                <p className=" xsmall-size">{bio ? bio : "Biografien på dette band findes ikke"}</p>
              </DisclosurePanel>
            </Transition>
          </div>
        </Disclosure>
      </div>
    </>
  );
}
