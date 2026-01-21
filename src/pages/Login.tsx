import SessionContext from "../utils/SessionContext.ts";
import getIsUserExist from "../utils/getIsUserExist.ts";
import {useContext} from "react";
import {useForm, Controller} from "react-hook-form";
import {TextField, Button, Box, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {type SessionData} from "../utils/SessionContext.ts";

export type EntryDataType = {
    userName: string;
    password: string;
};

export default function Login(): React.ReactElement {
    const {control, handleSubmit} = useForm({
        defaultValues: {userName: "", password: ""},
    });
    const navigate = useNavigate();
    const session = useContext(SessionContext);

    const onSubmit = (entryData: EntryDataType): void => {
        const role: string = entryData.userName;
        const isUserExist = getIsUserExist(entryData);

        //TODO: connect ZOD validation
        if (!isUserExist) {
            alert("check your data");
            return;
        }

        const updatedData: SessionData = {...session.sessionData, activeUser: role};
        session.updateSessionData(updatedData);

        navigate(`/${role}/catalog`, {replace: true});
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
                    width: {lg: "30vw", sm: "50vw", xs: "60vw"},
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
                            fontSize: {xs: "30px", sm: "35px", lg: "48px"},
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
                    <Controller
                        name="userName"
                        control={control}
                        render={({field}) => (
                            <TextField
                                {...field}
                                label="User name"
                                fullWidth
                                sx={{
                                    mb: 1,
                                    mt: 3,
                                    "& .MuiInputBase-input": {color: "white"},
                                    "& .MuiInputLabel-root": {color: "white"},
                                    "& .MuiOutlinedInput-notchedOutline": {borderColor: "white"},
                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#ddd",
                                    },
                                    "& .MuiInputLabel-root.Mui-focused": {color: "#fff"},
                                }}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({field}) => (
                            <TextField
                                {...field}
                                type="password"
                                label="Password"
                                fullWidth
                                sx={{
                                    mb: 1,
                                    mt: 3,
                                    "& .MuiInputBase-input": {color: "white"},
                                    "& .MuiInputLabel-root": {color: "white"},
                                    "& .MuiOutlinedInput-notchedOutline": {borderColor: "white"},
                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#ddd",
                                    },
                                    "& .MuiInputLabel-root.Mui-focused": {color: "#fff"},
                                }}
                            />
                        )}
                    />
                    <Button type="submit" variant="contained" size="large" sx={{display: "block", mt: 4, ml: "auto"}}>
                        Log in
                    </Button>
                </form>
            </Box>
        </Box>
    );
}
