import React from "react";
import { styled } from "@mui/material/styles";
import MuiPaper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useMediaQuery, useTheme } from "@mui/material";

const Paper = styled(MuiPaper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 170,
  minWidth: 170,
  boxSizing: "border-box",

  [theme.breakpoints.down("md")]: {
    height: 150,
    minWidth: 150,
  },
}));

export type ChordPaperProps = {
  chord: string;
  className?: string;
};

export const ChordPaper: React.FC<ChordPaperProps> = ({ chord, className }) => {
  const theme = useTheme();
  const isLowerThanLg = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Paper elevation={3} className={className}>
      <Typography variant={isLowerThanLg ? "h3" : "h2"}>{chord}</Typography>
    </Paper>
  );
};
