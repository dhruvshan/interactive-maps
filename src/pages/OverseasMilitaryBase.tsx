import { Box, Container, Typography } from "@mui/material";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import { bases } from "../../data/base_data";
import Article from "../articles/MilitaryBases/Article";

const legends = [
  {
    symbol: "*",
    description: "Exact Location and Base Name not known",
  },
  {
    symbol: "#",
    description: "Exact Location not known",
  },
  {
    symbol: "!",
    description: "Base Name not known",
  },
  {
    symbol: "^",
    description: "Not a direct station",
  },
];

const CountryIcon = Leaflet.Icon.extend({
  options: {
    shadowUrl: "leaflet/images/marker-shadow.png",
    iconSize: [32, 32],
    shadowSize: [32, 32],
  },
});

export default function OverseasMilitaryBases() {
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
    >
      <Typography variant="h4">Overseas Military Bases</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <Box>
          <Typography variant="h6">Legend</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", gap: "2rem" }}>
            {legends.map((legend) => (
              <Box
                key={legend.symbol}
                sx={{ display: "flex", flexDirection: "row", gap: "0.5rem" }}
              >
                <Typography>{legend.symbol}</Typography>
                <Typography>{legend.description}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <div style={{ height: "800px", width: "100%" }}>
          <MapContainer
            center={[51.505, -0.09]}
            zoom={3}
            minZoom={3}
            scrollWheelZoom
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              noWrap
            />
            <LayersControl position="topright">
              {bases.map((base) => {
                return (
                  <LayersControl.Overlay
                    checked
                    name={
                      `<div style="display:inline-flex; flex-direction:row; align-items:center; gap:1rem;">
                        <img src='/country/${base.country}.png' alt='flag of ${base.country}' />
                        <span>${base.country}</span>
                        </div>
                      `
                    }
                    key={base.country}
                  >
                    <LayerGroup key={base.country}>
                      {base.baseLocations.map((location, index) => {
                        return (
                          <Marker
                            position={[location.coordinates[0], location.coordinates[1]]}
                            icon={
                              new CountryIcon({
                                iconUrl: "country/" + base.country + ".png",
                              })
                            }
                            key={`location-${index}`}
                          >
                            <Popup key={`location-${index}`}>
                              <div>
                                <b>{location.baseName}</b>
                                <p>{location.location}</p>
                                <div
                                  style={{
                                    display: "flex",
                                    gap: "10px",
                                    alignItems: "center",
                                    maxWidth: "fit-content",
                                  }}
                                >
                                  <img
                                    style={{ width: "1.5em" }}
                                    src={"/country/" + base.country + ".png"}
                                    alt={"flag of" + base.country}
                                  />
                                  {base.country}
                                </div>
                                {location.alsoUsedBy ? (
                                  <div>
                                    <hr />
                                    Also used by: <br></br>
                                    <div
                                      style={{
                                        display: "flex",
                                        gap: "10px",
                                        alignItems: "center",
                                        maxWidth: "fit-content",
                                      }}
                                    >
                                      <img
                                        style={{ width: "1.5em" }}
                                        src={
                                          "/country/" +
                                          location.alsoUsedBy +
                                          ".png"
                                        }
                                        alt={"flag of" + base.country}
                                      />
                                      {location.alsoUsedBy}
                                    </div>
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </Popup>
                          </Marker>
                        );
                      })}
                    </LayerGroup>
                  </LayersControl.Overlay>
                );
              })}
            </LayersControl>
          </MapContainer>
        </div>
      </Box>
      <Article />
      <div>Map Info</div>
    </Container>
  );
}
