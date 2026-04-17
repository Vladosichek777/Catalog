
import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form";
import { TextField, type TextFieldProps } from "@mui/material";

type ControllerTextFieldProps<TFieldValues extends FieldValues> = {
    name: FieldPath<TFieldValues>;
    control: Control<TFieldValues>;
} & TextFieldProps;

export function ControllerTextField<TFieldValues extends FieldValues>({
    name,
    control,
    ...textFieldProps
}: ControllerTextFieldProps<TFieldValues>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <TextField
                    {...field}
                    {...textFieldProps}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message ?? textFieldProps.helperText}
                />
            )}
        />
    );
}