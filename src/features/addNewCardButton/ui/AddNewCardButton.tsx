import { Button } from "@mui/material";

type AddNewCardButtonProps = {
    onClick: () => void;
};

export function AddNewCardButton({ onClick }: AddNewCardButtonProps) {
    return (
        <Button onClick={onClick} variant="contained" size="large" color="success">
            Add new Card
        </Button>
    );
}
