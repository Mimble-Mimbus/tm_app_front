import { FC } from "react";
import { Link } from "react-router-dom";
import eventStore from "../store/eventStore";
import { observer } from "mobx-react";

const Footer: FC = () => {
  return (
    <div className="flex content-between h-16 w-full relative">
        <img src="src/assets/img/castle_footer.png"  className="absolute bottom-10 w-4/5 right-0 pointer-events-none z-10" alt="" />
        <button className="stroke-yellow font-bold align-bottom mx-auto font-['chancery'] text-xl" >
          Programme
        </button>
        <Link to={`/event/${eventStore.eventId}/interactive-map`} className="stroke-yellow font-bold align-bottom mx-auto font-['chancery'] text-xl" >
          Plan
        </Link>
        <button className="stroke-yellow font-bold align-bottom mx-auto font-['chancery'] text-xl" >
          Ma visite
        </button>
    </div>
  )
}

export default observer(Footer)
