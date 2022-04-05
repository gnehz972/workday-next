import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { GetServerSideProps } from "next";
import { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ExportBoard } from "../component/ExportBoard";
import { WorkCalendar } from "../component/WorkCalendar";
import { Employees } from "../config/data";
import { CalendarEvent } from "../models/CalendarEvent";
import { Employee } from "../models/Employee";

const drawerWidth = 240;

type Props = {
  employees: Employee[];
};

const Home = ({ employees }: Props) => {
  const [currentItem, setCurrentItem] = useState("Calendar");

  const onClickItem = (item: string) => {
    setCurrentItem(item);
  };
  const itemsTop = ["Calendar", "Dashboard", "Export excel", "Stastic"];
  const itemsBottom = ["Account", "Setting"];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Work day
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {itemsTop.map((text, index) => {
              return (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    selected={text === currentItem}
                    onClick={() => {
                      onClickItem(text);
                    }}
                  >
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <Divider />
          <List>
            {itemsBottom.map((text, index) => {
              return (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    selected={text === currentItem}
                    onClick={() => {
                      onClickItem(text);
                    }}
                  >
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        <WorkCalendar
          visible={currentItem === "Calendar"}
          employees={employees}
        />
        {currentItem === "Export excel" && <ExportBoard />}

        {currentItem !== "Calendar" && currentItem !== "Export excel" && (
          <Typography paragraph>{currentItem}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  return {
    props: { employees: Employees },
  };
};
