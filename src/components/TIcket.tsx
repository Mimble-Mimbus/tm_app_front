import { FC } from "react";
import QRCodeImage from "./QRCodeImage";

export interface ITicket {
  email: string
  username: string
  rawQrcode: string
  categorie?: string
}

const Ticket: FC<ITicket> = ({ email, username, rawQrcode, categorie }) => {
  return (<div className="w-64 h-96 shadow-md rounded-2xl flex flex-col justify-around bg-white">
    <div className="flex flex-col items-start ml-5 space-y-4">
      <p>{email}</p>
      <p>{username}</p>
      {categorie && <p>{categorie}</p>}
    </div>
    <div>
      <QRCodeImage data={rawQrcode} />
    </div>
  </div>)
}

export default Ticket