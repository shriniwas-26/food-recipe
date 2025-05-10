import axios from "axios";
import { url } from "./recipeService";

export async function signUp(formData){
    let response = await axios.post(url+ "/user/signUp",formData);
    return response;
}

export function login(formData){
    return axios.post(url+ "/user/login",formData,);
}
