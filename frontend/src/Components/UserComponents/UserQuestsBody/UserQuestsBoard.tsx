import React from "react";
import { useState, useEffect } from "react";

import { Grid, Box } from "@mui/material";

import type Event from "../../../interfaces/Event";
import { EventState } from "../../../enums/EventState.enum";

//Components
import UserQuestsEventCard from "./UserQuestsEventCard";
import { useCookies } from "react-cookie";
import type { CookieValues } from "../../../interfaces/Cookies";
import { getAllEvents, getUserEvents } from "../../../services/event.service";

const VolunteerBoard: React.FC = () => {

  const [cookies, setCookie, removeCookie] = useCookies<'USER_ID', CookieValues>(['USER_ID']);
  const [loadedEvents, setLoadedEvents] = useState<Event[]>([])
  const [userEventIds, setUserEventIds] = useState<String[]>([]);
  
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

  useEffect(() => {
      fetchEvents();
      fetchUserEvents();
    }, []);

  return (
    <div>
      <main style={{ paddingTop: "70px" }}>
        <Box width="100%" height="100%" sx={{display:"flex", justifyContent:"center"}}>
          <Grid container rowSpacing={8} columnSpacing={12} justifyContent="center">
            {loadedEvents.map((item, index) => (
              userEventIds.includes(item.eventId) && ( //Only load event if it is with the user
              <Grid key={index}>
                <UserQuestsEventCard
                  event={item}
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
