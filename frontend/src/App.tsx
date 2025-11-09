import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Test from './pages/Test.tsx'
import Volunteer from './pages/UserPages/VolunteerBoard.tsx'
import Profile from './pages/UserPages/Profile.tsx'
import Rewards from './pages/UserPages/RewardsStore.tsx'

//Themeing
import { ThemeProvider } from '@emotion/react'
import theme from './Theme.tsx'

//Pages
import LoginPage from './pages/GeneralPages/Login.tsx'
import CreateEvent from './pages/OrganizationPages/CreateEvent.tsx'


function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createEvent" element={<CreateEvent/>} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
