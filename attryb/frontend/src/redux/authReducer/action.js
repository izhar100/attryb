import axios from "axios"
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "./actionType"
import { baseURL } from "../../baseurl"

export const userLogin=(user)=>(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    return axios.post(baseURL+"/user/login",user).then((res)=>{
        console.log("Result at the time of login: ",res)
        const token=res.data.token
        const user=res.data.user
        dispatch({type:LOGIN_SUCCESS,payload:{token,user}})
        return token;
    }).catch((err)=>{
       dispatch({type:LOGIN_FAILURE})
    })
}

export const userLogout=(dispatch)=>{
    dispatch({type:LOGOUT})
}