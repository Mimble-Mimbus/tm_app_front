import { IonIcon } from "@ionic/react";
import { FC, PropsWithChildren, useState } from "react"
import { chevronDownOutline, chevronUpOutline } from "ionicons/icons";
import { Transition } from '@headlessui/react'
import clsx from "clsx";

const HidingContainer: FC<PropsWithChildren<{ title: string, icon?: string, className?: string, titleClassName?: string }>> = ({ children, title, icon, className, titleClassName }) => {
  const [showChildren, setShowChildren] = useState(false);

  function show () {
    setShowChildren(val => !val)
  }

  return (<div className="w-full flex flex-col">
    <div className={clsx('z-10', titleClassName || 'w-full h-12 rounded-md bg-gray-400 flex justify-between text-white')}>
      <div className="h-full flex w-full items-center">
        <IonIcon className="h-3/5 w-[10%] ml-1" icon={icon} />
        <div className="ml-3 w-auto font-bold flex items-cente">{ title }</div>
      </div>
      <IonIcon onClick={show} className="h-2/3 w-1/6 mr-2 self-center" icon={!showChildren ? chevronDownOutline : chevronUpOutline} />
    </div>
    <Transition
      show={showChildren}
      enter="transition-transform duration-150"
      enterFrom="-translate-y-8"
      enterTo="translate-y-0"
      leave="transition-transform duration-150"
      leaveFrom="translate-y-0"
      leaveTo="-translate-y-[]"
    >
      <div className={clsx('z-0', className && className)}>
        {children}
      </div>
    </Transition>
  </div>)
}

export default HidingContainer
