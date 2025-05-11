import axios from "axios";
import { url } from "./recipeService";

export async function signUp(formData){
    let response = await axios.post(url+ "/user/signUp",formData);
    return response;
}

export function login(formData){
    return axios.post(url+ "/user/login",formData);
}

export function storeToken(token){
    localStorage.setItem("token",token);
}

export function removeToken(){
    localStorage.removeItem("token");
}

export function getToken(){
    return localStorage.getItem("token");
}