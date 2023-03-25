import * as api from '../api/index';
import { AUTH } from "../utils/constants";

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signin(formData);
        dispatch({ type: AUTH, data: data });
        navigate('/');
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        const { data } = await api.signup(formData);
        console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');
        dispatch({ type: AUTH, data: data });
        navigate('/');
        console.log('ccccccccccccccccccccccccccccccc');
    } catch (error) {
        console.log('ddddddddddddddddddddddddddddddd');
        console.log(error);
    }
}