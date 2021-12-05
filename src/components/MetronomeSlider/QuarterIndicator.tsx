import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import Box from "@mui/material/Box";

export type QuarterIndicatorProps = {
  currentQuarter: number;
};

export const QuarterIndicator: React.FC<QuarterIndicatorProps> = ({
  currentQuarter,
}) => {
  const icons = Array.from({ length: 4 }, (_, cur) => {
    const IconComponent =
      cur === currentQuarter ? CircleIcon : CircleOutlinedIcon;

    return <IconComponent key={cur} fontSize="large" color="primary" />;
  });

  return <Box display="flex">{icons}</Box>;
};
