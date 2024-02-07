import { FC, useEffect, useState } from "react";
import { Ticket } from "../storage/entitys/Ticket";
import { DatabaseService } from "../storage/database";
import SwiperWrapper from "../components/Swiper";
import QRCodeImage from "../components/QRCodeImage";

const Tickets: FC = () => {
  const [tickets, setTickets] = useState<null | Ticket[]>(null)
  useEffect(() => {
    DatabaseService.getTickets().then(data => {
      console.log(data)
      setTickets(data)
    })

  }, [])
  return (<div className="h-full bg-slate-50">
    {tickets ? 
      <SwiperWrapper>
      {tickets.map((ticket, index) => (
        <div className="w-64 h-96 shadow-md rounded-2xl flex flex-col justify-around bg-white" key={index}>
          <div className="flex flex-col items-start ml-5 space-y-4">
            <p>{ticket.email}</p>
            <p>{ticket.username}</p>
          </div>
          <div>
            <QRCodeImage data={ticket.data} />
          </div>
        </div>
      ))}
      </SwiperWrapper> :
      <div>vous n'avez pas de billets</div>
      }
    
  </div>)
}

export default Tickets