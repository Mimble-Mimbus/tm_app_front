import { FC, PropsWithChildren, useEffect, useRef } from "react";
import Comp from 'react-modal'

const Modal: FC<PropsWithChildren<{ isOpen: boolean, setIsOpen: (val: boolean) => void }>> = ({ isOpen, children, setIsOpen }) => {
  const modalRef = useRef<HTMLDivElement>(null)
  function handleClickOutside(event: MouseEvent) {
    if (!isOpen) return
    if (!modalRef.current!.contains(event.target as HTMLElement)) {
      setIsOpen(false)
      document.removeEventListener('click', handleClickOutside)
    }
  }
  useEffect(() => {
    Comp.setAppElement(document.body)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => document.addEventListener('click', handleClickOutside), 500) 
    }
  }, [isOpen])
  return <Comp
    isOpen={isOpen}
    style={{
      overlay: {
          position: 'fixed',
          backgroundColor: 'rgba(0, 0, 0, 0.75)'
      },
      content: {
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        border: 'none',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      },
    }}
  >
    <div ref={modalRef} className="h-full w-full">
    {children}
    </div>
  </Comp>
}

export default Modal