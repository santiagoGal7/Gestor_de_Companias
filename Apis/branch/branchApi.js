const URL_API = "http://localhost:3000/";
const myHeaders = new Headers({
    "Content-Type": "application/json"
});

const getSucursales = async() => {
    try {
        const respuesta = await fetch(`${URL_API}sucursales`);
        if(respuesta.ok){
            const datos = await respuesta.json();
            console.log('Sucursales obtenidas:', datos);
            return datos;
        } else {
            console.error('Error al obtener sucursales:', respuesta.status);
            return [];
        } 
    } catch(error){
        console.error('Error en getSucursales:', error);
        return [];
    }
}

const postSucursal = async (datos) => {
    try {
        console.log('Enviando sucursal:', datos);
        const response = await fetch(`${URL_API}sucursales`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Sucursal guardada exitosamente:', data);
        return data;
    } catch (error) {
        console.error('Error en POST sucursal:', error);
        throw error;
    }
}

const patchSucursal = async (datos, id) => {
    try {
        console.log('Actualizando sucursal:', id, datos);
        const response = await fetch(`${URL_API}sucursales/${id}`, {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Sucursal actualizada:', data);
        return data;
    } catch (error) {
        console.error('Error en PATCH sucursal:', error);
        throw error;
    }
}

const deleteSucursal = async (id) => {
    try {
        console.log('Eliminando sucursal:', id);
        const response = await fetch(`${URL_API}sucursales/${id}`, {
            method: "DELETE",
            headers: myHeaders,
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Sucursal eliminada:', data);
        return data;
    } catch (error) {
        console.error('Error en DELETE sucursal:', error);
        throw error;
    }
}

export {
    getSucursales,
    postSucursal,
    patchSucursal,
    deleteSucursal
};