import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landing';
import SignupPage from './pages/Signup';
import SignInPage from './pages/Signin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<LandingPage />} />
          <Route path='signup'>
            <Route index element={<SignupPage />} />
          </Route>
          <Route path='signin'>
            <Route index element={<SignInPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
