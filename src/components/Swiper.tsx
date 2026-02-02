import { FC, PropsWithChildren, Children } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Scrollbar, Zoom} from 'swiper/modules'

const SwiperWrapper: FC<PropsWithChildren> = ({children}) => {
  return (
    <Swiper
      modules={[Pagination, Scrollbar, Zoom]}
      keyboard={true}
      pagination={true}
      scrollbar={true}
      zoom={true}
      slidesPerView={1}
    >
      {Children.map(children, (child) => (
        <SwiperSlide> {child} </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SwiperWrapper
