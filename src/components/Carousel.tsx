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
  item: { name: string; description: string; link: string };
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
        image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
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
      description: "A map of all the landings on the Moon",
      link: "/moon-landing",
    },
    {
      name: "Map of the Highest Points",
      description: "A map of all the highest points in each country!",
      link: "/highest-points",
    },
    {
      name: "Map of Formula 1 Races",
      description: "A map of all the F1 races in 2025 and before",
      link: "/formula-1",
    },
    {
      name: "Map of WW1 Battles",
      description: "A map of the Major WW1 Battles",
      link: "/ww1",
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
