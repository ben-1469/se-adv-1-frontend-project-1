import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landing';
import SignupPage from './pages/Signup';
import SignInPage from './pages/Signin';
import PostDetailPage from './pages/PostDetail';
import UserDetailPage from './pages/UserDetail';
import CreatePostPage from './pages/CreatePost';
import GroupDetailPage from './pages/GroupDetail';

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
          <Route path='/post'>
            <Route path=':id' element={<PostDetailPage />} />
          </Route>
          <Route path='/user'>
            <Route path=':id' element={<UserDetailPage />} />
          </Route>
          <Route path='/group'>
            <Route path=':id' element={<GroupDetailPage />} />
          </Route>
          <Route path='/create'>
            <Route index element={<CreatePostPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
