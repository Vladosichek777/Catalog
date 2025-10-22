import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

export default function NewCardPopUp({ open, close, sessionData, setSessionData }) {
  const { control, handleSubmit, reset } = useForm({ defaultValues: { urlImage: "", cardName: "", cardDesc: "" } });

  const onSubmit = (entryValues) => {
    const { urlImage, cardName, cardDesc } = entryValues;
    const newObject = { id: uuidv4(), name: cardName, description: cardDesc, src: urlImage };
    const updatedData = { ...sessionData, avaliableProducts: [newObject, ...sessionData.avaliableProducts] };
    setSessionData(updatedData);
    localStorage.setItem("sessionData", JSON.stringify(updatedData));
    reset();
    close();
  };
  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Add New Card</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter a value for the new product card</DialogContentText>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller name="urlImage" control={control} render={({ field }) => <TextField {...field} label="Url Image" fullWidth autoFocus sx={{ mt: 2 }} />} />
          <Controller name="cardName" control={control} render={({ field }) => <TextField {...field} label="Card Name" fullWidth sx={{ mt: 2 }} />} />
          <Controller name="cardDesc" control={control} render={({ field }) => <TextField {...field} label="Card Description" fullWidth multiline minRows={4} sx={{ mt: 2 }} />} />
          <DialogActions>
            <Button onClick={close}>Cancel</Button>
            <Button variant="contained" color="success" type="submit">
              Add Card
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
