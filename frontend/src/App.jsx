import LoadingScreen from './LoadingScreen'
import PortfolioHero from './Portfolio'
import Education from './Education'
import ChatBar from './ChatBar'
import { useState, useEffect } from 'react'

function App() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowContent(true);
    }, 1500);
  }, []);

  return (
    <div className="overflow-hidden">
      <LoadingScreen />
      <div className={`transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <PortfolioHero />
        <Education />
      </div>
      <ChatBar />
    </div>
  )
}

export default App
