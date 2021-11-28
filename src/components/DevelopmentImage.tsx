import React from "react";
import { styled } from "@mui/material/styles";

const Img = styled("img")(() => ({
  maxWidth: "100%",
  maxHeight: "100%",
  margin: "auto",
  display: "block",
}));

export const DevelopmentImage: React.FC = () => (
  <Img src="development.png" alt="Development" />
);
