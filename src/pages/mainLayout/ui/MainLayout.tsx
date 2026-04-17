import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import { LogOutButton } from "../../../features/LogOutButton";
import { ToolBarMenu } from "../../../widgets/toolBarMenu";

export function MainLayout() {
    console.log('main layout')
    return (
        <Container maxWidth="lg" sx={{ outline: "5px solid red" }}>
            <Box>
                <ToolBarMenu>
                    <LogOutButton />
                </ToolBarMenu>
            </Box>
            <Outlet />
        </Container>
    );
}
