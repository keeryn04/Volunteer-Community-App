import React from "react";
import Header from "../../Components/GeneralComponents/Header";
import { useState, useEffect } from "react";
import { getAllEvents } from "../../services/event.service";

import { Grid, Box } from "@mui/material";

import type Event from "../../interfaces/Event";
import { EventState } from "../../enums/EventState.enum";

import OrgEventCard from "../../Components/OrganizationComponents/OrgEventCard";

const MyEvents: React.FC = () => {

  const [loadedEvents, setLoadedEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const events: Event[] = (await getAllEvents()).events
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
              <Grid>
                <OrgEventCard
                  key={index}
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
