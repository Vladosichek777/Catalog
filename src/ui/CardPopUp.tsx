// @ts-nocheck
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField} from "@mui/material";
import {Controller} from "react-hook-form";
import {v4 as uuidv4} from "uuid";
import useSetFormData from "../utils/useSetFormData";

export default function CardPopUp({session, open, close, currentEditCard, setCurrentEditCard}) {
    const {isEditMode, control, handleSubmit, reset} = useSetFormData(currentEditCard);

    const handleClosePopUp = () => {
        setCurrentEditCard({});
        close();
    };

    const onSubmit = ({urlImage, cardName, cardDesc}) => {
        let newEditData = {};

        //if admin edit card
        if (isEditMode) {
            const updatedAvaliableProducts = session.sessionData.avaliableProducts.map((card) =>
                card.id === currentEditCard.id ? {...card, name: cardName, description: cardDesc, src: urlImage} : card
            );
            newEditData = {...session.sessionData, avaliableProducts: updatedAvaliableProducts};
        } else {
            //if admin add new card
            const newObject = {id: uuidv4(), name: cardName, description: cardDesc, src: urlImage};
            newEditData = {
                ...session.sessionData,
                avaliableProducts: [newObject, ...session.sessionData.avaliableProducts],
            };
        }

        session.updateSessionData(newEditData);
        reset();
        close();
    };

    return (
        <Dialog open={open} onClose={handleClosePopUp}>
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
                        render={({field}) => (
                            <TextField {...field} label="Url Image" fullWidth autoFocus sx={{mt: 2}} />
                        )}
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
                            <TextField
                                {...field}
                                label="Card Description"
                                fullWidth
                                multiline
                                minRows={4}
                                sx={{mt: 2}}
                            />
                        )}
                    />
                    <DialogActions>
                        <Button onClick={handleClosePopUp}>Cancel</Button>
                        <Button variant="contained" color="success" type="submit">
                            {isEditMode ? "Done" : "Add Card"}
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
}
