import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import { ControllerTextField } from "../../../shared/components/ControllerTextField";
import { type FormProductCardValueType } from "../../../shared/types/index";
import { type Control, type UseFormHandleSubmit, type SubmitHandler } from "react-hook-form";

// Его задача просто вернуть нам диалоговое окно,
// которое будет использоваться и для добавления новой карточки, и для редактирования существующей карточки.

type ProductCardDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    dialogTitle: string;
    dialogContentText: string;
    buttonText: string;
    control: Control<FormProductCardValueType>;
    handleSubmit: UseFormHandleSubmit<FormProductCardValueType>;
    onSubmit: SubmitHandler<FormProductCardValueType>;
    onExit: () => void;
};

export function ProductFormDialog({
    isOpen,
    onClose,
    dialogTitle,
    dialogContentText,
    buttonText,
    control,
    handleSubmit,
    onSubmit,
    onExit
}: ProductCardDialogProps) {
    console.log('product form dialog')
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            slotProps={{
                transition: {
                    onExited: () => {
                        onExit();
                    },
                },
            }}
        >
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>{dialogContentText}</DialogContentText>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <ControllerTextField
                        name="urlImage"
                        control={control}
                        label="Url Image"
                        fullWidth
                        autoFocus
                        sx={{ mt: 2 }}
                    />

                    <ControllerTextField
                        name="cardName"
                        control={control}
                        label="Card Name"
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                    <ControllerTextField
                        name="cardDesc"
                        control={control}
                        label="Card Description"
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                    <DialogActions>
                        <Button type="button" onClick={onClose}>Cancel</Button>
                        <Button variant="contained" color="success" type="submit">
                            {buttonText}
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
}
