import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        py: 2,
        textAlign: "center",
        bgcolor: "grey.900",
        color: "grey.100",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} My App. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
