import WelcomeMessage from './components/WelcomeMessage';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import Header from './components/Header';
import './App.css'
import UserProfile from './components/UserProfile';

function App() {

  return (
    <div className="">
      <Header />
      <UserProfile name="Alice" age="25" bio="Loves hiking and photography" />
      <WelcomeMessage />
      <MainContent />
      <Footer />

    </div>
  )
}

export default App
