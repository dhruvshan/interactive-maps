import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import OverseasMilitaryBases from "./pages/OverseasMilitaryBase";
import { useState } from "react";
import CategoriesPage from "./pages/Categories";
import Formula1 from "./pages/Formula1";

let darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

let lightTheme = createTheme({
  palette:{
    mode: 'light'
  }
})

darkTheme = responsiveFontSizes(darkTheme)
lightTheme = responsiveFontSizes(lightTheme)

function App() {
  // const[appTheme, setAppTheme] = useState(darkTheme)
  const[isDark, setIsDark] = useState(true)

  function handleThemeChange(){
    setIsDark(!isDark)
  }

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{width:'100vw', height:'100vh', display:'flex', flexDirection:'column'}}>
          <Header isDark={isDark} changeTheme={handleThemeChange} />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/overseas-military-bases" element={<OverseasMilitaryBases/>} />
            <Route path="/formula-1" element={<Formula1 />} />
            <Route path='/categories' element={<CategoriesPage />} />
          </Routes>
          <Footer />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
