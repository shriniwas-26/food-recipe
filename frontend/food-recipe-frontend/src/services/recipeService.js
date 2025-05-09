import axios from 'axios'
const url = "http://localhost:5000"
export async function getAllRecipesFromApi(){
    try {
        
        const response = await axios.get(url+"/recipe");
        const allRecipes = response.data;
        console.log(allRecipes);
        return allRecipes;
        
    } catch (error) {
        console.log(error);
    }
    
}