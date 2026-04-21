import { Box, Button, Typography } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { ControllerTextField } from "../../../shared/components/ControllerTextField";
import { handleSubmitLoginForm, } from "../model/handleSubmitLoginForm";
import { entryDataSchema, type EntryDataSchemaType } from "../model/entrySchema";

export function Login(): React.ReactElement {
    const navigate = useNavigate();

    const { control, handleSubmit, } = useForm<EntryDataSchemaType>({
        defaultValues: { userName: 'admin', password: '12345' },
        resolver: zodResolver(entryDataSchema)
    });

    const onSubmit: SubmitHandler<EntryDataSchemaType> = (entryData) => {
        handleSubmitLoginForm(entryData, navigate);
    };

    return (
        <Box
            sx={{
                border: "1px solid #978f8f",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100vw",
                backgroundColor: "#000000de",
                boxSizing: "border-box",
            }}
        >
            <Box
                sx={{
                    border: "2px solid #978f8f",
                    borderRadius: "20px",
                    width: { lg: "30vw", sm: "50vw", xs: "60vw" },
                    p: 3,
                }}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Typography
                        variant="h3"
                        gutterBottom
                        color="#bdbdbd"
                        sx={{
                            textAlign: "center",
                            fontSize: { xs: "30px", sm: "35px", lg: "48px" },
                        }}
                    >
                        Log In
                    </Typography>
                    <Typography variant="h6" color="#bdbdbd" gutterBottom>
                        Welcome user, please log in to continue:
                    </Typography>
                    <Typography variant="subtitle2" color="#bdbdbd">
                        login: user, password: 67890
                        <br />
                        login: admin, password:12345
                    </Typography>
                    <ControllerTextField
                        name="userName"
                        control={control}
                        label="User name"
                        fullWidth
                        sx={{
                            mb: 1,
                            mt: 3,
                            "& .MuiInputBase-input": { color: "white" },
                            "& .MuiInputLabel-root": { color: "white" },
                            "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#ddd",
                            },
                            "& .MuiInputLabel-root.Mui-focused": { color: "#fff" },
                        }}
                    />
                    <ControllerTextField
                        name="password"
                        control={control}
                        type="password"
                        label="Password"
                        fullWidth
                        sx={{
                            mb: 1,
                            mt: 3,
                            "& .MuiInputBase-input": { color: "white" },
                            "& .MuiInputLabel-root": { color: "white" },
                            "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#ddd",
                            },
                            "& .MuiInputLabel-root.Mui-focused": { color: "#fff" },
                        }}
                    />
                    <Button type="submit" variant="contained" size="large" sx={{ display: "block", mt: 4, ml: "auto" }}>
                        Log in
                    </Button>
                </form>
            </Box>
        </Box>
    );
}
