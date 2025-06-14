import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import BasicMenu from "./Menu";
import { Box, Button, Switch } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

function Header({
  isDark,
  changeTheme,
}: {
  isDark: boolean;
  changeTheme: any;
}) {
  const [isDarkChecked, setIsDarkChecked] = useState(isDark);
  const navigate = useNavigate()

  function handleChangeTheme() {
    setIsDarkChecked(!isDarkChecked);
    changeTheme();
  }

  function handleGoToHome(){
    navigate('/')
  }

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "black" }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button onClick={handleGoToHome}>
          <Typography
            variant="h4"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Interactive Maps
          </Typography>
          </Button>
          <Box sx={{display:'flex', flexDirection:'row'}}>
            <Switch checked={isDarkChecked} onChange={handleChangeTheme} />
            <BasicMenu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
