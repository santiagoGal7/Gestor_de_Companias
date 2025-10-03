const URL_API = "http://localhost:3000/";
const myHeaders = new Headers({
    "Content-Type": "application/json"
});

const getRegiones = async() => {
    try {
        const respuesta = await fetch(`${URL_API}regiones`);
        if(respuesta.ok){
            const datos = await respuesta.json();
            console.log('Regiones obtenidas:', datos);
            return datos;
        } else {
            console.error('Error al obtener regiones:', respuesta.status);
            return [];
        } 
    } catch(error){
        console.error('Error en getRegiones:', error);
        return [];
    }
}

const postRegion = async (datos) => {
    try {
        console.log('Enviando región:', datos);
        const response = await fetch(`${URL_API}regiones`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Región guardada exitosamente:', data);
        return data;
    } catch (error) {
        console.error('Error en POST región:', error);
        throw error;
    }
}

const patchRegion = async (datos, id) => {
    try {
        console.log('Actualizando región:', id, datos);
        const response = await fetch(`${URL_API}regiones/${id}`, {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Región actualizada:', data);
        return data;
    } catch (error) {
        console.error('Error en PATCH región:', error);
        throw error;
    }
}

const deleteRegion = async (id) => {
    try {
        console.log('Eliminando región:', id);
        const response = await fetch(`${URL_API}regiones/${id}`, {
            method: "DELETE",
            headers: myHeaders,
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Región eliminada:', data);
        return data;
    } catch (error) {
        console.error('Error en DELETE región:', error);
        throw error;
    }
}
export {
    getRegiones,
    postRegion,
    patchRegion,
    deleteRegion
};