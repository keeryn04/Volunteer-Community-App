import React from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import UserQuests from "../../Components/UserComponents/UserQuests";
import UserRewards from "../../Components/UserComponents/UserRewards";
import Header from "../../Components/GeneralComponents/Header";

const Profile: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <Header />
        <Box sx={{ width: "100%", mt: 8 }}>
        {/* Tabs Section */}
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            centered
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="My Quests" />
            <Tab label="My Rewards" />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <Box sx={{ p: 3 }}>
          {selectedTab === 0 && (
            <Box>
              <UserQuests />
            </Box>
          )}
          {selectedTab === 1 && (
            <Box>
              
              <UserRewards />
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
