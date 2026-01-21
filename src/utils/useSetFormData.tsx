import {useEffect} from "react";
import {useForm} from "react-hook-form";

function useSetFormData(currentEditCard) {
    const isEditMode = Object.keys(currentEditCard).length !== 0;
    const {control, handleSubmit, reset} = useForm({
        defaultValues: {
            urlImage: currentEditCard.src,
            cardName: currentEditCard.name,
            cardDesc: currentEditCard.description,
        },
    });

    useEffect(() => {
        if (!isEditMode) {
            reset({urlImage: "", cardName: "", cardDesc: ""});
        }
    }, [isEditMode]);

    return {isEditMode, control, handleSubmit, reset};
}
export default useSetFormData;
