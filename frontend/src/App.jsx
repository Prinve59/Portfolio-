import LoadingScreen from './components/LoadingScreen'
import PortfolioHero from './sections/Portfolio'
import Education from './sections/Education'
import ChatBar from './components/ChatBar'
import Navbar from './components/Navbar'
import ShortProfile from './sections/ShortProfile'
import Back from './layout/Back'
import { useState, useEffect } from 'react'

function App() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowContent(true);
    }, 600);
  }, []);

  return (
    <>
      <LoadingScreen />
      <div className={`transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-70'}`}> 
        <Back>
        <Navbar />
          <PortfolioHero />
          <Education />
          <ShortProfile />
        <ChatBar />
        </Back>
      </div>
    </>
  )
}

export default App
