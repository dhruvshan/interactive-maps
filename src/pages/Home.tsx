import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import "../App.css";
import CardCarousel from "../components/Carousel";
import { useNavigate } from "react-router";
import Categories from "../components/CategoriesSection";

function Home() {
  const navigate = useNavigate();

  function handleMainClick() {
    navigate("/overseas-military-bases");
  }
  
  return (
    <Container
      maxWidth="xl"
      sx={{
        paddingTop: "1rem",
        flex: "1",
        display: "flex",
        flexDirection: "column",
        gap: "3rem",
      }}
      className="body-font"
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Typography variant="h4">Featured Map</Typography>
        <Card sx={{ display: "flex", height: "300px", gap: "1rem" }}>
          <CardMedia
            component="img"
            sx={{ width: "40%" }}
            image="/preview-imgs/overseas-military-bases.png"
            alt="Overseas Military Bases"
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 1 auto" }}>
              <Typography variant="h5">
                Map of known Overseas Military Bases
              </Typography>
              <Typography variant="body1">
                Shows a map of all the overseas Military Bases of several
                countries across the world. With the US leading here as
                expected.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" onClick={handleMainClick}>
                View More
              </Button>
            </CardActions>
          </Box>
        </Card>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Typography variant="h4">Latest Maps</Typography>
        <CardCarousel />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Typography variant="h4">Categories</Typography>
        <Categories />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Typography variant="h4">About Us</Typography>
        {/* <CardCarousel /> */}
      </Box>
    </Container>
  );
}

export default Home;
