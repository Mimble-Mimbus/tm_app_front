import { IonImg, IonPage } from "@ionic/react"
import { FC } from "react"
import map from '../assets/img/Carte TM Double + Jeux de Piste-1.png'
import { Pagination, Scrollbar, Zoom } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import core from 'swiper'
core.use([Zoom])

const InteractiveMap: FC = () => {
  return (<IonPage className="middle">
    <Swiper 
      modules={[Pagination, Scrollbar, Zoom]}
      zoom={true}
      pagination={{
        clickable: true
        }}
      className="w-full"
    >
      <SwiperSlide className="w-full overflow-hidden">
        <div className="swiper-zoom-container">
          <img src={map} alt="tm-map" className="max-h-[80vh]" />
        </div>
      </SwiperSlide>
    </Swiper>
  </IonPage>)
}

export default InteractiveMap
