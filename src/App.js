import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Main from './pages/Main';
import Login from './pages/Login';
import AboutUs from './pages/AboutUs';

import './App.css';


function App() {
  return (
    <>
      <Router>
        <Main></Main>

        <Routes>
          <Route exact path="/Login" element={<Login />}></Route>
          <Route exact path="/AboutUs" element={<AboutUs />}></Route>
        </Routes>

      </Router>
    </>
  );
}

export default App;