import { GET_CAR_FAIL, GET_CAR_REQ, GET_CAR_SUCCESS } from "./actionType"

const initState={
    isLoading:false,
    cars:[],
    isError:false
}

export const reducer=(state=initState,{type,payload})=>{
    switch(type){
        case GET_CAR_REQ:{
            return {
                ...state,isLoading:true
            }
        }
        case GET_CAR_SUCCESS:{
            return {
                ...state,isLoading:false,isError:false,cars:payload
            }
        }
        case GET_CAR_FAIL:{
            return {
            ...state,isLoading:false,isError:true
            }
        }
        default:{
            return state
        }
    }
}