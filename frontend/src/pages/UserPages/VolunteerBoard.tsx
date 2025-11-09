import React from "react";
import Header from "../../Components/GeneralComponents/Header";
import { useState, useEffect } from "react";
import { getAllEvents, getUserEvents } from "../../services/event.service";

import { Grid, Box } from "@mui/material";

import type Event from "../../interfaces/Event";

//Components
import EventCard from "../../Components/UserComponents/EventCard";
import { useCookies } from "react-cookie";
import type { CookieValues } from "../../interfaces/Cookies";

const VolunteerBoard: React.FC = () => {

  const [loadedEvents, setLoadedEvents] = useState<Event[]>([]);
  const [userEventIds, setUserEventIds] = useState<String[]>([]);
  const [reloadEvents, setReloadEvents] = useState<boolean>(false);
  const [cookies, setCookie, removeCookie] = useCookies<'USER_ID', CookieValues>(['USER_ID']);

  const fetchEvents = async () => {
      const userId = cookies.USER_ID;
      const events: Event[] = (await getAllEvents(userId)).events
      setLoadedEvents(events);
  }
  const fetchUserEvents = async () => {
    const userId = cookies.USER_ID;
    const userEventIds: String[] = (await getUserEvents(userId)).appliedEventIds
    setUserEventIds(userEventIds);
  }
  const triggerReloadEvents = () => {
    setReloadEvents(true);
  }

  useEffect(() => {
    fetchEvents();
    fetchUserEvents();
  }, []);
  useEffect(() => {
    if(reloadEvents) fetchUserEvents();
  }, [reloadEvents])

  return (
    <div>
      <Header />
      <main style={{ paddingTop: "70px" }}>
        <Box width="100%" height="100%" sx={{display:"flex", justifyContent:"center"}}>
          <Grid container rowSpacing={8} columnSpacing={12} justifyContent="center">
            {loadedEvents.length > 0 && loadedEvents.map((item, index) => (
              !userEventIds.includes(item.eventId) && ( //Only load the card if the user doesn't already have it
                <Grid key={index}>
                  <EventCard
                    event={item}
                    onReloadEvents={triggerReloadEvents}
                  />
                </Grid>
              )
            ))}
          </Grid>
        </Box>
      </main>
    </div>
  );
};

export default VolunteerBoard;
