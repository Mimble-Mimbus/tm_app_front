import { FC, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { useTimeout } from "usehooks-ts";

const Modal: FC<PropsWithChildren<{ isOpen: boolean,  toggle?: (...arg: any[]) => any, useBackdrop?: boolean, timeout?: number, onClose?: () => void | Promise<void> }>> = ({ isOpen, children, toggle, useBackdrop, timeout, onClose }) => {
  useTimeout(()=> {
    toggle?.()
  }, isOpen ? (timeout ?? null) : null)

  if (!isOpen) {
    return null
  }

  function onClick () {
    toggle?.()
    onClose?.()
  }
  
  return createPortal(
    <div className="absolute z-50 flex items-center justify-center top-0 left-0 w-screen h-full" onClick={e => e.stopPropagation()}>
      {(useBackdrop && toggle) && <div className="absolute bg-black opacity-80 h-full w-[100vw]" onClick={onClick}></div>}
      <div className="relative flex flex-col justify-center bg-white rounded-md" >
        {children}
      </div>
    </div>,
    document.body
  )
}

export default Modal