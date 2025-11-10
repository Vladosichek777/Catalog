import CardPopUp from "../components/CardPopUp";
import ProductCard from "../components/ProductCard";
import ConfirmDeleteCard from "../components/ConfirmDeleteCard";
import {useState, useRef} from "react";
import {Button, Box} from "@mui/material";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Grid} from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";

function MainPage({sessionData, setSessionData, isAdmin}) {
  const [openModalNewCard, setOpenModalNewCard] = useState(false);
  const [currentEditCard, setCurrentEditCard] = useState({});
  const [openConfirmWindow, setOpenConfirmWindow] = useState(false);

  const handleOpenConfirmWindow = () => {
    setOpenConfirmWindow(true);
  };
  const handleCloseConfirmWindow = () => {
    setOpenConfirmWindow(false);
  };
  const handleCloseModalNewCard = () => {
    setOpenModalNewCard(false);
  };
  const handleOpenModalNewCard = () => {
    setOpenModalNewCard(true);
  };

  // const promise = new Promise((resolve, reject) => {
  //   let a = 1 + 1;
  //   if (a === 2) {
  //     resolve("super");
  //   } else {
  //     reject("fail");
  //   }
  // });

  // promise.then(
  //   (result) => console.log(result)
  // );



  return (
    <Box sx={{border: "2px solid blue"}}>
      {isAdmin && (
        <Button onClick={handleOpenModalNewCard} variant="contained" size="large" color="success">
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
      <ConfirmDeleteCard open={openConfirmWindow} handleClose={handleCloseConfirmWindow} />
      <Box sx={{border: "2px solid orange", mt: 5}}>
        <Swiper
          // install Swiper modules
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
                editModal={handleOpenModalNewCard}
                setCurrentEditCard={setCurrentEditCard}
                handleOpenConfirmWindow={handleOpenConfirmWindow}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}

export default MainPage;
