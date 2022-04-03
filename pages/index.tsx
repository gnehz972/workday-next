import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { WorkCalendar } from "../component/WorkCalendar";
import { connectToDatabase } from "../utils/mongodb";
import { CalendarEvent } from "../models/CalendarEvent";
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
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useState } from "react";
import { ExportBoard } from "../component/ExportBoard";

type CalendarEventProps = {
  title: string;
  employee: string;
  shift: string;
  start: Date;
  end: string;
  created: string;
};
type Props = {
  eventProps: CalendarEvent[];
};

const drawerWidth = 240;

const Home = ({ eventProps }: Props) => {
  console.log(eventProps);
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

        {currentItem === "Calendar" && <WorkCalendar events={eventProps} />}
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
  const { db } = await connectToDatabase();

  const result = (await db
    .collection("Event")
    .find({})
    .toArray()) as CalendarEvent[];

  console.log(result);

  return {
    props: { eventProps: JSON.parse(JSON.stringify(result)) },
  };
};
