import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Grid} from "swiper/modules";
import ProductCard from "../ui/ProductCard";
import Typography from "@mui/material/Typography";
import {useContext} from "react";
import SessionContext from "../utils/SessionContext";
import checkBasketEmpty from "../utils/checkBasketEmpty.ts";
import {type BasketItem} from "../utils/SessionContext";

export default function Basket() {
    const session = useContext(SessionContext);
    const isBasketEmpty = checkBasketEmpty(session);

    return (
        <>
            {isBasketEmpty && (
                <Typography variant="h3" align="center">
                    Basket is empty
                </Typography>
            )}
            <Swiper
                modules={[Pagination, Grid]}
                spaceBetween={30}
                slidesPerView={3}
                grid={{
                    rows: 2,
                }}
                pagination={{clickable: true}}
                scrollbar={{draggable: true}}
            >
                {session.sessionData.basket.map((card: BasketItem) => {
                    const cardInfo = session.sessionData.avaliableProducts.find(
                        (product): boolean => product.id === card.id,
                    );
                    return (
                        cardInfo && (
                            <SwiperSlide key={card.id}>
                                <ProductCard variant={"basketCard"} cardInfo={cardInfo} session={session} />
                            </SwiperSlide>
                        )
                    );
                })}
            </Swiper>
        </>
    );
}
