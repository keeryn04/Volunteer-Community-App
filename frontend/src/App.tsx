import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Test from './pages/Test.tsx'
import Volunteer from './pages/UserPages/VolunteerBoard.tsx'

//Themeing
import { ThemeProvider } from '@emotion/react'
import theme from './Theme.tsx'

//Pages
import LoginPage from './pages/GeneralPages/Login.tsx'

function Home() {
  const [count, setCount] = useState(0)

  const testAPI = async () => {
    console.log("Testing API...")
    const res = await fetch('/api/test')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setCount(count + 1)
      })
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => testAPI()}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/volunteerBoard" element={<Volunteer />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
