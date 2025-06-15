import {
  Button,
  CardContent,
  CardActions,
  Card,
  Typography,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router";

function Item({
  item,
}: {
  item: { name: string; imgUrl:string, description: string; link: string };
}) {
  const navigate = useNavigate();
  function handleClick(link: string) {
    navigate(link);
  }
  return (
    <Card style={{ minWidth: "200px", maxWidth: "345px" }} variant="outlined">
      <CardMedia
        component="img"
        height="140"
        image={item.imgUrl}
        alt="green iguana"
      />
      <CardContent>
        <Typography variant="h5">{item.name}</Typography>
        <Typography variant="body2">{item.description}</Typography>
      </CardContent>
      <CardActions>
        <Button className="CheckButton" onClick={()=>handleClick(item.link)}>
          Check it out!
        </Button>
      </CardActions>
    </Card>
  );
}

export default function CardCarousel() {
  const items = [
    {
      name: "Map of Moon Landings",
      imgUrl: '/preview-imgs/moon-impacts.png',
      description: "A map of all the landings on the Moon",
      link: "/moon-landing",
    },
    {
      name: "Map of the Highest Points",
      imgUrl: '/preview-imgs/mountains.png',
      description: "A map of all the highest points in each country!",
      link: "/highest-points",
    },
    {
      name: "Map of Formula 1 Races",
      imgUrl: '/preview-imgs/f1-2025.png',
      description: "A map of all the F1 races in 2025 and before",
      link: "/formula-1",
    },
  ];

  return (
    <div className="scrolling-wrapper">
      {items.map((item, i) => (
        <div className="card">
          <Item key={i} item={item} />
        </div>
      ))}
    </div>
  );
}
