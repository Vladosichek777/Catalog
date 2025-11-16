import CardPopUp from "../components/CardPopUp";
import ProductCard from "../components/ProductCard";
import ConfirmDeleteCard from "../components/ConfirmDeleteCard";
import handleDeleteCard from "../utils/handleDeleteCard";
import {useState} from "react";
import {Button, Box} from "@mui/material";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Grid} from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";

function MainPage({sessionData, setSessionData, isAdmin}) {
  const [openModalNewCard, setOpenModalNewCard] = useState(false);
  const [openConfirmWindow, setOpenConfirmWindow] = useState(false);
  const [currentEditCard, setCurrentEditCard] = useState({});
  const [idCurrentCard, setIdCurrentCard] = useState("");

  const handleCloseConfirmWindow = () => {
    setOpenConfirmWindow(false);
  };
  const handleCloseModalNewCard = () => {
    setOpenModalNewCard(false);
  };
  const handleDeleteCardByAdmin = () => {
    handleDeleteCard(idCurrentCard, sessionData, setSessionData, "admin");
  };
  const handleClickDeleteCard = (id) => {
    setOpenConfirmWindow(true);
    setIdCurrentCard(id);
  };
  const handleOpenPopUp = (currentCardData) => {
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
        open={openModalNewCard}
        close={handleCloseModalNewCard}
        sessionData={sessionData}
        setSessionData={setSessionData}
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
          {sessionData.avaliableProducts.map((card, id) => (
            <SwiperSlide>
              <ProductCard
                key={id}
                id={card.id}
                cardName={card.name}
                description={card.description}
                src={card.src}
                isAdmin={isAdmin}
                isBought={card.isBought}
                sessionData={sessionData}
                setSessionData={setSessionData}
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
