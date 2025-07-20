import React from 'react';

import WelcomeMessage from './components/WelcomeMessage';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import Header from './components/Header';
import './App.css'
import UserProfile from './components/UserProfile';
import Counter from './components/Counter';
import UserContext from './UserContext';

function App() {

  const [userData, setUserData] = React.useState({ name: "Ernest", age: 25, bio: "Loves money" });

  return (
    console.log(userData),
    <div className="">
      <Header />
      <UserContext.Provider value={{ userData, setUser: setUserData }}>
        <UserProfile userData={userData} />
      </UserContext.Provider>
      <WelcomeMessage />
      <MainContent />
      <Counter />
      <Footer />

    </div>
  )
}

export default App