import { Box, CardContent, Card, Typography } from "@mui/material";

const categories = ["Military", "Space", "Sports"];

export default function Categories() {
  return (
    <Box sx={{display:'flex', flexDirection:'row', gap:'2rem'}}>
      {categories.map((category) => {
        return(
        <Card sx={{minWidth:'200px'}} variant="outlined">
          <CardContent>
            <Typography variant="h5">{category}</Typography>
          </CardContent>
        </Card>);
      })}
    </Box>
  );
}
