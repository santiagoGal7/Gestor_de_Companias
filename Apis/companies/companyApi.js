const URL_API = "http://localhost:3000/";
const myHeaders = new Headers({
    "Content-Type": "application/json"
});

const getCompanias = async() => {
    try {
        const respuesta = await fetch(`${URL_API}companias`);
        if(respuesta.ok){
            const datos = await respuesta.json();
            console.log('Compañías obtenidas:', datos);
            return datos;
        } else {
            console.error('Error al obtener compañías:', respuesta.status);
            return [];
        } 
    } catch(error){
        console.error('Error en getCompanias:', error);
        return [];
    }
}

const postCompania = async (datos) => {
    try {
        console.log('Enviando compañía:', datos);
        const response = await fetch(`${URL_API}companias`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Compañía guardada exitosamente:', data);
        return data;
    } catch (error) {
        console.error('Error en POST compañía:', error);
        throw error;
    }
}

const patchCompania = async (datos, id) => {
    try {
        console.log('Actualizando compañía:', id, datos);
        const response = await fetch(`${URL_API}companias/${id}`, {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Compañía actualizada:', data);
        return data;
    } catch (error) {
        console.error('Error en PATCH compañía:', error);
        throw error;
    }
}

const deleteCompania = async (id) => {
    try {
        console.log('Eliminando compañía:', id);
        const response = await fetch(`${URL_API}companias/${id}`, {
            method: "DELETE",
            headers: myHeaders,
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Compañía eliminada:', data);
        return data;
    } catch (error) {
        console.error('Error en DELETE compañía:', error);
        throw error;
    }
}

export {
    getCompanias,
    postCompania,
    patchCompania,
    deleteCompania
};