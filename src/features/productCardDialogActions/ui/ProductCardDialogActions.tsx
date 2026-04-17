import { ProductFormDialog } from "../../../entities/productFormDialog/index";
import { useSetFormValues } from "../hooks/useSetFormValues";
import { useCallback } from "react";
import { type FormProductCardValueType } from "../../../shared/types/index";
import { type Product } from "../../../shared/types/index";
import { handleSubmitPopUpCardActions } from "../model/handleSubmitPopUpCardActions";
import { memo } from "react";

type ProductCardDialogActions = {
    currentEditCard: Product | null;
    setCurrentEditCard: (currentCardData: Product | null) => void;
    isOpen: boolean;
    onClose: () => void;
    editCard: (newCardData: FormProductCardValueType, id: string) => void;
    addNewCard: (newCardData: Product) => void;
};




export const ProductCardDialogActions = memo((props: ProductCardDialogActions) => {
    const { currentEditCard, setCurrentEditCard, isOpen, onClose, editCard, addNewCard } = props;
    const { isEditMode, control, handleSubmit, reset } = useSetFormValues(currentEditCard);

    const onSubmit = useCallback((currentPopUpValue: FormProductCardValueType) => {
        handleSubmitPopUpCardActions(currentPopUpValue, currentEditCard, onClose, reset, editCard, addNewCard);
    }, [currentEditCard, onClose, reset, editCard, addNewCard])

    const handleExit = useCallback(() => {
        setCurrentEditCard(null);
        reset();
    }, [setCurrentEditCard, reset]);

    const dialogTitle = isEditMode ? "Update current card" : "Add New Card";
    const dialogContentText = isEditMode ? "Enter new value" : "Enter a value for the new product card";
    const buttonText = isEditMode ? "Done" : "Add Card";
    console.log('product card dialog actions')


    return (
        <ProductFormDialog
            isOpen={isOpen}
            onClose={onClose}
            dialogTitle={dialogTitle}
            dialogContentText={dialogContentText}
            buttonText={buttonText}
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            onExit={handleExit}
        />
    );
})