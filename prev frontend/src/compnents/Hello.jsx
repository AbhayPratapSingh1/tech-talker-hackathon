import React from 'react';
import UserProfile from './profile';


function App() {
  const user = {
    name: 'John Doe',
    description: 'Software Engineer at XYZ',
    avatarLetter: 'J', 
  };

  return (
    <div className="App">
      <UserProfile
       avatarLetter={user.avatarLetter}
        name={user.name} 
        description={user.description} 
        
      />
    </div>
  );
}

export default App;
