import React, { useCallback } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ClassIcon from "@mui/icons-material/Class";
import ConstructionIcon from "@mui/icons-material/Construction";
import { useHistory } from "react-router-dom";

const LINKS: Array<{ path: string; text: string; Icon: React.ReactNode }> = [
  {
    path: "/",
    text: "Home",
    Icon: <DashboardIcon />,
  },
  {
    path: "/constructor",
    text: "Constructor",
    Icon: <ConstructionIcon />,
  },
  { path: "/lessons", text: "Lessons", Icon: <ClassIcon /> },
];

export const SideMenuListItems: React.FC = () => {
  const history = useHistory();

  const onButtonClick = useCallback(
    (path: string) => () => {
      history.push(path);
    },
    [history]
  );

  return (
    <List>
      {LINKS.map(({ Icon, text, path }) => (
        <ListItem button onClick={onButtonClick(path)}>
          <ListItemIcon>{Icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  );
};
