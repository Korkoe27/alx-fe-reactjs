import { useState } from 'react'
import WelcomeMessage from './components/WelcomeMessage'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="">
      <WelcomeMessage/>

    </div>
  )
}

export default App
