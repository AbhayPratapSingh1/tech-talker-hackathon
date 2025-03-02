import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignInLogInPage from './signInLogInPage/signInLogInPage';
import HomePage from './homePage/homePage';
import Cover from './commonComponent/cover';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Cover> <SignInLogInPage/></Cover>}/>
      <Route path='/chats' element={<Cover> <HomePage /></Cover>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
