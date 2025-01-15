import React, { useState, useCallback } from 'react';
import {BrowserRouter as Router , Routes, Route, Navigate} from 'react-router-dom';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces'
import UpdatePlace from './places/pages/UpdatePlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Footer from './shared/components/Navigation/Footer';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';


const App = () => {
 const [token, setToken ]= useState(false)
 const [userId, setUserId ]= useState(false)

 const login = useCallback((uid, token) => {
  setToken(token)
  setUserId(uid)
 }, [])
 const logout = useCallback(() => {
  setToken(null)
  setUserId(null)
 }, [])

let routes

if (token) {
   routes = ( 
   <React.Fragment>
    <Route path="/" element={<Users />} /> 
    <Route path="/:userId/places" element={<UserPlaces />} />
    <Route path="/places/new" element={<NewPlace />} /> 
    <Route path="/places/:placeId" element={<UpdatePlace />} />
    <Route path="*" element={<Navigate to="/" />} />
    </React.Fragment>
    )
} else {
  routes = (
    <React.Fragment>
    <Route path="/" element={<Users />} /> 
    <Route path="/:userId/places" element={<UserPlaces />} />
    <Route path="/auth" element={<Auth/>} />
    <Route path="*" element={<Navigate to="/auth" />} />
    </React.Fragment>
  )
}
  return (
    <AuthContext.Provider value={{
     isLoggedIn: !!token,
     token: token,
     userId: userId,
     login: login,
     logout: logout
     }}>
  <Router>
    <MainNavigation/>
    <main>
    <Routes>
      {routes}
    </Routes>
    </main>
    <Footer />
  </Router>
  </AuthContext.Provider>
  )
}; 

export default App;
