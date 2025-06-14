import { Box, Container, Typography } from "@mui/material";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   LayersControl,
//   LayerGroup,
// } from "react-leaflet";
// import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import F1Globe from "../components/F1Globe";

export default function Formula1(){
    return(
        <Box>
            <Container>
                <Typography>FORMULA 1</Typography>
                <F1Globe />
            </Container>
        </Box>
    )
}