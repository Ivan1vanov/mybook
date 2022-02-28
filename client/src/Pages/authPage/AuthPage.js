import { Button, Container, Input, Paper, TextField } from '@material-ui/core'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signInAction, signUpAction } from '../../redux/actions/userActions'

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import validator from 'validator'

import useStyles from './authStyles'

const AuthPage = () => {
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const navigate = useNavigate()
    const [authData, setAuthData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [someError, setSomeError] = useState('')

    const [isHidenPassword, setIsHidenPassword] = useState(true)

    const [isSignUp, setIsSignUp] = useState(false)

    const {firstName, lastName, email, password, confirmPassword} = authData

    const onChangeAuthForm = (e) => {
        setAuthData({
            ...authData,
            [e.target.name]: e.target.value
        })
    }
    // console.log(user)
    useEffect(() => {
        if(user?.result) {
            navigate('/')
        }
    }, [])

    const onSubmitAuth = (e) => {
        e.preventDefault()
        if(isSignUp) {
            if(validator.isEmail(email)) {
                if (password !== confirmPassword) {
                    setSomeError('Passwords do not match')
                } else {
                    dispatch(signUpAction(authData, navigate))
                }
            } else {
                setSomeError('Invalid email adress')
            }
            
        } else {
            dispatch(signInAction(authData, navigate))
        }
    }

    const classes = useStyles()
  return (
    <Container className={classes.middleContainer}>
        
        <form className={classes.form} onSubmit={onSubmitAuth}>
        <Paper className={classes.paper} >
          <h1>
            {isSignUp ? (
                    <Fragment>
                        Sign Up
                    </Fragment>
                ): (
                    <Fragment>
                        Sign In
                    </Fragment>
            )}
        </h1>
           {isSignUp ? (
               <Fragment>
                   <h3>{someError && (
                       <div style={{color: 'red'}}>
                            {someError}
                       </div>
                   )}</h3>
                   <TextField
           className={classes.inputType}
           label='First Name'
           name='firstName'
           variant='outlined'
           value={firstName}
           onChange={onChangeAuthForm}
           />
            <TextField
            className={classes.inputType}
           label='Last Name'
           name='lastName'
           variant='outlined'
           value={lastName}
           onChange={onChangeAuthForm}
           />
            <TextField
            className={classes.inputType}
           label='Email'
           name='email'
           variant='outlined'
           value={email}
           onChange={onChangeAuthForm}
           />
            <div className={classes.passwordWraper}>
            <TextField
            style={{width: '100%'}}
            type={isHidenPassword ? 'text' : 'password'}
           label='Password'
           name='password'
           variant='outlined'
           value={password}
           onChange={onChangeAuthForm}
           />
           <Button className={classes.allSeeingEye} onClick={() => setIsHidenPassword(!isHidenPassword)}>
               {isHidenPassword ? (
                   
             <VisibilityOffIcon/>
               ) : (
                <RemoveRedEyeIcon/>
               )}
         
           </Button>
           </div>
           <div className={classes.passwordWraper}>
            <TextField
            style={{width: '100%', marginTop: '10px'}}
            type={isHidenPassword ? 'text' : 'password'}
            label='Confirm Password'
            name='confirmPassword'
            variant='outlined'
            value={confirmPassword}
            onChange={onChangeAuthForm}
           />
           </div>
               </Fragment>
           ) : (
               <Fragment>
            <TextField
            className={classes.inputType}
           label='Email'
           name='email'
           variant='outlined'
           value={email}
           onChange={onChangeAuthForm}
           />
           <div className={classes.passwordWraper}>
            <TextField
            style={{width: '100%'}}
            type={isHidenPassword ? 'text' : 'password'}
           label='Password'
           name='password'
           variant='outlined'
           value={password}
           onChange={onChangeAuthForm}
           />
           <Button className={classes.allSeeingEye} onClick={() => setIsHidenPassword(!isHidenPassword)}>
               {isHidenPassword ? (
                   
             <VisibilityOffIcon/>
               ) : (
                <RemoveRedEyeIcon/>
               )}
         
           </Button>
           </div>
               </Fragment>
           )}
            <Button type='submit' variant='contained' className={classes.buttonAuth}>
                {isSignUp ? (
                    <Fragment>
                        Sign Up
                    </Fragment>
                ): (
                    <Fragment>
                        Sign In
                    </Fragment>
                )}
                </Button>
            <div>
                {isSignUp ? (
                    <Fragment>
                         Allready have an account? - <Button onClick={() => setIsSignUp(!isSignUp)}>Log in</Button>
                    </Fragment>
                ): (
                    <Fragment>
                        Don't have an account? - <Button onClick={() => setIsSignUp(!isSignUp)}>create an account</Button>
                    </Fragment>
                )}
            </div>
           </Paper>
          
           </form>
        
       
    </Container>
  )
}

export default AuthPage