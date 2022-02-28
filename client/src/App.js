import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import MainPage from './Pages/MainPage/MainPage';
import Navbar from './Components/Navbar/Navbar';
import AuthPage from './Pages/authPage/AuthPage';
import PostDetails from './Pages/PostDetails/PostDetails';
import UserPage from './Pages/UserPage/UserPage';
import SearchUsersPage from './Pages/SearchUsersPage/SearchUsersPage';
import MessagePage from './Pages/MessagePage/MessagePage';
import Form from './Components/Form/Form';

function App() {
  return (
    <div>
     <BrowserRouter>
     <Navbar/>
      <Routes>
        <Route path='/' element={<Navigate replace to='/posts'/>}/>
        <Route path='/posts/search' element={<MainPage/>}/>
        <Route path='/posts/:id' element={<PostDetails/>}/>
        <Route path='/user/:id' element={<UserPage/>}/>
        <Route path='/posts' element={<MainPage/>}/>
        <Route path='/messager' element={<MessagePage/>}/>
        <Route path='/users' element={<SearchUsersPage/>}/>
        <Route path='/auth' element={<AuthPage/>}/>
        <Route path='/editpost' element={<Form/>}/>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
