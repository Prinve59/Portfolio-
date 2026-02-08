import LoadingScreen from './LoadingScreen'
import PortfolioHero from './Portfolio'
import Education from './Education'
import ChatBar from './ChatBar'
import Navbar from './Navbar'
import ShortProfile from './ShortProfile'
import Back from '../public/Back'
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
        <Navbar />
        <Back>
          <PortfolioHero />
          <Education />
          <ShortProfile />
        </Back>
        <ChatBar />
      </div>
    </>
  )
}

export default App
