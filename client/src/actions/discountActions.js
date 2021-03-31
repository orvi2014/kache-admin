import axios from "axios";
import {
    GET_ERRORS,
    DISCOUNT_ADD,
    USER_UPDATE
} from "./types";

export const addDiscount = (discountData, history) => dispatch => {
    axios
        .post("/api/discount-add", discountData)
        .then(res =>
            dispatch({
                type: DISCOUNT_ADD,
                payload: res,
            })
        ).catch(err =>{
            console.log(err);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        }
  
    );
};


export const updateUser = (userData) => dispatch => {
    axios
        .post("/api/user-update", userData)
        .then(res =>
            dispatch({
                type: USER_UPDATE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};
