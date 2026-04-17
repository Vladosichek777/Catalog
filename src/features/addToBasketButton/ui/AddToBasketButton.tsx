import Button from "@mui/material/Button";


type AddToBasketButtonType = {
    onClick: () => void;
    statusBuyButton: boolean;
};

export function AddToBasketButton({ onClick, statusBuyButton }: AddToBasketButtonType) {
    return (
        <Button onClick={onClick} variant="contained" disabled={statusBuyButton} size="small" color="success">
            {!statusBuyButton ? "Add to basket" : "Done \u2713"}
        </Button>
    );
}
