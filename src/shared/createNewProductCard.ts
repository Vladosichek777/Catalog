import {type FormProductCardValueType} from "./types/index";
import {v4 as uuidv4} from "uuid";

export function createNewProductCard(newCardData: FormProductCardValueType) {
    const {cardName, cardDesc, urlImage} = newCardData;
    return {id: uuidv4(), name: cardName, description: cardDesc, src: urlImage};
}
