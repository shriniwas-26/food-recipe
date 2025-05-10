import axios from "axios";
import { url } from "./recipeService";

export function signUp(formData){
    return axios.post(url+ "/user/signUp",formData);
}

export function login(formData){
    return axios.post(url+ "/user/login",formData,);
}
