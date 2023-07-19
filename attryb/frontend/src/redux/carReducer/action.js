import axios from "axios"
import { ADD_CAR_REQ, GET_CAR_FAIL, GET_CAR_REQ, GET_CAR_SUCCESS } from "./actionType"
import { baseURL } from "../../baseurl"

export const addCarfun=(car,token)=>(dispatch)=>{
    dispatch({type:ADD_CAR_REQ})
    return fetch(baseURL+"/inventory/add",{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(car)
    }).then((res)=>res.json()).then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log(err)
    })
}

export const getCars=(dispatch)=>{
    dispatch({type:GET_CAR_REQ})
    axios.get(baseURL+"/inventory").then((res)=>{
        dispatch({type:GET_CAR_SUCCESS,payload:res.data.inventory})
    }).catch((err)=>{
        dispatch({type:GET_CAR_FAIL})
    })
}