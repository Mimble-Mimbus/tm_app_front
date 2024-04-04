import { FC, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { useTimeout } from "usehooks-ts";

const Modal: FC<PropsWithChildren<{ isOpen: boolean, toggle?: () => void, useBackdrop?: boolean, timeout?: number }>> = ({ isOpen, children, toggle, useBackdrop, timeout }) => {
  useTimeout(()=> {
    toggle?.()
  }, isOpen ? (timeout ?? null) : null)

  if (!isOpen) {
    return null
  }
  
  return createPortal(
    <div className="absolute z-50 flex items-center justify-center top-0 left-0 w-[100vw] h-full" onClick={e => e.stopPropagation()}>
      {(useBackdrop && toggle) && <div className="absolute bg-black opacity-80 h-full w-[100vw]" onClick={toggle}></div>}
      <div className="relative flex flex-col justify-center bg-white rounded-md" >
        {children}
      </div>
    </div>,
    document.body
  )
}

export default Modal