import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { reducer as authReducer } from "./authReducer/reducer";
import { reducer as carReducer } from "./carReducer/reducer";
import thunk from "redux-thunk";

const allReducer=combineReducers({
    authReducer,
    carReducer
})

export const store=legacy_createStore(allReducer,applyMiddleware(thunk))