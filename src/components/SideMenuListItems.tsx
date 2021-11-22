import React, { useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ClassIcon from "@mui/icons-material/Class";
import ConstructionIcon from "@mui/icons-material/Construction";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

export const LINKS: Array<{
  path: string;
  text: string;
  Icon: React.ReactNode;
}> = [
  {
    path: "/games",
    text: "Games",
    Icon: <SportsEsportsIcon />,
  },
  { path: "/lessons", text: "Lessons", Icon: <ClassIcon /> },
  {
    path: "/constructor",
    text: "Constructor",
    Icon: <ConstructionIcon />,
  },
];

export const SideMenuListItems: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const onButtonClick = useCallback(
    (path: string) => () => {
      history.push(path);
    },
    [history]
  );
  const isLinkActive = (path: string) => location.pathname.includes(path);

  return (
    <List>
      {LINKS.map(({ Icon, text, path }) => (
        <ListItemButton
          key={path}
          onClick={onButtonClick(path)}
          selected={isLinkActive(path)}
        >
          <ListItemIcon>{Icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      ))}
    </List>
  );
};
