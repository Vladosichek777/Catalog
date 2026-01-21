import CardPopUp from "../ui/CardPopUp";
import ProductCard from "../ui/ProductCard";
import ConfirmDeleteCard from "../ui/ConfirmDeleteCard";
import prepareCardDataForDeletion from "../utils/prepareCardDataForDeletion.ts";
import {SessionContext} from "../utils/SessionContext";
import {useState, useContext} from "react";
import {Button, Box} from "@mui/material";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Grid} from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import checkIsAdmin from "../utils/checkIsAdmin.ts";
import {type Product} from "../utils/SessionContext";

function MainPage() {
    const session = useContext(SessionContext);
    const isAdmin: boolean = checkIsAdmin(session);

    const [openModalNewCard, setOpenModalNewCard] = useState<boolean>(false);
    const [openConfirmWindow, setOpenConfirmWindow] = useState<boolean>(false);
    const [currentEditCard, setCurrentEditCard] = useState<Product | null>(null);
    const [idCurrentCard, setIdCurrentCard] = useState<string>("");

    const handleCloseConfirmWindow = () => {
        setOpenConfirmWindow(false);
    };
    const handleCloseModalNewCard = () => {
        setOpenModalNewCard(false);
    };
    const handleDeleteCardByAdmin = () => {
        const updatedData = prepareCardDataForDeletion(idCurrentCard, session, "admin");
        session.updateSessionData(updatedData);
    };
    const handleClickDeleteCard = (id: string): void => {
        setOpenConfirmWindow(true);
        setIdCurrentCard(id);
    };
    const handleOpenPopUp = (currentCardData: Product) => {
        setOpenModalNewCard(true);
        setCurrentEditCard(currentCardData);
    };

    return (
        <Box sx={{border: "2px solid blue"}}>
            {isAdmin && (
                <Button onClick={() => setOpenModalNewCard(true)} variant="contained" size="large" color="success">
                    Add new Card
                </Button>
            )}
            <CardPopUp
                session={session}
                open={openModalNewCard}
                close={handleCloseModalNewCard}
                currentEditCard={currentEditCard}
                setCurrentEditCard={setCurrentEditCard}
            />
            <ConfirmDeleteCard
                open={openConfirmWindow}
                onClose={handleCloseConfirmWindow}
                onDelete={handleDeleteCardByAdmin}
            />
            <Box sx={{border: "2px solid orange", mt: 5}}>
                <Swiper
                    modules={[Pagination, Grid]}
                    spaceBetween={30}
                    slidesPerView={4}
                    grid={{
                        rows: 2,
                    }}
                    pagination={{clickable: true}}
                    scrollbar={{draggable: true}}
                >
                    {session.sessionData.avaliableProducts.map((card, id) => (
                        <SwiperSlide>
                            <ProductCard
                                variant={"mainCard"}
                                key={id}
                                cardInfo={card}
                                isAdmin={isAdmin}
                                session={session}
                                deleteCard={handleClickDeleteCard}
                                editCard={handleOpenPopUp}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </Box>
    );
}

export default MainPage;
