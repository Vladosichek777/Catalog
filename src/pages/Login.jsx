import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import { useState } from "react";

export default function Login() {
  const { watch, control, handleSubmit } = useForm({ defaultValues: { userName: "", password: "" } });

  return (
    // <Container sx={{ border: "1px solid #978f8f", borderRadius: "20px", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100%", backgroundColor: "#000000de" }}>

    // </Container>
    <Box sx={{ border: "1px solid #978f8f", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100vw", backgroundColor: "#000000de", boxSizing: "border-box" }}>
      <Box sx={{ border: "2px solid #978f8f", borderRadius: "20px", width: "30vw", height: "55vh", p: 3 }}>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <Typography variant="h3" gutterBottom color="#bdbdbd" sx={{ textAlign: "center" }}>
            Log In
          </Typography>
          <Typography variant="subtitle1" color="#bdbdbd" gutterBottom>
            Welcome user, please log in to continue
          </Typography>
          <Controller
            name="userName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="User name"
                fullWidth
                sx={{
                  mb: 1,
                  mt: 3,
                  "& .MuiInputBase-input": { color: "white" },
                  "& .MuiInputLabel-root": { color: "white" },
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#ddd" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#fff" },
                }}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                label="Password"
                fullWidth
                sx={{
                  mb: 1,
                  mt: 3,
                  "& .MuiInputBase-input": { color: "white" },
                  "& .MuiInputLabel-root": { color: "white" },
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#ddd" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#fff" },
                }}
              />
            )}
          />
          <Button type="submit" variant="contained" size="large" sx={{ display: "block", mt: 4, ml: "auto" }}>
            Log in
          </Button>
        </form>
      </Box>
    </Box>
  );
}
