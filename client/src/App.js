import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import HomePage from 'pages/Home';
import LoginPage from 'pages/Login';
import ProfilePage from 'pages/Profile';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path = "/" element={<LoginPage/>} />
        <Route path = "/home" element={<HomePage/>} />
        <Route path = "/profile/:userId" element={<ProfilePage/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
