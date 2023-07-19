import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "./actionType"

const initState={
    isLoading:false,
    isAuth:false,
    token:localStorage.getItem("token")||"",
    isError:false,
    user:{}
}

export const reducer=(state=initState,{type,payload})=>{
    switch(type){
        case LOGIN_REQUEST:{
            return {
                ...state,isLoading:true
            }
        }
        case LOGIN_SUCCESS:{
            localStorage.setItem("token",payload.token)
            return {
                ...state,isLoading:false,isError:false,token:payload.token,isAuth:true,user:payload.user
            }
        }
        case LOGIN_FAILURE:{
            return {
                ...state,isLoading:false,isError:true
            }
        }
        case LOGOUT:{
            localStorage.setItem("token","")
            return {
                ...state,isAuth:false,token:""
            }
        }
        default:{
            return state
        }
    }
}