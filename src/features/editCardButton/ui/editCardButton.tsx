import Button from "@mui/material/Button";
import {type Product} from "../../../shared/types";

type EditCardButttonProps = {
    onEdit: (cardData: Product) => void;
    cardData: Product;
};

export function EditCardButton({onEdit, cardData}: EditCardButttonProps) {
    return (
        <Button onClick={() => onEdit(cardData)} size="small" color="warning" variant="outlined" sx={{pl: 3, pr: 3}}>
            Edit
        </Button>
    );
}
