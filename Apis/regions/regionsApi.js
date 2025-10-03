const URL_API = "http://localhost:3001";
const myHeaders = new Headers({
    "Content-Type": "application/json"
});

const getAllRegions = async () => {
    try {
        const respuesta = await fetch(`${URL_API}/regions`);
        if (respuesta.status === 200) {
            return await respuesta.json();
        } else {
            throw new Error(`Error ${respuesta.status}`);
        }
    } catch (error) {
        console.error('Error en GET all regions:', error.message);
        return [];
    }
};

const getRegionById = async (id) => {
    try {
        const respuesta = await fetch(`${URL_API}/regions/${id}`);
        if (respuesta.status === 200) {
            return await respuesta.json();
        } else {
            throw new Error(`Error ${respuesta.status}`);
        }
    } catch (error) {
        console.error('Error en GET region by ID:', error.message);
        return null;
    }
};

const postRegion = async (datos) => {
    try {
        const respuesta = await fetch(`${URL_API}/regions`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
        if (respuesta.ok) {
            return await respuesta.json();
        } else {
            throw new Error(`Error ${respuesta.status}`);
        }
    } catch (error) {
        console.error('Error en POST region:', error.message);
    }
};

const patchRegion = async (datos, id) => {
    try {
        const respuesta = await fetch(`${URL_API}/regions/${id}`, {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
        if (respuesta.ok) {
            return await respuesta.json();
        } else {
            throw new Error(`Error ${respuesta.status}`);
        }
    } catch (error) {
        console.error('Error en PATCH region:', error.message);
    }
};

const deleteRegion = async (id) => {
    try {
        const respuesta = await fetch(`${URL_API}/regions/${id}`, {
            method: "DELETE",
            headers: myHeaders
        });
        if (respuesta.ok) {
            return await respuesta.json();
        } else {
            throw new Error(`Error ${respuesta.status}`);
        }
    } catch (error) {
        console.error('Error en DELETE region:', error.message);
    }
};

export {
    getAllRegions,
    getRegionById,
    postRegion,
    patchRegion,
    deleteRegion
};