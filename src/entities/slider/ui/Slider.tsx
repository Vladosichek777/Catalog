import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Box } from "@mui/material";


type SliderType<T extends { id: string }> = {
      renderCard: (card: T) => React.ReactNode
      cardArr: T[]
}

function SliderInner<T extends { id: string }>({ renderCard, cardArr }: SliderType<T>) {
      console.log("slider ")
      return (
            <Box sx={{ border: "2px solid orange", mt: 5 }}>
                  <Swiper
                        modules={[Pagination, Grid]}
                        spaceBetween={30}
                        slidesPerView={4}
                        grid={{ rows: 2 }}
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                  >
                        {cardArr.map((card) => (
                              <SwiperSlide key={card.id}>
                                    {renderCard(card)}
                              </SwiperSlide>
                        ))}
                  </Swiper>
            </Box>
      )
}



export const Slider = memo(SliderInner) as typeof SliderInner;