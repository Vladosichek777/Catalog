import {type FormProductCardValueType} from "../../../shared/types/index";
import {createNewProductCard} from "../../../shared/utils/createNewProductCard";
import {type Product} from "../../../shared/types/index";

export function handleSubmitPopUpCardActions(
    currentPopUpValue: FormProductCardValueType,
    currentEditCard: Product | null,
    onClose: () => void,
    reset: (values: FormProductCardValueType) => void,
    editCard: (newCardData: FormProductCardValueType, id: string) => void,
    addNewCard: (newCardData: Product) => void,
) {
    if (currentEditCard !== null) {
        editCard(currentPopUpValue, currentEditCard.id);
    }
    if (currentEditCard === null) {
        const newProductCard = createNewProductCard(currentPopUpValue);
        addNewCard(newProductCard);
    }

    onClose();
    reset({urlImage: "", cardName: "", cardDesc: ""});
}
