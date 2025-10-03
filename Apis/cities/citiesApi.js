const URL_API = "http://localhost:3000/";
const myHeaders = new Headers({
    "Content-Type": "application/json"
});

const getCiudades = async() => {
    try {
        const respuesta = await fetch(`${URL_API}ciudades`);
        if(respuesta.ok){
            const datos = await respuesta.json();
            console.log('Ciudades obtenidas:', datos);
            return datos;
        } else {
            console.error('Error al obtener ciudades:', respuesta.status);
            return [];
        } 
    } catch(error){
        console.error('Error en getCiudades:', error);
        return [];
    }
}

const postCiudad = async (datos) => {
    try {
        console.log('Enviando ciudad:', datos);
        const response = await fetch(`${URL_API}ciudades`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Ciudad guardada exitosamente:', data);
        return data;
    } catch (error) {
        console.error('Error en POST ciudad:', error);
        throw error;
    }
}

const patchCiudad = async (datos, id) => {
    try {
        console.log('Actualizando ciudad:', id, datos);
        const response = await fetch(`${URL_API}ciudades/${id}`, {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Ciudad actualizada:', data);
        return data;
    } catch (error) {
        console.error('Error en PATCH ciudad:', error);
        throw error;
    }
}

const deleteCiudad = async (id) => {
    try {
        console.log('Eliminando ciudad:', id);
        const response = await fetch(`${URL_API}ciudades/${id}`, {
            method: "DELETE",
            headers: myHeaders,
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Ciudad eliminada:', data);
        return data;
    } catch (error) {
        console.error('Error en DELETE ciudad:', error);
        throw error;
    }
}
export {
    getCiudades,
    postCiudad,
    patchCiudad,
    deleteCiudad
};