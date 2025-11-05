import {useForm, Controller} from "react-hook-form";
import {TextField, Button, Box, Typography} from "@mui/material";
import {useNavigate, useLocation} from "react-router-dom";

export default function Login({sessionData, setSessionData}) {
  const {control, handleSubmit} = useForm({
    defaultValues: {userName: "", password: ""},
  });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const defaultEntryValue = [
    {name: "admin", password: "12345"},
    {name: "user", password: "67890"},
  ];

  const onSubmit = (entryData) => {
    const isUserExist = defaultEntryValue.some(
      (user) => user.name === entryData.userName && user.password === entryData.password
    );
    const localStorageData = JSON.parse(localStorage.getItem("sessionData"));

    if (!isUserExist) {
      alert("check your data");
      return;
    }

    const role = entryData.userName;
    const updatedData = localStorageData ? {...localStorageData, activeUser: role} : {...sessionData, activeUser: role};
    localStorage.setItem("sessionData", JSON.stringify(updatedData));
    setSessionData(updatedData);

    if (from === "/" || from === "/login") {
      navigate(`/${role}`, {replace: true});
    } else {
      navigate(from, {replace: true});
    }
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
