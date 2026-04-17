import {useEffect, useMemo} from "react";
import {useForm} from "react-hook-form";
import {type Product} from "../../../shared/types/index";
import {type FormProductCardValueType} from "../../../shared/types/index";

export function useSetFormValues(currentEditCard: Product | null) {
    const isEditMode = currentEditCard != null;
    const {control, handleSubmit, reset} = useForm<FormProductCardValueType>({
        defaultValues: {
            urlImage: "",
            cardName: "",
            cardDesc: "",
        },
    });

    useEffect(() => {
        if (currentEditCard) {
            reset({
                urlImage: currentEditCard.src,
                cardName: currentEditCard.name,
                cardDesc: currentEditCard.description,
            });
        } else {
            reset({
                urlImage: "",
                cardName: "",
                cardDesc: "",
            });
        }
    }, [currentEditCard, reset]);
    return useMemo(
        () => ({
            isEditMode,
            control,
            handleSubmit,
            reset,
        }),
        [isEditMode, control, handleSubmit, reset],
    );
}
