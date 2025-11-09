import React from "react";
import { useState, useEffect } from "react";

import { Grid, Box } from "@mui/material";

import type Event from "../../../interfaces/Event";
import { EventState } from "../../../enums/EventState.enum";

//Components
import UserQuestsEventCard from "./UserQuestsEventCard";

const VolunteerBoard: React.FC = () => {

  const [loadedEvents, setLoadedEvents] = useState<Event[]>(
    [
        {
            "eventId": "0",
            "title": "Community Clean-Up",
            "description": "Join us to help clean up the local park and surrounding areas.",
            "location": "Riverside Park",
            "time": "2025-11-10T09:00:00",
            "organizationLabel": "GreenFuture Org",
            "volunteers": [{
              "userId": "",
              "username": ""
            }],
            "currentState": EventState.PENDING
        },
        {
            "eventId": "1",
            "title": "Food Bank Drive",
            "description": "Help collect and organize food donations for families in need.",
            "location": "Downtown Community Center",
            "time": "2025-11-15T13:30:00",
            "organizationLabel": "Helping Hands",
            "volunteers": [{
              "userId": "",
              "username": ""
            }],
            "currentState": EventState.PENDING
        },
        {
            "eventId": "2",
            "title": "Tree Planting Day",
            "description": "Assist in planting trees to support local reforestation efforts.",
            "location": "Maple Grove",
            "time": "2025-11-20T10:00:00",
            "organizationLabel": "EarthCare Initiative",
            "volunteers": [{
              "userId": "",
              "username": ""
            }],
            "currentState": EventState.PENDING
        },
        {
            "eventId": "3",
            "title": "Blood Donation Camp",
            "description": "Donate blood and save lives at our community blood drive.",
            "location": "Health and Wellness Center",
            "time": "2025-11-25T11:00:00",
            "organizationLabel": "LifeFlow Foundation",
            "volunteers": [{
              "userId": "",
              "username": ""
            }],
            "currentState": EventState.PENDING
        },
        {
            "eventId": "4",
            "title": "Winter Clothing Drive",
            "description": "Collect warm clothing for those in need this winter season.",
            "location": "City Hall Atrium",
            "time": "2025-12-01T14:00:00",
            "organizationLabel": "WarmHearts Society",
            "volunteers": [{
              "userId": "",
              "username": ""
            }],
            "currentState": EventState.PENDING
        }
    ]
  )

  return (
    <div>
      <main style={{ paddingTop: "70px" }}>
        <Box width="100%" height="100%" sx={{display:"flex", justifyContent:"center"}}>
          <Grid container rowSpacing={8} columnSpacing={12} justifyContent="center">
            {loadedEvents.map((item, index) => (
              <Grid>
                <UserQuestsEventCard
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

export default VolunteerBoard;
