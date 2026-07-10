import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static" sx={{ width: "100%" }}>
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography variant="h6" component="div">
          🎯 My App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
