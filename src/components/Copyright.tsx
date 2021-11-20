import React from "react";
import Typography, { TypographyProps } from "@mui/material/Typography";
import Link from "@mui/material/Link";

export const Copyright: React.FC<TypographyProps> = (props) => (
  <Typography
    variant="body2"
    color="text.secondary"
    align="center"
    {...props}
    sx={{ margin: "8px 0" }}
  >
    {"Copyright © "}
    <Link color="inherit" href="https://mui.com/">
      Your Website
    </Link>{" "}
    {new Date().getFullYear()}
    {"."}
  </Typography>
);
