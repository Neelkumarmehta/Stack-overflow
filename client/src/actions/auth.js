import * as api from '../api'
import { setCurrentUser } from './currentUser'
import { fetchAllUsers } from './Users'

export const signup = (authData,navigate) => async(dispatch) => {
    try{
     const {data} = await api.signUp(authData)
    dispatch({type: 'AUTH' ,data})
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    dispatch(fetchAllUsers());
    navigate('/')
    }catch(err){
       console.log(err);
    }
}
export const login = (authData,navigate) => async(dispatch) => {
    try{
     const {data} = await api.login(authData)
    dispatch({type: 'AUTH' ,data})
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    navigate('/')
    }catch(err){
       console.log(err);
    }
}