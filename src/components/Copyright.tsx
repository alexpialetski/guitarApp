import React from "react";
import Typography, { TypographyProps } from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

export const Copyright: React.FC<TypographyProps> = (props) => (
  <Box sx={{ margin: "8px 0", flex: "0 1 auto" }}>
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  </Box>
);
