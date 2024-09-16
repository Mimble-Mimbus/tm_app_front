import { FC, useEffect, useState } from "react";
import { Ticket as ITicket } from "../storage/entity/Ticket";
import { DatabaseService } from "../storage/database";
import SwiperWrapper from "../components/Swiper";
import { IonPage } from "@ionic/react";
import Ticket from "../components/TIcket";

const Tickets: FC = () => {
  const [tickets, setTickets] = useState<null | ITicket[]>(null)
  useEffect(() => {
    DatabaseService.getTickets().then(data => {
      console.log(data)
      setTickets(data)
    })

  }, [])
  return (<IonPage className="h-full bg-slate-50">
    <div className="h-full">
    {tickets ? 
      <SwiperWrapper>
      {tickets.map((ticket, index) => (
        <Ticket {...ticket}  key={index} />
      ))}
      </SwiperWrapper> :
      <div>vous n'avez pas de billets</div>
      }
    </div>
  </IonPage>)
}

export default Tickets
