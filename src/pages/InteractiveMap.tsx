import { IonPage } from "@ionic/react"
import { FC } from "react"
import map from '../assets/img/Carte TM Double + Jeux de Piste-1.png'
import { Pagination, Scrollbar, Zoom } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import core from 'swiper'
core.use([Zoom])

const InteractiveMap: FC = () => {
  // const ref = useCallback(async (node: HTMLDivElement | null ) => {
  //     if (node) {
  //       let newMap = new Map('Intmap').setZoom(17)
  //       tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  //       }).addTo(newMap)
  //         geoJSON(geoson).addTo(newMap)
  //     }
  //   }, []);
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
      <SwiperSlide>
        <div className="w-4/5">
          <iframe style={{width: "100%", height: "300px", border: "0"}} allowFullScreen allow="geolocation" src="//umap.openstreetmap.fr/fr/map/tm-2025-pnj_1271626?scaleControl=false&miniMap=false&scrollWheelZoom=false&zoomControl=true&editMode=disabled&moreControl=true&searchControl=null&tilelayersControl=null&embedControl=null&datalayersControl=true&onLoadPanel=none&captionBar=false&captionMenus=true"></iframe>
          <p><a href="//umap.openstreetmap.fr/fr/map/tm-2025-pnj_1271626?scaleControl=false&miniMap=false&scrollWheelZoom=true&zoomControl=true&editMode=disabled&moreControl=true&searchControl=null&tilelayersControl=null&embedControl=null&datalayersControl=true&onLoadPanel=none&captionBar=false&captionMenus=true">Voir en plein écran</a></p>
        </div>
      </SwiperSlide>
    </Swiper>
  </IonPage>)
}

export default InteractiveMap
