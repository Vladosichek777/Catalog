import Button from "@mui/material/Button";

type DeleteCardButtonType = {
    onDelete: (id: string) => void;
    id: string;
};

export function DeleteCardButton({ onDelete, id }: DeleteCardButtonType) {
    return (
        <Button onClick={() => onDelete(id)} size="small" color="error" variant="contained">
            Delete
        </Button>
    );
}
