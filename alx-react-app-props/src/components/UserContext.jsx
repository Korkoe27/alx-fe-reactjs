import React from 'react';
const UserContext = React.createContext({
  userData: { name: "Korkoe", age: 26, bio: "Loves JS" },
  setUser: () => {}
}); 
export default UserContext;