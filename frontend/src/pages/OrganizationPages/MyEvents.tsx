import React from "react";
import Header from "../../Components/GeneralComponents/Header";
import { useState, useEffect } from "react";
import { getAllEvents} from "../../services/event.service";

import { Grid, Box } from "@mui/material";

import type Event from "../../interfaces/Event";

import OrgEventCard from "../../Components/OrganizationComponents/OrgEventCard";
import { useCookies } from "react-cookie";
import type { CookieValues } from "../../interfaces/Cookies";

const MyEvents: React.FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies<'USER_ID', CookieValues>(['USER_ID']);
  const [loadedEvents, setLoadedEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const userId: String = cookies.USER_ID;
      const events: Event[] = (await getAllEvents(userId)).events
      setLoadedEvents(events);
    }
    fetchEvents();
  }, []);

  return (
    <div>
      <Header />
      <main style={{ paddingTop: "70px" }}>
        <Box width="100%" height="100%" sx={{display:"flex", justifyContent:"center"}}>
          <Grid container rowSpacing={8} columnSpacing={12} justifyContent="center">
            {loadedEvents.map((item, index) => (
              <Grid
               key={index}>
                <OrgEventCard
                  event={item}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </main>
    </div>
  );
};

export default MyEvents;
