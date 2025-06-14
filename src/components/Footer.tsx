import { Container, Divider, Typography } from "@mui/material";

function Footer() {
  return (
      <Container sx={{textAlign:'center', display:'flex', flexDirection:'column', gap:'1rem', width:'100%'}}>
        <Divider sx={{width:'100%'}} />
        <Typography variant="subtitle1">
          &copy; {new Date().getFullYear()} Interactive Maps & DhruvShan
        </Typography>
      </Container>
  );
}

export default Footer;
