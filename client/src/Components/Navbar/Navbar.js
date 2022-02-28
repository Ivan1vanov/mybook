import React, { useEffect, useState } from 'react';
import useStyles from './navbarStyles'

import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import EmailIcon from '@mui/icons-material/Email';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import { Container } from '@material-ui/core';
import './navbar.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { LOGOUT } from '../../redux/constants/userConstants';
import { logoutAction } from '../../redux/actions/userActions';

import decode from 'jwt-decode'

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile'))) 
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const [currentLocation, setCurrentLocation] = useState({
        mainPage: false,
        profile: false,
        friends: false,
        messages: false,
        auth: false,
    })

    useEffect(() => {
        const token = user?.token;
    
        if (token) {
          const decodedToken = decode(token);
    
          if (decodedToken.exp * 1000 < new Date().getTime()) logoutHandler();
        }
    
        setUser(JSON.parse(localStorage.getItem('profile')));
      }, [location]);

    const {mainPage, profile, friends, messages, auth} = currentLocation

    const logoutHandler = (e) => {
        dispatch(logoutAction(navigate))
    }

    const classes = useStyles()
  return( 
    <div className={classes.navbarWrapper}> 
  <Container className={classes.navbar}>

  <Link type='button' to='/'>
        <div className={mainPage ? classes.active : classes.navLink} onClick={() => setCurrentLocation({mainPage: true})}>

            <HomeIcon style={{fontSize: 30}}/>
        </div>
    </Link>


    {user?.token ? (
        <Link type='button' to={`/user/${user?.result?._id}`}>
        <div className={profile ? classes.active : classes.navLink}>

            <PersonIcon style={{fontSize: 30}} onClick={() => setCurrentLocation({profile: true})}/>
        </div>
        </Link>
    ) : ( 
        <Link type='button' to={`/auth`}>
        <div className={profile ? classes.active : classes.navLink}>

            <PersonIcon style={{fontSize: 30}} onClick={() => setCurrentLocation({profile: true})}/>
        </div>
        </Link>
    )}
   
    <Link type='button' to='/users'>
        <div className={friends ? classes.active : classes.navLink} onClick={() => setCurrentLocation({friends: true})}>
            <PeopleIcon style={{fontSize: 30}}/>
        </div>
    </Link>

   
        {user?.token ? (
             <Link type='button' to='/messager'>
            <div className={messages ? classes.active : classes.navLink} onClick={() => setCurrentLocation({messages: true})}>
            <EmailIcon style={{fontSize: 30}}/>
        </div>
        </Link>
        
        ) : (
            <Link type='button' to='/auth'>
            <div className={messages ? classes.active : classes.navLink} onClick={() => setCurrentLocation({messages: true})}>
            <EmailIcon style={{fontSize: 30}}/>
            </div>
        </Link>
        )}

   

        {user?.token ? (

        <div className={classes.navLink} onClick={logoutHandler}>
            <LogoutIcon style={{fontSize: 30}}/>
        </div>
        ) : (
            <Link type='button' to='/auth'>
        <div className={auth ? classes.active : classes.navLink} onClick={() => setCurrentLocation({auth: true})}>
            <LoginIcon style={{fontSize: 30}}/>
        </div>
        </Link>
        )}
  </Container>
  </div>
  )
};

export default Navbar;
