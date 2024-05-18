"use client";
import { Disclosure, DisclosureButton, DisclosurePanel, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function BandBio({ band }) {
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
                <p className=" biotext-size">
                  A Perfect Circle is an American rock supergroup formed in 1999 by guitarist Billy Howerdel and Tool vocalist Maynard James Keenan. A Perfect Circle has released four studio albums, the first three during the early 2000s: Mer de Noms, their debut album in 2000, and followed up by Thirteenth Step in 2003; then in 2004, Emotive—an album of radically re-worked cover songs. Shortly after Emotive's release, the band went on hiatus; Keenan returned to Tool and started up solo work under the band name Puscifer. and Howerdel released a solo album, Keep Telling Myself It's Alright, under the moniker Ashes Divide. Band activity was sporadic in the following years; the band reformed in 2010, and played live shows on and off between 2010 and 2013, but fell into inactivity after the
                  release of their greatest hits album, Three Sixty, and a live album box set, A Perfect Circle Live: Featuring Stone and Echo in late 2013. The band reformed in 2017 to record a fourth album, Eat the Elephant, which was released on April 20, 2018.", "slug": "a-perfect-circle
                </p>
              </DisclosurePanel>
            </Transition>
          </div>
        </Disclosure>
      </div>
    </>
  );
}
