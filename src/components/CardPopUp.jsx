import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField} from "@mui/material";
import {useForm, Controller} from "react-hook-form";
import {v4 as uuidv4} from "uuid";
import {useEffect} from "react";

export default function CardPopUp({open, close, sessionData, setSessionData, currentEditCard, setCurrentEditCard}) {
  const isEditMode = Object.keys(currentEditCard).length !== 0;
  const {control, handleSubmit, reset} = useForm({
    defaultValues: {urlImage: "", cardName: "", cardDesc: ""},
  });

  const onSubmit = ({urlImage, cardName, cardDesc}) => {
    let newEditData = {};
    //if admin edit card
    if (isEditMode) {
      const updatedAvaliableProducts = sessionData.avaliableProducts.map((card) =>
        card.id === currentEditCard.id ? {...card, name: cardName, description: cardDesc, src: urlImage} : card
      );
      newEditData = {...sessionData, avaliableProducts: updatedAvaliableProducts};
    } else {
      //if admin add new card
      const newObject = {id: uuidv4(), name: cardName, description: cardDesc, src: urlImage, isBought: false};
      newEditData = {...sessionData, avaliableProducts: [newObject, ...sessionData.avaliableProducts]};
    }

    setSessionData(newEditData);
    localStorage.setItem("sessionData", JSON.stringify(newEditData));
    reset();
    close();
  };

  useEffect(() => {
    if (isEditMode) {
      reset({
        urlImage: currentEditCard.src,
        cardName: currentEditCard.name,
        cardDesc: currentEditCard.description,
      });
    } else {
      reset({urlImage: "", cardName: "", cardDesc: ""});
    }
  }, [isEditMode, currentEditCard, reset]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        setCurrentEditCard({});
        close();
      }}
    >
      <DialogTitle>{isEditMode ? "Update current card" : "Add New Card"} </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {" "}
          {isEditMode ? " Enter new value" : "Enter a value for the new product card"}
        </DialogContentText>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="urlImage"
            control={control}
            render={({field}) => <TextField {...field} label="Url Image" fullWidth autoFocus sx={{mt: 2}} />}
          />
          <Controller
            name="cardName"
            control={control}
            render={({field}) => <TextField {...field} label="Card Name" fullWidth sx={{mt: 2}} />}
          />
          <Controller
            name="cardDesc"
            control={control}
            render={({field}) => (
              <TextField {...field} label="Card Description" fullWidth multiline minRows={4} sx={{mt: 2}} />
            )}
          />
          <DialogActions>
            <Button onClick={close}>Cancel</Button>
            <Button variant="contained" color="success" type="submit">
              {isEditMode ? "Done" : "Add Card"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
