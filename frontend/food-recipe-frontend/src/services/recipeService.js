import axios from 'axios'
export const url = "http://localhost:5000"
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

export function addRecipeToApi(recipeData){
    return axios.post(url + "/recipe", recipeData, {
      headers: {
        'Content-Type' : 'multipart/form-data',
        'Authorization': "Bearer "+localStorage.getItem("token")
      }
    });
}