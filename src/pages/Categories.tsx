import { Box, Container, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";

export default function CategoriesPage() {
    const [filter, setFilter] = useState('')
    function handleFilter(){
        setFilter(event?.target.value)
    };
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
      <Typography variant="h4">Maps by Categories</Typography>
      <Box>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            label="Age"
            onChange={handleFilter}
          >
            <MenuItem value={'military'}>Military</MenuItem>
            <MenuItem value={'space'}>Space</MenuItem>
            <MenuItem value={'sports'}>Sports</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Container>
  );
}
