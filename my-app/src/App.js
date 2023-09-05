import {BrowserRouter as Router,Routes,Route, redirect} from 'react-router-dom';
import {ProtectedRoute} from 'protected-route-react';
import Home from './Pages/Home/Home';
import Register from './Pages/Authentication/Register';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { loadUser } from './actions/UserActions';
import toast,{Toaster} from 'react-hot-toast';
import './App.css';
import { useEffect } from 'react';
import Verify from './Pages/Authentication/Verify';
import Forgetpassword from './Pages/Authentication/Forgetpassword';
import Resetpassword from './Pages/Authentication/Resetpassword';
import Socialhome from './Pages/Socialhome/Socialhome';
import Post from './Pages/Posts/Post';
import Profile from './Pages/UserProfile/Profile';
import Friends from './Pages/Friends/Friends';
import Message from './Pages/Messenger/Message';
function App() {
  const {isAuthenticated,message,error,isVarified}=useSelector((state)=>state.user);

  const dispatch=useDispatch();
  useEffect(() => {
    if (error === "Cannot read properties of null (reading '_id')") {
      toast("Late to Verifying OTP!! Register Again");
      dispatch({ type: "clearError" });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);

useEffect(()=>{
    const userAccessToken=localStorage.getItem('userAccessToken');
    const finItem=JSON.parse(userAccessToken);
    dispatch(loadUser(finItem));
},[dispatch]);

  return (
    <Router>
    <Routes>
      <Route path={'/'} element={
        <ProtectedRoute isAuthenticated={!isAuthenticated} isVarified={!isVarified} redirect='/home'>
            <Home/>
        </ProtectedRoute>
       

      }/>
      <Route path={'/forgot'} element={<Forgetpassword/>}/>

      <Route
              path="/register"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/verify"
                >
                  <Register />
                </ProtectedRoute>
              }
            />

             <Route
              path="/resetpassword/:token"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/"
                >
                  <Resetpassword/>
                </ProtectedRoute>
              }
            />

            <Route path="/home"
            element={(isVarified)?<Socialhome/>: <Home/>
              
                 
    
            }
            />

            <Route
              path="/verify"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} isVarified={isVarified} redirect='/home'>
                  <Verify />
                </ProtectedRoute>
              }
            />
            <Route path="/post" 
            element={
              
                 <Post/>
                 
            }/>
            <Route
              path='/profile'
              element={
                   <Profile/> 
              }
            />
            <Route path='/friends'
            element={
              <Friends/>
            }
            />

            <Route path='/messaging'
            element={<Message/>}
            />
            

    </Routes>
    <Toaster toastOptions={{duration:5000}}/>
    </Router>
    
  );
}

export default App;
