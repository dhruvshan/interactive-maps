import {useState, useMemo, useCallback} from 'react';
import {SimpleMeshLayer} from '@deck.gl/mesh-layers';
import {IconLayer} from '@deck.gl/layers';
import {GeoJsonLayer} from '@deck.gl/layers';
import {SphereGeometry} from '@luma.gl/engine';
import {DeckGL} from '@deck.gl/react';
import {ArcLayer} from '@deck.gl/layers';
import {COORDINATE_SYSTEM,_GlobeView as GlobeView,  LightingEffect,
    AmbientLight,
    _SunLight as SunLight} from '@deck.gl/core';
import {FlyToInterpolator} from '@deck.gl/core';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { f1Data_2025 } from "../../data/f1_2025_data";
import { Button, Typography } from '@mui/material';

const EARTH_RADIUS_METERS = 6.3e6;
const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 0.5
});
const sunLight = new SunLight({
  color: [255, 255, 255],
  intensity: 1.0,
  timestamp: new Date()
});
// create lighting effect with light sources
const lightingEffect = new LightingEffect({ambientLight, sunLight});

function F1Globe(){
  const CITIES=f1Data_2025
  const [counter, setCounter] = useState(0)
  const [initialViewState, setInitialViewState] = useState(CITIES[0]);
  const [arcLayers,setArcLayer] = useState([])
  const [backButtonState, setBackButtonState] = useState(false);
  
//   CITIES[counter].latitude = CITIES[counter].latitude**2
  function incrementRace(){
      if(counter+1<CITIES.length){
        setCounter(counter + 1)
        setArcLayer([...arcLayers,
          new ArcLayer({
            id: "ArcLayer"+counter+1,
            data: CITIES[counter],
            getSourceColor: [Math.sqrt(CITIES[counter].longitude*500),  Math.random() * (100 - 0) + 100, Math.sqrt(CITIES[counter].latitude*500)], 
            getTargetColor: [Math.sqrt(CITIES[counter].to_longitude*500),  Math.random() * (100 - 0) + 0, Math.sqrt(CITIES[counter].to_latitutde*500)],
            getSourcePosition: [CITIES[counter].longitude, CITIES[counter].latitude],
            getTargetPosition: [CITIES[counter].to_longitude, CITIES[counter].to_latitutde],
            getWidth: 3,
            getHeight:0.01,
            pickable: true
          }),
        ])
        setInitialViewState({
          ...CITIES[counter+1],
          transitionInterpolator: new FlyToInterpolator({speed: 2}),
          transitionDuration: 'auto'
          });
      }
    }
  
  
  function decrementRace(){
    if(counter>0){
      setCounter(counter - 1)
      arcLayers.pop()
      setArcLayer(arcLayers)
      setInitialViewState({
        ...CITIES[counter-1],
        transitionInterpolator: new FlyToInterpolator({speed: 2}),
        transitionDuration: 'auto'
      })
    }else{setBackButtonState(true)}
  }

  const backgroundLayers = useMemo(
    () => [
      new SimpleMeshLayer({
        id: 'earth-sphere',
        data: [0],
        mesh: new SphereGeometry({radius: EARTH_RADIUS_METERS, nlat: 18, nlong: 36}),
        coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
        getPosition: [0, 0, 0],
        getColor: [255, 255, 255]
      }),
      new GeoJsonLayer({
        id: 'earth-land',
        data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_land.geojson',
        stroked: false,
        filled: true,
        opacity: 0.1,
        getFillColor: [30, 80, 120]
      }),
      new IconLayer({
        id:"IconLayer",
        data:CITIES,
        getColor: (d) => [100, 100, 0],
        getPosition: (d) => d.coordinates.reverse(),
        getSize: 32,
        getIcon: (d) => ({
            url:'country/Australia.png',
            width:128,
            height:128,            
        }),
        iconMapping: {
            "marker": {
            "x": 0,
            "y": 0,
            "width": 50,
            "height": 84,
            "anchorY": 42,
            },
            "marker-warning": {
            "x": 128,
            "y": 0,
            "width": 128,
            "height": 128,
            "anchorY": 128,
            "mask": false
            }
            },
        pickable: true,
      }),
    ],
    []
  );
  const getTooltip = useCallback(({object})=>{
    return object && {
        html:`
        <div>
            <b>${object.name}</b>
            <p>${object.circuit}</p>
        </div>`,
        style:{
            backgroundColor: "white",
            color: "black",
        }
    };
  },[])
  return (
    <div style={{ width:"100%"}}>
      <div style={{margin:"auto", display:"flex", justifyContent:"center", maxWidth:"100%"}}>
        <Button disabled={counter>0?false:true} onClick={decrementRace}><ArrowBackIcon/> </Button>
          <div style={{display:"flex", gap:"10px", flexWrap:"wrap", flexDirection:"column", width:'250px', maxWidth:'250px'}}>
            <Typography>{CITIES[counter].name}</Typography>
            <Typography >{CITIES[counter].official_name}</Typography>
            <Typography >{CITIES[counter].circuit}</Typography>
            <Typography >{CITIES[counter].start_date} to {CITIES[counter].end_date}</Typography>
          </div>
        <Button disabled={counter+1<CITIES.length?false:true} onClick={incrementRace}><ArrowForwardIcon /></Button>
      </div>
      <br></br>
      <div style={{height:"100vh", width:"100%", position:"relative"}}>
        <DeckGL
            initialViewState={initialViewState}
            layers={[backgroundLayers, arcLayers]}
            controller={true}
            effects={[lightingEffect]}
            getTooltip={getTooltip}
            views={new GlobeView()}
        >
        </DeckGL>
      </div>
    </div>
  );
}

export default F1Globe;