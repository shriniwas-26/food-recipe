import axios from 'axios'
export const url = "http://localhost:5000"
export async function getAllRecipesFromApi(){
    try {
        
        const response = await axios.get(url+"/recipe");
        const allRecipes = response.data;
        // console.log(allRecipes);
        return allRecipes;
        
    } catch (error) {
        console.log(error);
    }
    
}

export async function addRecipeToApi(recipeData){
  try {
    return await axios.post(url + "/recipe", recipeData, {
      headers: {
        'Content-Type' : 'multipart/form-data',
        'Authorization': "Bearer "+localStorage.getItem("token")
      }
    });
  } catch (error) {
    console.log(error);
  }
    
}

export async function deleteRecipeFromApi(id){
  try {
    return await axios.delete(url + "/recipe/"+id);
  } catch (error) {
    console.log(error);
  }
  
}

export async function getRecipeFromApi(id) {
  try {
    let response = await axios.get(url+"/recipe/"+id);
    response = response.data;
    return response;
  } catch (error) {
    console.log(error);
  }
  
}

export async function updateRecipeInApi(id,recipeData){
  try {
    const response = await axios.put(url + "/recipe/" + id, recipeData, {
      headers: {
        'Content-Type' : 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
  }
}
